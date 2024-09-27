import { PrismaService } from '@app/prisma.service';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain/';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionalQuestionCycleService {
  constructor(private readonly prisma: PrismaService) {}

  async addNewCycle(data: AddNewCycleDomainModel): Promise<void> {
    const { id, regionId, iteration, cycleStart, cycleEnd } = data;

    const unassignedQuestionId = await this.getUnassignedQuestionId(regionId);

    if (!unassignedQuestionId) {
      throw new Error('new question for a given region is not available');
    }

    // Check if a cycle with the same regionId and iteration already exists
    const existingCycle = await this.prisma.regionalQuestionCycle.findUnique({
      where: {
        regionId_iteration: {
          regionId,
          iteration,
        },
      },
    });

    if (existingCycle) {
      throw new Error(
        `cycle already exists for region ${regionId} with iteration ${iteration}`,
      );
    }

    await this.prisma.regionalQuestionCycle.create({
      data: {
        id: id,
        questionAssignmentId: unassignedQuestionId,
        regionId: regionId,
        iteration: iteration,
        cycleStart: cycleStart,
        cycleEnd: cycleEnd,
      },
    });
  }

  private async getUnassignedQuestionId(regionId: string): Promise<string> {
    const unassignedQuestion = await this.prisma.questionAssignment.findFirst({
      where: {
        regionId: regionId,
        cycle: null,
      },
      select: {
        id: true,
      },
    });

    return unassignedQuestion.id;
  }
}
