import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sales', table => {
    table.increments('id').primary();
    table.float('value').notNullable();
    table.string('method').notNullable();
    table.date('date_of_sale').notNullable();
    table.boolean('deleted').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sales');
}
