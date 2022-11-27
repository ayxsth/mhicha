import { Knex } from 'knex';

const TABLE_NAME = 'balance';

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
          user_id: 1,
          amount: 0
        }
      ]);
    });
}
