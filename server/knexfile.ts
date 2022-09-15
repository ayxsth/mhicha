import { config } from 'dotenv';

import { KnexConfig } from '@/module/knex/interfaces/knex.interface';

config({ path: __dirname + '/.env' });

const connection = {
  charset: 'utf8',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  timezone: process.env.DB_TIMEZONE,
};

const knexConfig: KnexConfig = {
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
    stub: __dirname + '/stub/migration.stub',
  },
  seeds: {
    directory: './database/seeds',
    stub: __dirname + '/stub/seed.stub',
  },
};

export default knexConfig;
