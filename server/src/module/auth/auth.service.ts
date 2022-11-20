import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(private readonly jwtService: JwtService) {
    this.logger = new Logger(AuthService.name);
  }

  generateToken(payload: User) {
    this.logger.log(`Generating token for user with id ${payload.id}`);

    return this.jwtService.sign(payload);
  }
}
