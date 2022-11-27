import { forwardRef, Module } from '@nestjs/common';

import { EmailModule } from '../email/email.module';
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
  imports: [forwardRef(() => UserModule), StatementModule, TransactionChargeModule, EmailModule]
})
export class BalanceModule {}
