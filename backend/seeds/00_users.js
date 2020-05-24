const users = require('../users');

exports.seed = (knex) => knex('user').del()
  .then(() => knex('user').insert(users));
