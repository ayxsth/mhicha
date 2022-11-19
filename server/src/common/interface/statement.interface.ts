import { StatementType } from '../enums/statement.enum';

export interface Statement {
  id?: number;
  amount: number;
  senderId: number;
  receiverId: number;
  type: StatementType;
  transactionChargeId: number;
  transactionChargeAmount: number;
  remark: string;
}
