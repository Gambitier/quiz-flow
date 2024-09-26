import { AllowAnonymous } from '@modules/auth/guards/allow-anonymous.guard';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/dto/login-user.dto';
import { LoginUserRequest } from './models/request/login-user.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AllowAnonymous()
  async login(
    @Body() loginUserRequest: LoginUserRequest,
  ): Promise<LoginUserDto> {
    return this.authService.login(loginUserRequest);
  }
}
