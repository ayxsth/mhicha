import { UserGenderType, UserStatusType } from '$/constants/user.constant';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  gender: UserGenderType;
  status: UserStatusType;
  balance?: number;
}
