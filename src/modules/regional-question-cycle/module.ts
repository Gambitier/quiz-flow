import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RegionalQuestionCycleService } from './regional-question-cycle.service';

@Module({
  imports: [PrismaModule],
  providers: [RegionalQuestionCycleService],
})
export class RegionalQuestionCycleModule {}
