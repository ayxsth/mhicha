import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

import { NP } from '@/common/constants/user.constant';

import { UserGenderType } from '@/common/enums/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber(NP)
  @IsNotEmpty()
  phone: string;

  @IsEnum(UserGenderType)
  @IsNotEmpty()
  gender: UserGenderType;
}
