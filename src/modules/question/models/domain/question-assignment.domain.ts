export class QuestionAssignmentDomainModel {
  id: string;
  regionId: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<QuestionAssignmentDomainModel>) {
    Object.assign(this, partial);
  }
}
