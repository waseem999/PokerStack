const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Payments = models.Payments;
const bodyParser = require('body-parser');
const Cards = models.cards;


router.get('/', (req, res, next) => {
    Cards.getRandomCards()
    .then(cards => res.json(cards))
  .catch(next);
});



module.exports = router;