import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@/module/user/user.module';
import { StatementModule } from '@/module/statement/statement.module';
import { TransactionChargeModule } from '@/module/transaction-charge/transaction-charge.module';

import { BalanceController } from './balance.controller';

import { BalanceService } from './balance.service';

import { BalanceModel } from './model/balance.model';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, BalanceModel],
  exports: [BalanceService],
  imports: [forwardRef(() => UserModule), StatementModule, TransactionChargeModule]
})
export class BalanceModule {}
