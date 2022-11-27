import { Knex } from 'knex';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { BalanceModel } from './model/balance.model';

import { SendBalanceDto } from './dto/send-balance.dto';
import { LoadBalanceDto } from './dto/load-balance.dto';

import { KnexService } from '@/module/knex/knex.service';
import { StatementService } from '@/module/statement/statement.service';
import { TransactionChargeService } from '@/module/transaction-charge/transaction-charge.service';

import { EmailService } from '@/module/email/email.service';

import { User } from '@/common/interface/user.interface';

@Injectable()
export class BalanceService {
  private logger: Logger;

  constructor(
    private readonly balanceModel: BalanceModel,
    private readonly knexService: KnexService,
    private readonly emailService: EmailService,
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

      const [id] = await this.statementService.create(statement);

      await this.balanceModel.transfer(sender.id, receiver.id, transfer.amount);

      await this.balanceModel.decrease(sender.id, charge);

      return this.statementService.find(sender.id, id);
    });

    this.emailService.sendTransferMail(sender.email, receiver.email, sender.name, receiver.name, transfer.amount);

    return statement;
  }

  find(id: number) {
    this.logger.log(`Finding balance for user with id ${id}`);

    return this.balanceModel.find(id);
  }

  load(userId: number, transfer: LoadBalanceDto) {
    this.logger.log(`Loading balance for user with id ${userId}`);

    const statement = this.knexService.getKnex().transaction(async () => {
      const statement = {
        senderId: userId,
        receiverId: userId,
        amount: transfer.amount,
        remark: 'Self Load',
        type: transfer.type,
        transactionChargeId: null,
        transactionChargeAmount: 0
      };

      const [id] = await this.statementService.create(statement);

      await this.balanceModel.increase(userId, transfer.amount);

      return this.statementService.find(userId, id);
    });

    return statement;
  }
}
