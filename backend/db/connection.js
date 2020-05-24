const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile');

const environmentConfig = config[environment];


// actual connection
const connection = knex(environmentConfig);

module.exports = connection;
