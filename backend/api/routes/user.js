const express = require('express');
const queries = require('../../db/queries');

const {
  idValidator,
  sendErrorsToClient,
} = require('./validation/user');
const { isAuthorized } = require('../middlewares/auth');

const router = express.Router();


router.get('/:id',isAuthorized, idValidator, sendErrorsToClient, (req, res, next) => {
  // console.log(req.cookies);
  queries.getUser(req.params.id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      next();// go to the error middleware
    }
  });
});

router.get('/:id/stickers',isAuthorized, idValidator, sendErrorsToClient, (req, res, next) => {
  queries.getUser(req.params.id).then((user) => {
    if (user) {
      queries.getUserStickers(req.params.id).then((stickers) => {
        if (stickers) {
          res.json(stickers);
        } else {
          next();
        }
      });
    } else {
      next();// go to the error middleware
    }
  });
});


module.exports = router;
