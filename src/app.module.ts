import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { APIResponseInterceptor } from 'src/interceptors/api.response.interceptor';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: APIResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
