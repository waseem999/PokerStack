var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/poker');

module.exports = db.define('log', {
    communitycards: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
})
