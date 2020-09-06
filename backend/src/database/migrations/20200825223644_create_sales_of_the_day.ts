import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sales_of_the_day', table => {
    table.increments('id').primary();
    table.float('money').notNullable();
    table.float('credit_card').notNullable();
    table.float('debit_card').notNullable();
    table.float('total').notNullable();
    table.date('date').notNullable().unique();
    table.boolean('deleted').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sales_of_the_day');
}
