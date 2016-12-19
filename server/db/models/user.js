var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/poker');

module.exports = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
         type: Sequelize.STRING,
         allowNull: false
     }

}, {})

