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
          clicks = validateClicks(user, clicks);
          user.maxClicks[bossId] = updateMaxClicks(user, clicks);
          user.totalClicks[bossId] = updateTotalClicks(user, bossId, clicks);

          User.update({username:username},
          {$set: user}, updateUser);

          Boss.findOne({id:bossId},
          function (err, boss) {
            if (!err) {
              boss.hp -= clicks;
              Boss.update({id: bossId},
              {$set: boss}, updateBoss);
            } else {
              console.log('Error on finding boss');
            }
          });

        } else {
          res.send('Opa no find!');
        }
      });
    } else {
      res.json({success: true, message: '0 votos. :/'});
    }

  });


  var updateUser = function(err, data) {
      if (!err) {
        return ({success: true});
      } else {
        return ({success: false, message: 'Opa no update!'});
      };
  };

  var updateBoss = function (err, data) {
      if (!err) {
        console.log('Boss updated.');
      } else {
        console.log('Error on updating boss');
      }
  };


  var validateClicks = function (user, clicks) {
    if (!clicks) {
      clicks = 1;
    }
    if (clicks > user.maxClicks) {
      clicks = user.maxClicks;
    }
    return clicks;
  };

  var updateMaxClicks = function (user, clicks) {
      //Calculate if the user has updated his maximum.
      return 100;
  };

  var updateTotalClicks = function(user, bossId, clicks) {
    var totalClicks = user.totalClicks[bossId] + clicks;
    return totalClicks;
  };

}
