import * as Knex from 'knex';
const bcrypt = require('bcryptjs');

export async function seed(knex: Knex): Promise<void> {
  await knex('users').insert([
    {
      name: 'Panificadora Ceifar',
      email: 'ceifar@ceifar.com',
      password_hash: bcrypt.hashSync('2675ceifar', 8),
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
