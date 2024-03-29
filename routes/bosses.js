var	mongoose = require('mongoose');
var User = require('../models/user');
var Boss = require('../models/boss');

module.exports = function (api) {





  api.route('/bosses')
  .get( function (req, res) {
    Boss.find({}, function (err, bosses) {
      if (!err) {
        if (bosses.length > 0 ) {
          for (var i = 0; i < bosses.length; i++) {
            if (bosses[i].hp <= 0) { renewBosses(bosses, i);} //UPDATE BOSSES
          }
          res.json(bosses);
        } else {                                             //CREATE BOSSES
          createBosses();
          res.json({success: false,
            message: 'Opa, alguém morreu! Relogue e descubra quem!'});
        }

        } else {
          console.log('Error on finding bosses');
          res.json({success: false, message: 'Deu ruim, fí'});
        }
    });
  })


  .post( function (req, res) {



  });

  var renewBosses = function(bosses, deadId) {
    console.log(bosses.length);
    for (var i = 0; i < bosses.length; i++ ) {
      var boss = bosses[i];
      var bossName = boss.name;
      boss.hp = boss.maxHp;
      if (boss.id != deadId) { boss.score ++; }
      Boss.update({name:bossName},
      {$set: boss}, function (err, data) {
        if (!err) {
          console.log('Boss ' + boss.name + ' updated with score ' + boss.score);
        } else {
          console.log('Boss ' + boss.name + ' not updated. Error.');
        };
      });

    }


  };

  var createBosses = function() {

    var newBoss = new Boss(
      {
        name: 'Dilmal',
        hp: 210000,
        maxHp: 210000,
        id:0,
        imgSrc : 'https://impeachmentdilmabattle.herokuapp.com/img/boss00.jpg'
      }
    );

    newBoss.save( function (err, doc) {
      console.log(doc);
      console.log(err);
    });

    var newBoss = new Boss(
      {
        name: 'Cunhal',
        hp: 210000,
        maxHp: 210000,
        id:1,
        imgSrc : 'https://impeachmentdilmabattle.herokuapp.com/img/boss01.jpg'
      }
    );

    newBoss.save( function (err, doc) {
      console.log(doc);
      console.log(err);
    });

  }

}
