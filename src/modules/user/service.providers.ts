import { UserService } from '@modules/user/user.service';
import { Provider } from '@nestjs/common';

export const UserServiceProvider: Provider = {
  provide: UserService,
  useClass: UserService,
};
