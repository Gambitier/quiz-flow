export class QuestionDomainModel {
  id: string;
  content: string;
  meta: any; // TODO: use type Literal Types
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<QuestionDomainModel>) {
    Object.assign(this, partial);
  }
}
