import { Roles } from '@modules/auth/guards/role-authz.guard';
import { UserRoleDomain } from '@modules/user/models/domain';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionAssignmentResponseDto } from './models/dto/question-assignment-response.dto';
import { QuestionResponseDto } from './models/dto/question-response.dto';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@ApiBearerAuth('authorization')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @Roles(UserRoleDomain.Admin)
  async getAllQuestions(): Promise<QuestionResponseDto[]> {
    return this.questionsService.getAllQuestions();
  }

  @Get('assignments')
  @Roles(UserRoleDomain.Admin)
  async getAllQuestionAssignments(): Promise<QuestionAssignmentResponseDto[]> {
    return this.questionsService.getAllQuestionAssignments();
  }

  @Get('assignments/:regionId')
  @Roles(UserRoleDomain.Admin)
  async getRegionSpecificAssignments(
    @Param('regionId', new ParseUUIDPipe()) regionId: string,
  ): Promise<QuestionAssignmentResponseDto[]> {
    return this.questionsService.getRegionSpecificAssignments(regionId);
  }
}
