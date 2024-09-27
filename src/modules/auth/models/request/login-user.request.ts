import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@yopmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
