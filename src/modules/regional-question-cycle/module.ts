import { PrismaService } from '@app/prisma.service';
import { Module } from '@nestjs/common';
import { RegionalQuestionCycleService } from './regional-question-cycle.service';

@Module({
  providers: [PrismaService, RegionalQuestionCycleService],
})
export class RegionalQuestionCycleModule {}
