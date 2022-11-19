import { Knex } from 'knex';
import { BadRequestException, Injectable } from '@nestjs/common';

import { BalanceModel } from './model/balance.model';

import { SendBalanceDto } from './dto/send-balance.dto';

import { KnexService } from '../knex/knex.service';
import { StatementService } from '../statement/statement.service';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceModel: BalanceModel,
    private readonly knexService: KnexService,
    private readonly statementService: StatementService
  ) {}

  create(userId: number, trx: Knex.Transaction<any, any[]>) {
    return this.balanceModel.create(userId).transacting(trx);
  }

  async transfer(sender: User, receiver: User, transfer: SendBalanceDto) {
    const { balance: senderBalance } = await this.find(sender.id);

    if (senderBalance < transfer.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const statement = this.knexService.getKnex().transaction(async () => {
      const statement = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: transfer.amount,
        remark: transfer.remark,
        type: transfer.type,
        transactionChargeId: 1,
        transactionChargeAmount: 1
      };

      await this.statementService.create(statement);
      await this.balanceModel.transfer(sender.id, receiver.id, transfer.amount);

      return statement;
    });

    return statement;
  }

  find(id: number) {
    return this.balanceModel.find(id);
  }
}
