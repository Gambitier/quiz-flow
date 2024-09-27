import { CycleQueue } from '@modules/regional-question-cycle/constants';
import { RegionalQuestionCycleService } from '@modules/regional-question-cycle/regional-question-cycle.service';
import { Processor } from '@nestjs/bullmq';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor(CycleQueue)
export class CycleProcessor {
  constructor(private readonly cycleService: RegionalQuestionCycleService) {}

  async process(
    job: Job<{ regionId: string; cycleEnd: Date; cycleStart: Date }>,
  ) {
    const { regionId, cycleStart, cycleEnd } = job.data;

    try {
      await this.cycleService.addNewCycle({
        regionId: regionId,
        cycleStart: cycleStart,
        cycleEnd: cycleEnd,
      });
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        console.warn(`error adding cycle: ${error.message}`);
      } else {
        // Rethrow to trigger BullMQ retry mechanism
        throw error;
      }
    }
  }
}
