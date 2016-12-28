const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Chips = models.Chips;
const User = models.User;


router.post('/', (req, res, next) => {
let currentuser;
   User.findOne({
       where : {
           username: req.body.username
       }
   })
   .then(user => {
       currentuser = user;
        if (!user){
            var error = new Error("No Username Found");
            throw error;
        }
            else {
                return user.checkPassword(req.body.password)
            }
   })
   .then(() => {
        req.session.userId = currentuser.id;
        req.session.name = currentuser.username;
        res.json(currentuser);
    })
    .catch(next);
})



module.exports = router;