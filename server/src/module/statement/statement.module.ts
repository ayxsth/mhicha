import { Module } from '@nestjs/common';

import { StatementService } from './statement.service';

import { StatementModel } from './model/statement.model';

import { StatementController } from './statement.controller';

@Module({
  controllers: [StatementController],
  providers: [StatementService, StatementModel],
  exports: [StatementService]
})
export class StatementModule {}
