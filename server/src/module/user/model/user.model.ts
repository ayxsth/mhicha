import { Injectable, NotFoundException } from '@nestjs/common';

import BaseModel from '@/model/BaseModel';

import { CreateUserDto } from '@/module/user/dto/create-user.dto';

@Injectable()
export class UserModel extends BaseModel {
  private readonly tableName = 'user';

  create(user: CreateUserDto) {
    return this.query.table(this.tableName).insert(user);
  }

  findAll() {
    return this.query.select('id', 'name', 'email', 'phone', 'gender', 'status').from(this.tableName);
  }

  async findOrFail(id: number) {
    const query = this.findAll();

    const user = await query.where('id', id).first();

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  find(id: number) {
    const query = this.findAll();

    return query.where('id', id).first();
  }

  findBy(field: string, value: string) {
    const query = this.findAll();

    return query.where(field, value).first();
  }

  async findByOrFail(field: string, value: string) {
    const query = this.findAll();

    const user = await query.where(field, value).first();

    if (!user) {
      throw new NotFoundException(`User with ${field}: ${value} not found!`);
    }

    return user;
  }

  login(email: string) {
    const query = this.findBy('email', email);

    query.select('password');

    return query;
  }
}
