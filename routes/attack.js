var	mongoose = require('mongoose');
var User = require('../models/user');
var Boss = require('../models/boss');

module.exports = function (api) {


  api.route('/attack')
  .post( function( req, res) {
    console.log('-------------------------------------------------NEW REQUEST');
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
          console.log(user);


          console.log('Indo pro update');
          User.update({username:username},
          {$set: user}, function (err, data) {
            if (!err) {
              return ({success: true});
            } else {
              return ({success: false, message: 'Opa no update!'});
            };
          });

        } else {
          res.send('Opa no find!');
        }
      });
    } else {
      res.json({success: true, message: '0 votos. :/'});
    }

  });


  var updateUser = function(username, user) {

  }


  var validateClicks = function (user, clicks) {
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
