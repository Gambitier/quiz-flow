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
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './models/dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AllowAnonymous()
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<CreateUserDto> {
    const userDomainModel = new CreateUserDomainModel({
      ...createUserRequest,
    });

    return this.userService.createUser(userDomainModel, UserRoleDomain.User);
  }

  @Post('admin')
  @Roles(UserRoleDomain.Admin)
  async createAdmin(
    @Body() createAdminRequest: CreateAdminRequest,
  ): Promise<CreateUserDto> {
    const userDomainModel = new CreateUserDomainModel({
      ...createAdminRequest,
    });

    return this.userService.createUser(userDomainModel, UserRoleDomain.Admin);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<CreateUserDto> {
    return this.userService.updateUser(id, updateUserRequest);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
