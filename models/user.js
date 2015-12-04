var mongoose = require('mongoose');
var User = mongoose.model('User',
  {
    username: { type: String, unique: true},
    password: { type: String, select: false},
    numClicks: Number
  });

module.exports = mongoose.model('User', User);
