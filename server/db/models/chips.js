var Sequelize = require('sequelize');
const User = require('./user');
var db = new Sequelize('postgres://localhost:5432/poker');

module.exports = db.define('chips', {

 chiptotal: {
         type: Sequelize.INTEGER
     }

}, {
    hooks: {
        beforeValidate: function (chips) {
            let randomNumber = Math.ceil((Math.random()*3));
            if (randomNumber === 2 && !chips.chiptotal) {
                chips.chiptotal = 1000;
            }
            else if (!chips.chiptotal){
                chips.chiptotal = 500;
            }
        }
    },

    classMethods : {
        findQualifyingChipTotals: function () {
            return this.findAll({
                where: {
                    chiptotal : {$gt: 750}
                    },
                include: [User]
                })
            }
        },
    instanceMethods : {
        addChips: function (additionalchips) {
        return this.chiptotal += additionalchips
        }
    },
    
})


