/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    next();
  });
};

const antiHashPassword = (req, res, next) => {
  bcrypt.compare(req.body.password, res.locals.user.password).then((result) => {
    // result == true
    if (result === true) {
      next();
    } else {
      return res.status(422).json({ message: 'Login failed check email and password' });
    }
  });
};


module.exports = { hashPassword, antiHashPassword };
