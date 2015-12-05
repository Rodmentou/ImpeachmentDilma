var mongoose = require('mongoose');
var Boss = mongoose.model('Boss',
  {
    name: { type: String, unique: true},
    hp: Number,
    maxHp: Number,
    id: Number,
    imgSrc: String
  });

module.exports = mongoose.model('Boss', Boss);
