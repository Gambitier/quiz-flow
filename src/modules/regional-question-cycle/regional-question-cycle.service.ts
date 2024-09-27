import { PrismaService } from '@modules/prisma/prisma.service';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain/';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RegionalQuestionCycleService {
  constructor(private readonly prisma: PrismaService) {}

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

    return !overlappingCycle?.id;
  }
}
