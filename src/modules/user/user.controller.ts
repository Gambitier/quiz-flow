import { AllowAnonymous } from '@modules/auth/guards/allow-anonymous.guard';
import { Roles } from '@modules/auth/guards/role-authz.guard';
import {
  CreateUserDomainModel,
  UserRoleDomain,
} from '@modules/user/models/domain';
import {
  CreateAdminRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from '@modules/user/models/request';
import { UserService } from '@modules/user/user.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @AllowAnonymous()
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<{ id: string }> {
    const userDomainModel = new CreateUserDomainModel({
      ...createUserRequest,
    });

    const id = await this.userService.createUser(
      userDomainModel,
      UserRoleDomain.User,
    );

    return { id: id };
  }

  @Post('admin')
  @Roles(UserRoleDomain.Admin)
  async createAdmin(
    @Body() createAdminRequest: CreateAdminRequest,
  ): Promise<{ id: string }> {
    const userDomainModel = new CreateUserDomainModel({
      ...createAdminRequest,
    });

    const id = await this.userService.createUser(
      userDomainModel,
      UserRoleDomain.Admin,
    );

    return { id: id };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserRequest);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
