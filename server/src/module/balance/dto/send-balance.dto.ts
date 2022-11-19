import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

import { StatementType } from '@/common/enums/statement.enum';
import { MAX_TRANSFER_AMOUNT, MIN_TRANSFER_AMOUNT } from '@/common/constants/balance.constant';

export class SendBalanceDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(MIN_TRANSFER_AMOUNT)
  @Max(MAX_TRANSFER_AMOUNT)
  amount: number;

  @IsNotEmpty()
  @IsString()
  remark: string;

  @IsNotEmpty()
  @IsEnum([StatementType.DEPOSIT, StatementType.WITHDRAW, StatementType.TRANSFER])
  type: StatementType;
}
