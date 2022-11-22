import { Module } from '@nestjs/common';

import { TransactionChargeService } from './transaction-charge.service';

import { TransactionChargeModel } from './model/transaction-charge.model';
import { TransactionChargeController } from './transaction-charge.controller';

@Module({
  providers: [TransactionChargeService, TransactionChargeModel],
  exports: [TransactionChargeService],
  controllers: [TransactionChargeController]
})
export class TransactionChargeModule {}
