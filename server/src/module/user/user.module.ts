import { forwardRef, Module } from '@nestjs/common';

import { UserService } from './user.service';

import { UserModel } from './model/user.model';

import { UserController } from './user.controller';

import { AuthModule } from '../auth/auth.module';
import { BcryptModule } from '@/module/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserModel],
  exports: [UserService, UserModel]
})
export class UserModule {}
