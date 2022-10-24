import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';

import { NP } from '@/common/constants/user.constant';

import { UserGenderType } from '@/common/enums/user.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber(NP)
  phone: string;

  @IsEnum(UserGenderType)
  gender: UserGenderType;
}
