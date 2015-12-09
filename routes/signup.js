var	mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var jwtSecret = 'luanaLinda';

module.exports = function (api) {

  api.post('/signup', function (req, res) {

    var username = req.body.username;
		var password = req.body.password;


    if (username && password) {
      var user = {username: username, password: password};
      User.find(user, function (err, data) {
        if (!err) {
          if (data.length > 0) {
            var userFound = data[0];
            var token = createNewToken(userFound.username, jwtSecret);
            res.json({user: userFound, token: token});
          } else {
            user.totalClicks = [];
            user.maxClicks = [];
            user.coinsUsed = [];
            user.autoClick = [];
            user.autoClick[0] = 0;
            user.autoClick[1] = 0;
            user.totalClicks[0] = 0;
            user.maxClicks[0] = 300;
            user.totalClicks[1] = 0;
            user.maxClicks[1] = 300;
            user.coinsUsed[0] = -49;
            user.coinsUsed[1] = -49;
            user.dmgMulti = [];
            user.dmgMulti[0] = 1;
            user.dmgMulti[1] = 1;
            user.colorNames = [];
            user.colorNames[0] = 'Preto';
            user.colorActive = [];
            user.colorActive[0] = 'Preto';
            user.colorActive[1] = 'Preto';

            user.lastAttack = Date.now();
            var newUser = new User(user);
            newUser.save ( function (err, doc) {
              if (!err) {
                res.json(doc);
              } else {
                res.json({success: false, message: 'Digite novamente. ;)'});
              }
            });
          }
        } else {
          console.log('Error on find');
        }

      });
    } else {
      res.json({success: false, message:'Opa, faltou algo aí'});
    }


  });

  var createNewToken = function(username, jwtSecret) {
		return jwt.sign({
			username: username
		}, jwtSecret, {
			expiresIn: 360000
		});
	}

}
