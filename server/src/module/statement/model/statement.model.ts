import BaseModel from '@/model/BaseModel';
import { Injectable } from '@nestjs/common';

import { Statement } from '@/common/interface/statement.interface';

@Injectable()
export class StatementModel extends BaseModel {
  private readonly tableName = 'statement';

  find(userId: number) {
    return this.query
      .select(
        'st.id',
        'st.amount',
        'st.sender_id as sender_id',
        's.name as sender_name',
        'st.receiver_id as receiver_id',
        'r.name as receiver_name',
        'st.type',
        'st.transaction_charge_amount as charge',
        'st.remark',
        'st.created_at'
      )
      .from({ st: this.tableName })
      .orWhere('st.sender_id', userId)
      .orWhere('st.receiver_id', userId)
      .leftJoin('user as r', 'st.receiver_id', 'r.id')
      .leftJoin('user as s', 'st.sender_id', 's.id');
  }

  create(data: Statement) {
    return this.query(this.tableName).insert(data);
  }
}
