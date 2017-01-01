const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Cards = models.cards;
const Log = models.log;


router.get('/', (req, res, next) => {
    let newcard;
    Cards.getRandomCards()
    .then(cards => {
    newcard = cards;

     
        Log.create({
            cardId: cards[0].id,
            userId : req.session.userId,
            communitycards: [cards[4].id, cards[5].id, cards[6].id]
        })
    })
    .then(() => 
    res.json(newcard))
  .catch(next);
});



module.exports = router;