export class CreateUserDomainModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  regionId: string;

  constructor(partial: Partial<CreateUserDomainModel>) {
    Object.assign(this, partial);
  }
}
