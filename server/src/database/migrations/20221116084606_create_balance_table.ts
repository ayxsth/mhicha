import { Knex } from 'knex';

const TABLE_NAME = 'balance';

/**
 * Create table balance.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.bigint('user_id').unsigned().references('id').inTable('user');
    table.double('amount').notNullable().defaultTo(0);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.specificType('updated_at', 'timestamp ON UPDATE CURRENT_TIMESTAMP');
  });
}

/**
 * Drop balance.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
