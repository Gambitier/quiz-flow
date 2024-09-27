export class QuestionAssignmentResponseDto {
  id: string;
  regionId: string;
  questionId: string;

  constructor(partial: Partial<QuestionAssignmentResponseDto>) {
    Object.assign(this, partial);
  }
}
