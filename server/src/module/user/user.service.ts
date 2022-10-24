import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { UserModel } from './model/user.model';

import { BcryptService } from '@/module/bcrypt/bcrypt.service';

import { UserFindField } from '@/common/enums/user.enum';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(private readonly userModel: UserModel, private readonly bcryptService: BcryptService) {
    this.logger = new Logger(UserService.name);
  }

  findAll() {
    this.logger.log('Finding all users');

    return this.userModel.findAll();
  }

  findOrFail(id: number) {
    this.logger.log(`Finding a user with id ${id}`);

    return this.userModel.findOrFail(id);
  }

  find(id: number) {
    this.logger.log(`Finding a user with id ${id}`);

    return this.userModel.find(id);
  }

  findBy(field: UserFindField, value: string) {
    this.logger.log(`Finding a user with ${field} ${value}`);

    return this.userModel.findBy(field, value);
  }

  findByOrFail(field: UserFindField, value: string) {
    this.logger.log(`Finding a user with ${field} ${value}`);

    return this.userModel.findByOrFail(field, value);
  }

  async create(user: CreateUserDto) {
    const oldUser = await this.findBy(UserFindField.EMAIL, user.email);

    if (oldUser) {
      const errorMessage = `User with email ${user.email} already exists`;

      this.logger.error(errorMessage);

      throw new BadRequestException(errorMessage);
    }

    const hashedPassword = await this.bcryptService.hash(user.password);

    this.logger.log('Creating a new user');

    return this.userModel.create({ ...user, password: hashedPassword });
  }
}
