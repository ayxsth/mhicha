import { Module } from '@nestjs/common';

import { TransactionChargeService } from './transaction-charge.service';

import { TransactionChargeModel } from './model/transaction-charge.model';

@Module({
  providers: [TransactionChargeService, TransactionChargeModel],
  exports: [TransactionChargeService]
})
export class TransactionChargeModule {}
