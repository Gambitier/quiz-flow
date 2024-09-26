import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
