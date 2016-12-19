const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Chips = models.Chips;
const User = models.User;


router.post('/', (req, res, next) => {
   User.findOne({
       where : {
           username: req.body.username,
           password: req.body.password
       }
   })
   .then(user => {
       if (!user){
           var error = new Error("No Username Found");
           throw error;
       }
    req.session.userId = user.id;
    req.session.name = user.username;
    res.json(user);
   })
    .catch(next);
})



module.exports = router;