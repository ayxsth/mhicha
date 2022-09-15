import { registerAs } from '@nestjs/config';

import { DatabaseConfig } from './interfaces/config.interface';

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    client: process.env.DB_CLIENT || 'mysql2',
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'mhicha',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    timezone: process.env.DB_TIMEZONE || 'Asia/Kathmandu'
  })
);
