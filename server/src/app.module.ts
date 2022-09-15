import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { KnexModule } from './module/knex/knex.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [KnexModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
