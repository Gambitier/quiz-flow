export class QuestionAssignmentResponseDto {
  id: string;
  regionId: string;
  questionId: string;
  scheduledStartAt?: Date;
  scheduledEndAt?: Date;

  constructor(partial: Partial<QuestionAssignmentResponseDto>) {
    Object.assign(this, partial);
  }
}
