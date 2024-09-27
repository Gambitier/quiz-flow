import { PrismaService } from '@app/prisma.service';
import { UserServiceProvider } from '@modules/user/service.providers';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserServiceProvider],
})
export class UserModule {}
