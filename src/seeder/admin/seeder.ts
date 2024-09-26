import { AppModule } from '@app/app.module';
import { UserRoleDomain } from '@modules/user/models/domain';
import { UserService } from '@modules/user/user.service';
import { NestFactory } from '@nestjs/core';

async function seedAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const adminUser = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Admin@123',
    regionId: '87157c2a-d483-41ae-8a2b-fe8c57f1c2cf', // United States
  };

  try {
    const userId = await userService.createUser(
      adminUser,
      UserRoleDomain.Admin,
    );
    console.log(`Admin user created with ID: ${userId}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

seedAdminUser();
