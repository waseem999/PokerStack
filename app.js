// const models = require('./models');

var bodyParser = require('body-parser');
var express = require('express');
const app = express();
const path = require('path');
const index = require('./server/router/index.js');
const Users = require('./server/db/models/user');
const Chips = require('./server/db/models/chips');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');

app.use(session({
  secret: 'pokersecret' 
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
    .then(()=> Chips.sync({}))
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });



module.exports = app;