import { Injectable } from '@nestjs/common';

import { StatementModel } from './model/statement.model';

import { Statement } from '@/common/interface/statement.interface';

@Injectable()
export class StatementService {
  constructor(private readonly statementModel: StatementModel) {}

  find(userId: number) {
    return this.statementModel.find(userId);
  }

  create(data: Statement) {
    return this.statementModel.create(data);
  }
}
