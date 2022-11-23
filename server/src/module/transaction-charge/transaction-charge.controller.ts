import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransactionChargeService } from './transaction-charge.service';

@Controller('transaction-charges')
export class TransactionChargeController {
  constructor(private readonly transactionChargeService: TransactionChargeService) {}

  @Get('/:amount')
  async calculateCharge(@Param('amount', ParseIntPipe) amount: number) {
    const data = await this.transactionChargeService.calculate(amount);

    return { data };
  }
}
