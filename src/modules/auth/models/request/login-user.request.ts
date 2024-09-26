import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@yopmail.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
