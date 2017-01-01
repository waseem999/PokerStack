'use strict';

const Chips = require('./chips');
const Payments = require('./payments');
const User = require('./user');
const cards = require('./cards');
const log = require('./log');



User.hasOne(Chips);
Chips.belongsTo(User);
User.hasMany(Payments);
User.belongsToMany(cards, {through: log});
cards.belongsToMany(User, {through: log});



module.exports = {
  Chips: Chips,
  User: User,
  Payments: Payments,
  cards: cards,
  log: log
};
