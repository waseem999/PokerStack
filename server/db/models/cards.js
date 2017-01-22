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

     },

     image: {
         type: Sequelize.STRING
     }

}, {
    classMethods : {
        getRandomCards: function () {
        let cardsarr = [];
        let numberarray = [];
        let i = 0;
        while (i < 9){
        let randomNumber = Math.ceil((Math.random()*52));
                if (numberarray.indexOf(randomNumber) === -1){
                    numberarray.push(randomNumber);
                    let newcard = this.findOne({
                        where: {
                            id : randomNumber
                            }
                        });
                    cardsarr.push(newcard);
                    i++;
                }
            }
            return Promise.all(cardsarr);
        
        }
    }
})
