export class LoginUserDto {
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
