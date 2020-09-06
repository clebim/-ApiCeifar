import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', table => {
    table.increments('id').primary();
    table.float('value').notNullable();
    table.string('description').notNullable();
    table.date('pay_day').notNullable();
    table.boolean('deleted').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payments');
}
