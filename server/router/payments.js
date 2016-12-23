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

router.put('/', (req, res, next) => {
    Chips.findOne({
      where : {
        userId : req.session.userId
      }
    })
    .then(chips => {
      let addamount = chips.addChips(req.body.chipBalance);
      chips.update({chiptotal : addamount})
    })
  .catch(next);
});

router.delete('/', function (req, res, next) {

     let chipdestroy = Chips.destroy({
        where : {
          userId: req.session.userId
        }
      });

      let paymentdestroy = 
      Payments.destroy({
        where : {
          userId: req.session.userId
        }
      })

 Promise.all([
   chipdestroy, paymentdestroy
  ])
    .then((res) => {
      User.destroy({
                where: {
                    username : req.session.name
                    }
                  })
    })
  .catch(next);

});



module.exports = router;