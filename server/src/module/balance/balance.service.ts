import { Knex } from 'knex';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { BalanceModel } from './model/balance.model';

import { SendBalanceDto } from './dto/send-balance.dto';

import { KnexService } from '@/module/knex/knex.service';
import { StatementService } from '@/module/statement/statement.service';
import { TransactionChargeService } from '@/module/transaction-charge/transaction-charge.service';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class BalanceService {
  private logger: Logger;

  constructor(
    private readonly balanceModel: BalanceModel,
    private readonly knexService: KnexService,
    private readonly statementService: StatementService,
    private readonly transactionChargeService: TransactionChargeService
  ) {
    this.logger = new Logger(BalanceService.name);
  }

  create(userId: number, trx: Knex.Transaction<any, any[]>) {
    this.logger.log(`Creating a balance for user with id ${userId}`);

    return this.balanceModel.create(userId).transacting(trx);
  }

  async transfer(sender: User, receiver: User, transfer: SendBalanceDto) {
    const { balance: senderBalance } = await this.find(sender.id);
    const { id: chargeId, charge } = await this.transactionChargeService.calculate(transfer.amount);

    if (senderBalance < transfer.amount + charge) {
      throw new BadRequestException('Insufficient funds');
    }

    const statement = this.knexService.getKnex().transaction(async () => {
      const statement = {
        senderId: sender.id,
        receiverId: receiver.id,
        amount: transfer.amount,
        remark: transfer.remark,
        type: transfer.type,
        transactionChargeId: chargeId,
        transactionChargeAmount: charge
      };

      this.logger.log(`Creating a statement for user with id ${sender.id}`);
      const [id] = await this.statementService.create(statement);

      this.logger.log(`Updating balance for users with id ${sender.id} and ${receiver.id}`);
      await this.balanceModel.transfer(sender.id, receiver.id, transfer.amount);

      this.logger.log(`Updating balance for user with id ${sender.id}`);
      await this.balanceModel.decrease(sender.id, charge);

      return this.statementService.find(sender.id, id);
    });

    return statement;
  }

  find(id: number) {
    this.logger.log(`Finding balance for user with id ${id}`);

    return this.balanceModel.find(id);
  }
}
