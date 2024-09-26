import { JwtPayloadDto } from '@modules/auth/models/dto/jwt-payload.dto';
import { UserRoleDomain } from '@modules/user/models/domain';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleDomain[]) =>
  SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleDomain[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user: jwtPayload } = context.switchToHttp().getRequest() as {
      user: JwtPayloadDto;
    };

    const isAuthorized: boolean = requiredRoles.some(
      (role) => jwtPayload.role == role,
    );

    return isAuthorized;
  }
}
