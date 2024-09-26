import { QuestionsController } from '@modules/question/questions.controller';
import { QuestionsService } from '@modules/question/questions.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuestionsController],
  providers: [PrismaService, QuestionsService],
})
export class QuestionModule {}
