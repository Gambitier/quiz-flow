import { UserRoleDomain } from '@modules/user/models/domain';

export class UserCredentialsDto {
  id: string;
  password: string;
  role: UserRoleDomain;

  constructor(partial: Partial<UserCredentialsDto>) {
    Object.assign(this, partial);
  }
}
