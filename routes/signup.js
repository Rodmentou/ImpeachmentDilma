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
            console.log('Entered on save');
            var newUser = new User(user);
            newUser.save ( function (err, doc) {
              if (!err) {
                console.log('User saved');
                res.json(doc);
              } else {
                console.log('Error on save');
                res.json({success: false, message: 'Dados incorretos'});
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
