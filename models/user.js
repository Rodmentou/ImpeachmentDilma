var mongoose = require('mongoose');
var User = mongoose.model('User',
  {
    username: { type: String, unique: true},
    password: { type: String, select: false},
    totalClicks: [ {type: Number, default: 0}],
    maxClicks: [{type: Number, default: 300}],
    dmgMulti: [{type: Number, default: 1}],
    autoClick: [{type: Number, default: 0}],
    lastAttack : {type: Date, default: Date.now},
    coinsUsed : [{type: Number, default: -49}],
    colorNames: [ { type: String, default: 'Preto'}],
    colorActive: [{type: String, default: 'Preto'}]
  });

module.exports = mongoose.model('User', User);
