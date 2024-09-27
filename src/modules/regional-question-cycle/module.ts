import { PrismaModule } from '@modules/prisma/prisma.module';
import { RegionalQuestionCycleController } from '@modules/regional-question-cycle/regional-question-cycle.controller';
import { RegionalQuestionCycleService } from '@modules/regional-question-cycle/regional-question-cycle.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [RegionalQuestionCycleController],
  providers: [RegionalQuestionCycleService],
})
export class RegionalQuestionCycleModule {}
