import { CycleQueue } from '@modules/regional-question-cycle/constants';
import { RegionalQuestionCycleService } from '@modules/regional-question-cycle/regional-question-cycle.service';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor(CycleQueue)
export class CycleProcessor extends WorkerHost {
  private readonly logger = new Logger(CycleProcessor.name);

  constructor(private readonly cycleService: RegionalQuestionCycleService) {
    super();
  }

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

      this.logger.log(
        `New cycle added for regionId: ${regionId}, with cycleStart: ${cycleStart.toISOString()} and cycleEnd: ${cycleEnd.toISOString()}`,
      );
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        this.logger.warn(`error adding cycle: ${error.message}`);
      } else {
        // Rethrow to trigger BullMQ retry mechanism
        this.logger.debug(`unknown error adding cycle: : ${error}`);
        throw error;
      }
    }
  }
}
