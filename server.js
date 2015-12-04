var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	forky = require('forky'),
	mongoose = require('mongoose');


app.DB_URL = process.env.DB_URL || 'mongodb://localhost/dilmais';
app.PORT = process.env.PORT || 8080;
app.ENV = process.env.NODE_ENV || 'dev';

mongoose.connect(app.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(app.ENV));
app.use(express.static(__dirname + '/www'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

var api = express.Router();
require('./routes')(api);
app.use('/api', api);

app.listen(app.PORT, function () {
	console.log('Server running in ' + app.ENV + ' at ' + app.PORT + '.');
});
