export class UpdateUserDomainModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  regionId: string;

  constructor(partial: Partial<UpdateUserDomainModel>) {
    Object.assign(this, partial);
  }
}
