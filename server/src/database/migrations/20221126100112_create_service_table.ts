import { Knex } from 'knex';

import { ServiceType } from '../../common/enums/service.enum';

const TABLE_NAME = 'service';

/**
 * Create table service.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name').notNullable();
    table
      .enum('type', [ServiceType.ENTERTAINMENT, ServiceType.FOOD, ServiceType.ONLINE_SHOPPING, ServiceType.TOP_UP])
      .notNullable();
    table.bigint('user_id').unsigned().references('id').inTable('user');
    table.text('description').notNullable();
    table.string('logo').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.specificType('updated_at', 'timestamp ON UPDATE CURRENT_TIMESTAMP');
  });
}

/**
 * Drop service.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
