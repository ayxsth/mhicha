import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@/module/user/user.module';
import { BcryptModule } from '@/module/bcrypt/bcrypt.module';
import { ConfigModule } from '@/module/config/config.module';

import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

import { jwtFactory } from './jwt.factory';

@Module({
  imports: [
    BcryptModule,
    ConfigModule,
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync(jwtFactory)
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
