var	mongoose = require('mongoose');
var Boss = require('../models/boss');

module.exports = function() {
  var newBoss = new Boss(
    {
      name: 'Dilmal',
      hp: 1800,
      maxHp: 2100,
      id:0,
      imgSrc : 'http://impeachmentdilmabattle.herokuapp.com/img/boss00.jpg'
    }
  );

  newBoss.save( function (err, doc) {
    console.log(doc);
    console.log(err);
  });

  var newBoss = new Boss(
    {
      name: 'Cunhal',
      hp: 400,
      maxHp: 2100,
      id:1,
      imgSrc : 'http://impeachmentdilmabattle.herokuapp.com/img/boss01.jpg'
    }
  );

  newBoss.save( function (err, doc) {
    console.log(doc);
    console.log(err);
  });

}
