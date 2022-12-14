import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { UserModel } from './model/user.model';

import { KnexService } from '@/module/knex/knex.service';
import { BcryptService } from '@/module/bcrypt/bcrypt.service';
import { BalanceService } from '@/module/balance/balance.service';

import { UserFindField } from '@/common/enums/user.enum';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(
    private readonly userModel: UserModel,
    private readonly knexService: KnexService,
    private readonly bcryptService: BcryptService,
    private readonly balanceService: BalanceService
  ) {
    this.logger = new Logger(UserService.name);
  }

  findAll() {
    this.logger.log('Finding all users');

    return this.userModel.findAll();
  }

  async findOrFail(id: number) {
    this.logger.log(`Finding a user with id ${id}`);

    const user = await this.userModel.find(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  find(id: number) {
    this.logger.log(`Finding a user with id ${id}`);

    return this.userModel.find(id);
  }

  findBy(field: UserFindField, value: string) {
    this.logger.log(`Finding a user with ${field} ${value}`);

    return this.userModel.findBy(field, value);
  }

  login(email: string) {
    this.logger.log(`Finding a user with email ${email}`);

    return this.userModel.login(email);
  }

  async findByOrFail(field: UserFindField, value: string) {
    this.logger.log(`Finding a user with ${field} ${value}`);

    const user = await this.userModel.findBy(field, value);

    if (!user) {
      throw new NotFoundException(`User with ${field}: ${value} not found!`);
    }

    return user;
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

    const id = await this.knexService.getKnex().transaction(async (trx) => {
      const [id] = await this.userModel.create({ ...user, password: hashedPassword });
      await this.balanceService.create(id, trx);

      return id;
    });

    return this.findOrFail(id);
  }

  me(id: number) {
    this.logger.log(`Finding a user with id ${id}`);

    return this.userModel.me(id);
  }
}
