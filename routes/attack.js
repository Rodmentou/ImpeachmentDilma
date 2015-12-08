var	mongoose = require('mongoose');
var User = require('../models/user');
var Boss = require('../models/boss');

module.exports = function (api) {


  api.route('/attack')
  .post( function( req, res) {
    console.log('-------------------------------------------------NEW ATTACK');
    var username = req.decoded.username;
    var bossId = req.body.bossId;
    var clicks = req.body.clicks;

    if (clicks > 0) {
      User.findOne({username: username},
      function (err, user) {
        if (!err) {
          var now = Date.now();
          if ( (now - user.lastAttack) > 50) {
            console.log(user);
            clicks = validateClicks(user, clicks, bossId);
            //user.maxClicks[bossId] = updateMaxClicks(user, clicks);
            user.totalClicks[bossId] = updateTotalClicks(user, bossId, clicks);
            user.lastAttack = now;
            console.log(clicks);
            User.update({username:username},
            {$set: user}, updateUser);

            Boss.findOne({id:bossId},
            function (err, boss) {
              if (!err) {
                boss.hp -= clicks;
                Boss.update({id: bossId},
                {$set: boss}, updateBoss);
              } else {
                res.json({success: false, message: 'Error on finding boss'});
              }
            }).then( function (data) {
              return data;
            });


          } else {
            res.json({success: false, message: 'Não pode atacar tão rápido!!!'});
          }

        } else {
          res.send('Opa no find!');
        }
      }).then( function (data) {
        res.json({success: true, message: 'Attack bonito.'});
      });
    } else {
      res.json({success: true, message: '0 votos. :/'});
    }

  });


  var updateUser = function(err, data) {
      if (!err) {
        return ({success: true, user: data});
      } else {
        return ({success: false, message: 'Opa no update!'});
      };
  };

  var updateBoss = function (err, data) {
      if (!err) {
        //console.log('Boss updated.');
      } else {
        console.log('Error on updating boss');
      }
  };


  var validateClicks = function (user, clicks, bossId) {
    if (!clicks) {
      clicks = 1;
    }
    clicks *= user.dmgMulti[bossId];
    if (clicks > user.maxClicks[bossId]) {
      clicks = user.maxClicks[bossId];
    }
    return clicks;
  };

  var updateMaxClicks = function (user, clicks) {
      //Calculate if the user has updated his maximum.
      //return 100;
  };

  var updateTotalClicks = function(user, bossId, clicks) {
    var totalClicks = user.totalClicks[bossId] + clicks;
    return totalClicks;
  };

}
