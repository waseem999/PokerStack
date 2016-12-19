const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Chips = models.Chips;
const User = models.User;



router.get('/', (req, res, next) => {
   Chips.findOne({ 
    where: { 
      userId: req.sessions.userId
    } 
  })
    .then(chips => res.json(chips))
  .catch(next);
});

router.post('/', (req, res, next) => {
   Payments.create(req.body)
    .then(payment => {
      res.send().redirect('/');
    })
    .catch(next);
})


module.exports = router;