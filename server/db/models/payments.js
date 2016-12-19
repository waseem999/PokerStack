var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/poker');

module.exports = db.define('Payments', {
    paymentType: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    accountNumber: {
         type: Sequelize.INTEGER,
         allowNull: false,
     }
})

