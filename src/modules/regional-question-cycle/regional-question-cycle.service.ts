import { PrismaService } from '@modules/prisma/prisma.service';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain/';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionalQuestionCycleService {
  constructor(private readonly prisma: PrismaService) {}

  async addNewCycle(data: AddNewCycleDomainModel): Promise<void> {
    const { id, regionId, cycleStart, cycleEnd } = data;

    // TODO::P1: validate if cycleStart < cycleEnd

    const unassignedQuestionId = await this.getUnassignedQuestionId(regionId);

    if (!unassignedQuestionId) {
      throw new Error('new question for a given region is not available');
    }

    // TODO::P1: check if cycleStart falls within any cycle

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
