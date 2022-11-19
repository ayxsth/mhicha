import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { StatementModule } from '../statement/statement.module';

import { BalanceController } from './balance.controller';

import { BalanceService } from './balance.service';

import { BalanceModel } from './model/balance.model';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, BalanceModel],
  exports: [BalanceService, BalanceModel],
  imports: [forwardRef(() => UserModule), StatementModule]
})
export class BalanceModule {}
