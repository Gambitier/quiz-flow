import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserServiceProvider } from '@modules/user/service.providers';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserServiceProvider],
})
export class UserModule {}
