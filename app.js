// const models = require('./models');

var bodyParser = require('body-parser');
var express = require('express');
const app = express();
const path = require('path');
const index = require('./server/router/index.js');
const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./server/db/models'); 
const Payments = models.Payments;
const Chips = models.Chips;
const Users = models.User;
const Cards = models.cards;
const Log = models.log;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');

app.use(session({
  secret: 'pokersecret',
  resave: false
}));

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, './public')));

app.use('/api', index);

app.use('/*', function(req, res, next) {res.sendFile(path.resolve(__dirname, './public/index.html'))});


app.use(function (err, req, res, next){
	console.error(err);
	res.status(500).send(err.message)
});

Users.sync({})
.then(Cards.sync({})
    .then(()=> Chips.sync({}))
    .then(()=>Payments.sync({}))
    .then(()=> Log.sync({}))
    .then(sequelize_fixtures.loadFile('server/card_data.json', models))
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
  })
);



module.exports = app;
