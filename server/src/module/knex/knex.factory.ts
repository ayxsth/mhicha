import { KNEX_CONNECTION } from '@/constant/knex.constant';

import { KnexService } from './knex.service';

export const knexConnectionFactory = {
  inject: [KnexService],
  provide: KNEX_CONNECTION,
  useFactory: async (knexService: KnexService) => knexService.getKnex()
};
