const stickers = require('../stickers');

exports.seed = (knex) => knex('sticker').del()
  .then(() => knex('sticker').insert(stickers));