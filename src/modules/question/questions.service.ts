import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QuestionAssignmentResponseDto } from './models/dto/question-assignment-response.dto';
import { QuestionResponseDto } from './models/dto/question-response.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllQuestions(): Promise<QuestionResponseDto[]> {
    const questions = await this.prisma.question.findMany({
      select: {
        id: true,
        content: true,
        meta: true,
      },
    });

    return questions.map((question) => new QuestionResponseDto(question));
  }

  async getAllQuestionAssignments(): Promise<QuestionAssignmentResponseDto[]> {
    const questionAssignments = await this.prisma.questionAssignment.findMany({
      select: {
        id: true,
        regionId: true,
        questionId: true,
        scheduledStartAt: true,
        scheduledEndAt: true,
      },
    });

    return questionAssignments.map(
      (assignment) => new QuestionAssignmentResponseDto(assignment),
    );
  }

  async getRegionSpecificAssignments(
    regionId: string,
  ): Promise<QuestionAssignmentResponseDto[]> {
    const assignments = await this.prisma.questionAssignment.findMany({
      where: { regionId },
      select: {
        id: true,
        regionId: true,
        questionId: true,
        scheduledStartAt: true,
        scheduledEndAt: true,
      },
    });

    return assignments.map(
      (assignment) => new QuestionAssignmentResponseDto(assignment),
    );
  }
}
