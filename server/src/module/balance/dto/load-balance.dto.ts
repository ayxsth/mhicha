import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

import { MAX_TRANSFER_AMOUNT, MIN_TRANSFER_AMOUNT } from '@/common/constants/balance.constant';

import { StatementType } from '@/common/enums/statement.enum';

export class LoadBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(MIN_TRANSFER_AMOUNT)
  @Max(MAX_TRANSFER_AMOUNT)
  amount: number;

  @IsNotEmpty()
  @IsEnum([StatementType.DEPOSIT, StatementType.WITHDRAW, StatementType.TRANSFER])
  type: StatementType;
}
