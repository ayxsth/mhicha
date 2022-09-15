import { registerAs } from '@nestjs/config';

import { AppConfig } from './interfaces/config.interface';

export default registerAs(
  'app',
  (): AppConfig => ({
    name: process.env.APP_NAME || 'mhicha',
    port: Number(process.env.APP_PORT) || 3000,
    version: process.env.APP_VERSION
  })
);
