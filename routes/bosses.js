var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {


  api.route('/bosses')
  .get( function (req, res) {
    var boss = [];
    boss[0] = {name: 'Dilmal', hp: 1800, maxHp: 2100, id:0,
      imgSrc : 'http://impeachmentdilmabattle.herokuapp.com/img/boss00.jpg'};
    boss[1] = {name: 'Cunhal', hp: 400, maxHp: 2100, id:1,
      imgSrc : 'http://impeachmentdilmabattle.herokuapp.com/img/boss01.jpg'};

    res.json(boss);
  });

}
