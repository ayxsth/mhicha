import { Injectable } from '@nestjs/common';
import { TransactionChargeModel } from './model/transaction-charge.model';

@Injectable()
export class TransactionChargeService {
  constructor(private readonly transactionChargeModel: TransactionChargeModel) {}

  async calculate(amount: number) {
    const { id, chargePercentage } = await this.transactionChargeModel.find();

    const charge = (amount * chargePercentage) / 100;

    return { id, charge };
  }
}
