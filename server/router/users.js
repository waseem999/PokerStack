const express = require('express');
const router = express.Router();
const models = require('../db/models');
const User = models.User;
const bodyParser = require('body-parser');
const Chips = models.Chips;



router.post('/', (req, res, next) => {
   User.create(req.body)
    .then(user => {
      req.session.userId = user.id;
      req.session.username = user.username;
      Chips.create({
        userId: user.id
      })
      res.send().redirect('/');
    })
    .catch(next);
})


module.exports = router;