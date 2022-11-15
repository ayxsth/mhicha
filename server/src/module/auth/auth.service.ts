import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: User) {
    return this.jwtService.sign(payload);
  }
}
