import { Knex } from 'knex';

const TABLE_NAME = 'transaction_charge';

/**
 * Delete existing entries and seed values for transaction_charge.
 *
 */
export function seed(knex: Knex) {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          charge_percentage: 1
        }
      ]);
    });
}
