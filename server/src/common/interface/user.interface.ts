import { UserGenderType, UserStatusType } from '@/common/enums/user.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  gender: UserGenderType;
  status: UserStatusType;
  balance?: number;
}
