import { UserRoleDomain } from '@modules/user/models/domain';

export class JwtPayloadDto {
  id: string;
  role: UserRoleDomain;

  constructor(partial: Partial<JwtPayloadDto>) {
    Object.assign(this, partial);
  }
}
