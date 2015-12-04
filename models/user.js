var mongoose = require('mongoose');
var User = mongoose.model('User',
  {
    username: { type: String, unique: true},
    password: { type: String, select: false},
    totalClicks: [
      {type: Number, default: 0}
    ],
    maxClicks: [
      {type: Number, default: 100}
    ],
    lastAttack : {type: Date, default: Date.now}
  });

module.exports = mongoose.model('User', User);
