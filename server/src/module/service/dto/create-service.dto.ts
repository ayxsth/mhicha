import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ServiceType } from '@/common/enums/service.enum';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ServiceType)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  logo: string;
}
