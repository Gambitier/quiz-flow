import { AllExceptionsFilter } from '@app/filters/all-exceptions.filter';
import { APIResponseInterceptor } from '@app/interceptors/api.response.interceptor';
import { PrismaService } from '@app/prisma.service';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/role-authz.guard';
import { QuestionModule } from '@modules/question/question.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UserModule, AuthModule, QuestionModule],
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
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
