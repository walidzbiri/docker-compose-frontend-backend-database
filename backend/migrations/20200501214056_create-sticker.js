exports.up = (knex) => knex.schema.createTable('sticker', (table) => {
  table.increments();
  table.string('title');
  table.string('description');
  table.float('rating');
  table.string('url');
  table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
});

exports.down = (knex) => knex.schema.dropTableIfExists('sticker');
