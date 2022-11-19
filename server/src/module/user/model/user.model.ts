import { Injectable } from '@nestjs/common';

import BaseModel from '@/model/BaseModel';

import { CreateUserDto } from '@/module/user/dto/create-user.dto';

@Injectable()
export class UserModel extends BaseModel {
  private readonly tableName = 'user';

  create(user: CreateUserDto) {
    return this.query.table(this.tableName).insert(user);
  }

  findAll() {
    return this.query.select('u.id', 'name', 'email', 'phone', 'gender', 'status').from({ u: this.tableName });
  }

  find(id: number) {
    const query = this.findAll();

    return query.where('u.id', id).first();
  }

  findBy(field: string, value: string) {
    const query = this.findAll();

    return query.where(field, value).first();
  }

  login(email: string) {
    const query = this.findBy('u.email', email);

    query.select('password');

    return query;
  }

  me(id: number) {
    const query = this.find(id);

    query.select('amount as balance').leftJoin('balance', 'balance.user_id', 'u.id');

    return query;
  }
}
