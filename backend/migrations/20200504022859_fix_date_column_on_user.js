
exports.up = (knex) => knex.schema.table('user', (table) => {
  table.dropColumn('date');
  table.datetime('created_at').defaultTo(knex.fn.now());
});


exports.down = (knex) => knex.schema.table('user', (table) => {
  table.dropColumn('created_at');
  table.datetime('date');
});
