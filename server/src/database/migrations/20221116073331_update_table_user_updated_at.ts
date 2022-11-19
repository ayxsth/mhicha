import { Knex } from 'knex';

const TABLE_NAME = 'user';

/**
 * Change column updated_at type in table user.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.specificType('updated_at', 'timestamp ON UPDATE CURRENT_TIMESTAMP').alter();
  });
}

/**
 * Revert column updated_at type in table user.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.timestamp('updated_at').alter();
  });
}
