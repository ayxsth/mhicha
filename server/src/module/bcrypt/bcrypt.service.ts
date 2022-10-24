import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  private async generateSaltRounds() {
    return bcrypt.genSalt();
  }

  async hash(password: string) {
    const saltRounds = await this.generateSaltRounds();

    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
