import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { JWT } from '@/common/constants/guard.constant';

import { TransactionChargeService } from './transaction-charge.service';

@UseGuards(AuthGuard(JWT))
@Controller('transaction-charges')
export class TransactionChargeController {
  constructor(private readonly transactionChargeService: TransactionChargeService) {}

  @Get('/:amount')
  async calculateCharge(@Param('amount', ParseIntPipe) amount: number) {
    const data = await this.transactionChargeService.calculate(amount);

    return { data };
  }
}
