import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtPayloadDto } from './models/dto/jwt-payload.dto';
import { LoginUserDto } from './models/dto/login-user.dto';
import { LoginUserRequest } from './models/request/login-user.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials and return token
  async login(loginRequest: LoginUserRequest): Promise<LoginUserDto> {
    const user = await this.userService.findByEmail(loginRequest.email);

    if (
      !user ||
      !(await bcrypt.compare(loginRequest.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayloadDto = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    return new LoginUserDto(accessToken);
  }
}
