import { PrismaModule } from '@modules/prisma/prisma.module';
import { QuestionsController } from '@modules/question/questions.controller';
import { QuestionsService } from '@modules/question/questions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionModule {}
