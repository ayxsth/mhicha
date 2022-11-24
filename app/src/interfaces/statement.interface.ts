import { Fund } from './fund.interface';

interface Sender {
  senderId: number;
  senderName: string;
}

interface Receiver {
  receiverId: number;
  receiverName: string;
  receiverEmail: string;
}

export interface Statement
  extends Omit<Sender, 'senderName'>,
    Omit<Receiver, 'receiverName' | 'receiverEmail'>,
    Omit<Fund, 'email' | 'type' | 'remark'> {
  id: number;
  createdAt: string;
}

export interface StatementDetail extends Sender, Receiver, Omit<Fund, 'email'> {
  id: number;
  charge: number;
  createdAt: string;
}
