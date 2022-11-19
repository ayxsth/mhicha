import { Knex } from 'knex';

const TABLE_NAME = 'transaction_charge';

/**
 * Create table transaction_charge.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.bigint('charge_percentage').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.specificType('updated_at', 'timestamp ON UPDATE CURRENT_TIMESTAMP');
  });
}

/**
 * Drop transaction_charge.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
