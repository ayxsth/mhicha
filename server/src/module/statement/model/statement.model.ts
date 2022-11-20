import BaseModel from '@/model/BaseModel';
import { Injectable } from '@nestjs/common';

import { Statement } from '@/common/interface/statement.interface';

@Injectable()
export class StatementModel extends BaseModel {
  private readonly tableName = 'statement';

  findAll(userId: number) {
    return this.query
      .select(
        'st.id',
        'st.amount',
        'st.sender_id as sender_id',
        's.name as sender_name',
        'st.receiver_id as receiver_id',
        'r.name as receiver_name',
        'r.email as receiver_email',
        'st.type',
        'st.transaction_charge_amount as charge',
        'st.remark',
        'st.created_at'
      )
      .from({ st: this.tableName })
      .where('st.sender_id', userId)
      .orWhere('st.receiver_id', userId)
      .leftJoin('user as r', 'st.receiver_id', 'r.id')
      .leftJoin('user as s', 'st.sender_id', 's.id');
  }

  find(userId: number, id: number) {
    const query = this.findAll(userId);

    return query.where('st.id', id).first();
  }

  create(data: Statement) {
    return this.query(this.tableName).insert(data);
  }
}
