import BaseModel from '@/model/BaseModel';
import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';

@Injectable()
export class ServiceModel extends BaseModel {
  private readonly tableName = 'service';

  create(service: CreateServiceDto & { userId: number }) {
    return this.query.table(this.tableName).insert(service);
  }

  findAll() {
    return this.query
      .table({ s: this.tableName })
      .select('s.id', 's.name', 's.description', 's.type', 's.logo', 's.user_id');
  }

  find(id: number) {
    return this.findAll().select('email').leftJoin('user as u', 's.user_id', 'u.id').where('s.id', id).first();
  }
}
