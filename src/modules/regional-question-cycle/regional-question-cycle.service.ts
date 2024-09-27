import { PrismaService } from '@modules/prisma/prisma.service';
import { CycleQueue } from '@modules/regional-question-cycle/constants';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain/';
import { CurrentCycleQuestionDto } from '@modules/regional-question-cycle/models/dto';
import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

@Injectable()
export class RegionalQuestionCycleService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue(CycleQueue) private readonly cycleQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async addNewCycle(data: AddNewCycleDomainModel): Promise<void> {
    const { id, regionId, cycleStart, cycleEnd } = data;

    if (cycleStart >= cycleEnd) {
      throw new BadRequestException(
        'Cycle start date must be before cycle end date.',
      );
    }

    const overlappingCycle = await this.cycleOverlapsWithExisting(
      regionId,
      cycleStart,
    );
    if (overlappingCycle) {
      throw new BadRequestException(
        'A cycle already exists for this region during the specified time range.',
      );
    }

    const unassignedQuestionId = await this.getUnassignedQuestionId(regionId);
    if (!unassignedQuestionId) {
      throw new ConflictException(
        'No new questions are available for this region.',
      );
    }

    await this.prisma.regionalQuestionCycle.create({
      data: {
        id: id,
        questionAssignmentId: unassignedQuestionId,
        regionId: regionId,
        cycleStart: cycleStart,
        cycleEnd: cycleEnd,
      },
    });

    const defaultDurationInHours = this.configService.get<number>(
      'questionCycle.defaultDurationInHours',
    );

    const nextCycleStart = new Date(cycleEnd);
    nextCycleStart.setSeconds(nextCycleStart.getSeconds() + 1);

    const nextCycleEnd = new Date(nextCycleStart);
    nextCycleEnd.setHours(nextCycleEnd.getHours() + defaultDurationInHours);

    await this.cycleQueue.add(
      `schedule-next-cycle:${regionId}:${cycleStart.toISOString()}`,
      {
        regionId,
        cycleStart: nextCycleStart,
        cycleEnd: nextCycleEnd,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 60000,
        },
        removeOnComplete: true,
      },
    );
  }

  private async getUnassignedQuestionId(
    regionId: string,
  ): Promise<string | null> {
    const unassignedQuestion = await this.prisma.questionAssignment.findFirst({
      where: {
        regionId: regionId,
        cycle: null,
      },
      select: {
        id: true,
      },
    });

    return unassignedQuestion?.id || null;
  }

  private async cycleOverlapsWithExisting(
    regionId: string,
    cycleStart: Date,
  ): Promise<boolean> {
    const overlappingCycle = await this.prisma.regionalQuestionCycle.findFirst({
      select: {
        id: true,
      },
      where: {
        regionId: regionId,
        cycleEnd: { gte: cycleStart }, // table has cycleEnd gte cycleStart
      },
    });

    return !!overlappingCycle?.id;
  }

  // ============== get current cycles' question
  async getCurrentCycleQuestion(
    userId: string,
  ): Promise<CurrentCycleQuestionDto> {
    // Assuming the user has a region assigned and you're linking the region with the current cycle
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { regionId: true },
    });

    if (!user?.regionId) {
      throw new NotFoundException('User does not belong to any region');
    }

    const dateTimeNow = new Date();
    const currentCycle = await this.prisma.regionalQuestionCycle.findFirst({
      where: {
        regionId: user.regionId,
        cycleStart: { lte: dateTimeNow },
        cycleEnd: { gte: dateTimeNow },
      },
      select: {
        questionAssignment: {
          select: {
            question: {
              select: {
                id: true,
                content: true,
                meta: true,
              },
            },
          },
        },
      },
    });

    if (!currentCycle) {
      throw new NotFoundException('No active cycle found for the region');
    }

    const { question } = currentCycle.questionAssignment;

    const dto: CurrentCycleQuestionDto = {
      questionId: question.id,
      content: question.content,
      meta: question.meta,
    };

    return dto;
  }
}
