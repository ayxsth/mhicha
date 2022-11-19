import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { KnexModule } from './module/knex/knex.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { BcryptModule } from './module/bcrypt/bcrypt.module';
import { BalanceModule } from './module/balance/balance.module';
import { StatementModule } from './module/statement/statement.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [KnexModule, UserModule, BcryptModule, AuthModule, BalanceModule, StatementModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
