import { registerAs } from '@nestjs/config';

import { JwtConfig } from './interfaces/config.interface';

export default registerAs(
  'jwt',
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET || 'mhicha',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  })
);
