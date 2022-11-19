import _ from 'lodash';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '@/module/user/user.service';
import { BcryptService } from '@/module/bcrypt/bcrypt.service';

import { EMAIL, PASSWORD } from '@/common/constants/jwt.constant';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly bcryptService: BcryptService) {
    super({
      usernameField: EMAIL,
      passwordField: PASSWORD
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.login(email);

    const isValidPassword = await this.bcryptService.compare(password, user?.password ?? '');

    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return _.omit(user, 'password');
  }
}
