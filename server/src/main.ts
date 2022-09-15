import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

import { ConfigService } from './module/config/config.service';

const API_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX);

  // CORS
  app.enableCors();

  // Start App
  const appConfig = app.get(ConfigService).getAppConfig();
  Logger.log(`Application ${appConfig.name} started on: ${appConfig.port}`);
  await app.listen(appConfig.port);
}

bootstrap();
