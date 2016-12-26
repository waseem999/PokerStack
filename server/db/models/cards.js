var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/poker');

module.exports = db.define('cards', {
    value: {
        type: Sequelize.INTEGER
       
    },

    face: {
        type: Sequelize.STRING
    },

    suit: {
         type: Sequelize.STRING

     }

}, {})
