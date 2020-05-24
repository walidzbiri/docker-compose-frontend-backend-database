/* eslint-disable consistent-return */
const { param, body, validationResult } = require('express-validator');
const knex = require('../../../db/connection');

const idValidator = [param('id', 'id must be a valid integer').isInt({ min: 1 })];
const userSignupValidator = [
  body('email', 'invalid email format').isEmail(),
  body('password', 'invalid password').isLength({ min: 6 }),
];

const sendErrorsToClient = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((error) => error.msg),
    });
  }
  next();
};

const emailUniqueness = (req, res, next) => knex('user').where('email', req.body.email).then((user) => {
  if (user.length === 0) {
    next();
  } else {
    return res.status(422).json({ message: 'email already in use' });
  }
});

const userSigninValidator = (req, res, next) => {
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    return knex('user').where('email', req.body.email).then((user) => {
      if (user.length !== 0) {
        [res.locals.user] = user;
        next();
      } else {
        return res.status(422).json({ message: 'No user with that email' });
      }
    });
  }
  return res.status(422).json({ message: 'You must provide email and password' });
};

module.exports = {
  idValidator,
  userSignupValidator,
  userSigninValidator,
  emailUniqueness,
  sendErrorsToClient,
};
