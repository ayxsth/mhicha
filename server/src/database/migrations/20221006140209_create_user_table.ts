import { Knex } from 'knex';

import { UserStatusType, UserGenderType } from '../../common/enums/user.enum';

const TABLE_NAME = 'user';

/**
 * Create table user.
 *
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('phone', 15).notNullable();
    table.enum('gender', [UserGenderType.MALE, UserGenderType.FEMALE, UserGenderType.OTHER]).notNullable();
    table
      .enum('status', [UserStatusType.VERIFIED, UserStatusType.UNVERIFIED])
      .notNullable()
      .defaultTo(UserStatusType.UNVERIFIED);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.timestamp('deleted_at');
  });
}

/**
 * Drop user.
 *
 */
export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
