import { Knex } from 'knex';
import { Inject } from '@nestjs/common';

import { KNEX_CONNECTION } from '@/common/constants/knex.constant';

export default class BaseModel {
  constructor(@Inject(KNEX_CONNECTION) protected readonly query: Knex) {}
}
