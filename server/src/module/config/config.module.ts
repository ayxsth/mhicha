import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import jwtConfig from './jwt.config';
import appConfig from './app.config';
import databaseConfig from './database.config';

import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig]
    })
  ],
  providers: [ConfigService]
})
export class ConfigModule {}
