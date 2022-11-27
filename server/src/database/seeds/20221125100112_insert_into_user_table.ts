import { Knex } from 'knex';

const TABLE_NAME = 'user';

/**
 * Delete existing entries and seed values for user.
 *
 */
export function seed(knex: Knex) {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          name: 'Service Provider',
          email: 'serviceprovider@mhicha.com',
          password: 'serviceProvider',
          phone: '9840000000',
          gender: 'MALE',
          status: 'VERIFIED'
        }
      ]);
    });
}
