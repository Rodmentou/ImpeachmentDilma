var mongoose = require('mongoose');
var Boss = mongoose.model('Boss',
  {
    name: { type: String, unique: true},
    hp: Number,
    maxHp: Number,
    id: { type: Number, unique: true},
    imgSrc: String,
    score: {type: Number, default: 0}
  });

module.exports = mongoose.model('Boss', Boss);
