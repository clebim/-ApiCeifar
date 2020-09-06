import * as Knex from 'knex';

const bcrypt = require('bcryptjs');

export async function seed(knex: Knex): Promise<any> {
  await knex('users').insert([
    {
      name: 'Panificadora Ceifar',
      email: 'admin@ceifar.com',
      password_hash: bcrypt.hashSync('ceifar000', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
