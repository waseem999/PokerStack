const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Chips = models.Chips;
const User = models.User;



router.get('/', (req, res, next) => {
  
   return User.findAll({ 
    where: { 
      username: req.session.name
    } 
  })
    .then(user => {
    res.json(user)})
  .catch(next);
});

router.post('/', (req, res, next) => {
   Payments.create({
      paymentType: req.body.paymentType,
      accountNumber: req.body.accountNumber,
      userId: req.session.userId
   })
    .then(payment => {
      res.send().redirect('/');
    })
    .catch(next);
});

router.delete('/', function (req, res, next) {
  User.destroy({
                where: {
                    username : req.session.name
                    },
                    include: [Payments, Chips]
                  })
  .then(() => res.status(204).end())
  .catch(next);
});



module.exports = router;