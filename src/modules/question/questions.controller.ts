import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionAssignmentResponseDto } from './models/dto/question-assignment-response.dto';
import { QuestionResponseDto } from './models/dto/question-response.dto';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<QuestionResponseDto[]> {
    return this.questionsService.getAllQuestions();
  }

  @Get('assignments')
  async getAllQuestionAssignments(): Promise<QuestionAssignmentResponseDto[]> {
    return this.questionsService.getAllQuestionAssignments();
  }

  @Get('assignments/:regionId')
  async getRegionSpecificAssignments(
    @Param('regionId', new ParseUUIDPipe()) regionId: string,
  ): Promise<QuestionAssignmentResponseDto[]> {
    return this.questionsService.getRegionSpecificAssignments(regionId);
  }
}
