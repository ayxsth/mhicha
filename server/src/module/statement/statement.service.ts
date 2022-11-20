import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { StatementModel } from './model/statement.model';

import { Statement } from '@/common/interface/statement.interface';

@Injectable()
export class StatementService {
  private logger: Logger;

  constructor(private readonly statementModel: StatementModel) {
    this.logger = new Logger(StatementService.name);
  }

  findAll(userId: number) {
    this.logger.log(`Finding statements for user with id ${userId}`);

    return this.statementModel.findAll(userId);
  }

  find(userId: number, id: number) {
    this.logger.log(`Finding statement with id ${id}`);

    return this.statementModel.find(userId, id);
  }

  async findOrFail(userId: number, id: number) {
    this.logger.log(`Finding statement with id ${id}`);

    const statement = await this.statementModel.find(userId, id);

    if (!statement) {
      throw new NotFoundException('Statement not found');
    }

    return statement;
  }

  create(data: Statement) {
    this.logger.log(`Creating a statement for user with id ${data.senderId}`);

    return this.statementModel.create(data);
  }
}
