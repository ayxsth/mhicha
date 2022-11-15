import { UserGenderType, UserStatusType } from '../enums/user.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: UserGenderType;
  status: UserStatusType;
}

export interface UserWithPassword extends User {
  password: string;
}
