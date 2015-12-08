var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {

  api.route('/me')
  .get ( function (req, res) {

    var username = req.decoded.username;

    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        console.log(data);
        res.json(data);
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });

  });

  api.post('/me/addMulti', function (req, res) {
    var username = req.decoded.username;
    var bossId = req.body.bossId;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if ( (data.coinsUsed + 50 <= Math.round(data.totalClicks[0]/500)) ||
             (data.coinsUsed + 50 <= Math.round(data.totalClicks[1]/500))){
           data.dmgMulti[bossId] += 1;
           console.log(data);
           data.coinsUsed += 50;
           User.update({username: username},
           {$set: data}, function(err, user) {
             if (!err) {
               console.log(user);
               res.json({success: true, message: 'Multi atualizada'});
             }else {
               res.json({success: false, message: 'Deu ruim'});
             }
           });
         } else {
           res.json({success: false, message: 'Tadê diñero?'});
         }
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });
  });

  api.post('/me/addMax', function (req, res) {
    var username = req.decoded.username;
    var bossId = req.body.bossId;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if ( (data.coinsUsed < Math.round(data.totalClicks[0]/500)) ||
             (data.coinsUsed < Math.round(data.totalClicks[1]/500))){
           data.maxClicks[bossId] += 100;
           data.coinsUsed ++;
           User.update({username: username},
           {$set: data}, function(err, user) {
             if (!err) {
               console.log(user);
               res.json({success: true, message: 'Máx atualizada'});
             }else {
               res.json({success: false, message: 'Deu ruim'});
             }
           });
         } else {
           res.json({success: false, message: 'Tadê diñero?'});
         }
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });
  });

  api.post('/me/activateColor', function (req, res) {
    var username = req.decoded.username;
    var colorName = req.body.color;
    var bossId = req.body.bossId;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
         data.colorActive[0] = colorName;
         data.colorActive[1] = colorName;
         User.update({username: username},
         {$set: data}, function(err, user) {
           if (!err) {
             res.json({success: true, message: 'Cor atualizada'});
           }else {
             res.json({success: false, message: 'Deu ruim'});
           }
         });
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
               if (data.colorNames.indexOf(colorName) == -1 ) {
                 data.colorNames.push(colorName);
                 data.coinsUsed ++;
                 User.update({username: username},
                 {$set: data}, function(err, user) {
                   if (!err) {
                     res.json(user);
                   }else {
                     res.json({success: false, message: 'Deu ruim'});
                   }
                 });
               } else {
                 res.json({success: false, message: 'Você já tem essa cor'});
               }
             }
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });
  });

}
