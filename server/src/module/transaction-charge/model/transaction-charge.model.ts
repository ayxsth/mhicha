import { Injectable } from '@nestjs/common';

import BaseModel from '@/model/BaseModel';

@Injectable()
export class TransactionChargeModel extends BaseModel {
  private readonly tableName = 'transaction_charge';

  private findAll() {
    return this.query.select('id', 'charge_percentage').from(this.tableName);
  }

  find() {
    const query = this.findAll();

    return query.orderBy('id', 'desc').first();
  }
}
