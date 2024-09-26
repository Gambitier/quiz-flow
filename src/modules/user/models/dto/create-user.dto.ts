export class CreateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  regionId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
