'use strict';

const Chips = require('./chips');
const Payments = require('./payments');
const User = require('./user');
const cards = require('./cards');



User.belongsTo(Chips);
Chips.belongsTo(User);
User.hasMany(Payments);



module.exports = {
  Chips: Chips,
  User: User,
  Payments: Payments,
  cards: cards
};
