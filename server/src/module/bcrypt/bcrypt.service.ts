import bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BcryptService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(BcryptService.name);
  }

  private async generateSaltRounds() {
    this.logger.log('Generating salt rounds');

    return bcrypt.genSalt();
  }

  async hash(password: string) {
    const saltRounds = await this.generateSaltRounds();

    this.logger.log(`Hashing password with salt rounds`);

    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashedPassword: string) {
    this.logger.log('Comparing password with hashed password');

    return bcrypt.compare(password, hashedPassword);
  }
}
