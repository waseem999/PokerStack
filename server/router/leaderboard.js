const express = require('express');
const router = express.Router();
const models = require('../db/models');
const User = models.User;
const bodyParser = require('body-parser');
const Chips = models.Chips;



router.get('/', (req, res, next) => {
    return Chips.findQualifyingChipTotals()
    .then(user => res.json(user))
  .catch(next);
});



module.exports = router;