const express = require('express');

const router = express.Router();
const queries = require('../../db/queries');
const {
  emailUniqueness,
  userSigninValidator,
  userSignupValidator,
  sendErrorsToClient,
} = require('../routes/validation/user');
const { hashPassword, antiHashPassword } = require('../utils/index');


// all routes are prepended with /auth

router.post('/signup', userSignupValidator, sendErrorsToClient, emailUniqueness, hashPassword, (req, res) => {
  queries.createUser(req.body).then((user) => {
    res.cookie('user_id', user[0], {
      httpOnly: true
    });
    res.json({ id: user[0], message: "You've successfully registred" })
  });
});

router.post('/signin', userSigninValidator, antiHashPassword, (req, res) => {
  res.cookie('user_id', res.locals.user.id, {
    httpOnly: true
  });
  res.json({ id: res.locals.user.id, message: "You've successfully loggedin" });
});

router.get('/logout',(req,res,next)=>{
  res.clearCookie("user_id");
  res.json({ message: "You've successfully loggedout" });
})


module.exports = router;
