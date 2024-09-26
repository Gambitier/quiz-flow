import {
  CreateUserDomainModel,
  UserRoleDomain,
} from '@modules/user/models/domain';
import { UserCredentialsDto } from '@modules/user/models/dto';
import { UpdateUserRequest } from '@modules/user/models/request';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaDatabaseErrorHandler } from 'src/common/database-error-handler/prisma.error-handler';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    userDomainModel: CreateUserDomainModel,
    userRole: UserRoleDomain,
  ): Promise<string> {
    let user: { id: string };

    try {
      user = await this.prisma.user.create({
        select: {
          id: true,
        },
        data: {
          firstName: userDomainModel.firstName,
          lastName: userDomainModel.lastName,
          email: userDomainModel.email,
          password: userDomainModel.password,
          role: userRole as Role,
          region: {
            connect: { id: userDomainModel.regionId },
          },
        },
      });
    } catch (error) {
      PrismaDatabaseErrorHandler.HandleError(error);
    }

    return user.id;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(
    id: string,
    updateUserRequest: UpdateUserRequest,
  ): Promise<void> {
    await this.prisma.user.update({
      select: null,
      where: { id },
      data: updateUserRequest,
    });
  }

  async findByEmail(email: string): Promise<UserCredentialsDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return new UserCredentialsDto({
      id: user.id,
      password: user.password,
      role: user.role as UserRoleDomain,
    });
  }
}
