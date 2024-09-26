export class QuestionAssignmentDomainModel {
  id: string;
  regionId: string;
  questionId: string;
  scheduledStartAt?: Date;
  scheduledEndAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<QuestionAssignmentDomainModel>) {
    Object.assign(this, partial);
  }
}
