import { Knex } from 'knex';

import { StatementType } from '../../common/enums/statement.enum';

const TABLE_NAME = 'statement';

/**
 * Create table statement.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.text('remark').notNullable();
    table.double('amount').notNullable();
    table.bigint('sender_id').unsigned().references('id').inTable('user');
    table.bigint('receiver_id').unsigned().references('id').inTable('user');
    table.bigint('transaction_charge_id').unsigned().references('id').inTable('transaction_charge');
    table.bigint('transaction_charge_amount').unsigned().notNullable();
    table.enum('type', [StatementType.DEPOSIT, StatementType.TRANSFER, StatementType.WITHDRAW]).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.specificType('updated_at', 'timestamp ON UPDATE CURRENT_TIMESTAMP');
  });
}

/**
 * Drop statement.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
