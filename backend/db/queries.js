const knex = require('./connection');

module.exports = {
  getAllUsers: () => knex('user'), // return all rows in sticker table
  getUser: (id) => knex('user').where({ id }).first(), // return a specific user
  getUserStickers: (id) => knex('sticker').where({ user_id: id }), // return a specific user
  createUser: (user) => knex('user').insert(user)
  ,
};
