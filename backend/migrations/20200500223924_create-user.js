
exports.up = (knex) => knex.schema.createTable('user', (table) => {
  table.increments();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.datetime('date').notNullable();
  table.boolean('is_active').notNullable().defaultTo(true);
});

exports.down = (knex) => knex.schema.dropTableIfExists('user');
