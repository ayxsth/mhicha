import { Injectable } from '@nestjs/common';

import BaseModel from '@/model/BaseModel';

@Injectable()
export class BalanceModel extends BaseModel {
  private readonly tableName = 'balance';

  private findAll() {
    return this.query.select('id', 'user_id', 'amount as balance').from(this.tableName);
  }

  find(userId: number) {
    const query = this.findAll();

    return query.where('user_id', userId).first();
  }

  decrease(userId: number, amount: number) {
    return this.query(this.tableName).where('user_id', userId).decrement('amount', amount);
  }

  increase(userId: number, amount: number) {
    return this.query(this.tableName).where('user_id', userId).increment('amount', amount);
  }

  create(userId: number) {
    return this.query(this.tableName).insert({ userId, amount: 0 });
  }

  transfer(from: number, to: number, amount: number) {
    return this.query.transaction(async (trx) => {
      await trx(this.tableName).where('user_id', from).decrement('amount', amount);
      await trx(this.tableName).where('user_id', to).increment('amount', amount);
    });
  }
}
