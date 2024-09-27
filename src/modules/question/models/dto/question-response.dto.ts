export class QuestionResponseDto {
  id: string;
  content: string;
  meta: any;

  constructor(partial: Partial<QuestionResponseDto>) {
    Object.assign(this, partial);
  }
}
