import { PrismaService } from '@app/prisma.service';
import { QuestionsController } from '@modules/question/questions.controller';
import { QuestionsService } from '@modules/question/questions.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [QuestionsController],
  providers: [PrismaService, QuestionsService],
})
export class QuestionModule {}
