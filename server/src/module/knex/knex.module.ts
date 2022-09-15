import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@/module/config/config.module';

import { KnexService } from './knex.service';

import { knexConnectionFactory } from './knex.factory';

@Global()
@Module({
  exports: [KnexService, knexConnectionFactory],
  imports: [ConfigModule],
  providers: [KnexService, knexConnectionFactory]
})
export class KnexModule {}
