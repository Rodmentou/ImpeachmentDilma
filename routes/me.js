var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {

  api.route('/me')
  .get ( function (req, res) {
    var username = req.decoded.username;

    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        res.json(data);
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });

  });

  api.post('/me/buyColor', function (req, res) {
    var username = req.decoded.username;
    var colorName = req.body.color;
    var bossId = req.body.bossId;

    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if ( (data.coinsUsed < Math.round(data.totalClicks[0]/500)) ||
             (data.coinsUsed < Math.round(data.totalClicks[1]/500))){
               data.colorNames.push(colorName);
               User.update({username: username},
               {$set: data}, function(err, user) {
                 if (!err) {
                   res.json(user);
                 }else {
                   res.json({success: false, message: 'Deu ruim'});
                 }
               });
             }
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });
  });

}
