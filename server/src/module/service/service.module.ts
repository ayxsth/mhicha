import { Module } from '@nestjs/common';

import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

import { BalanceModule } from '../balance/balance.module';

import { ServiceModel } from './model/service.model';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceModel],
  imports: [BalanceModule]
})
export class ServiceModule {}
