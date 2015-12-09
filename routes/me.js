var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {

  api.route('/me').get ( function (req, res) {

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

  api.post('/me/addAuto', function (req, res) {
    var username = req.decoded.username;
    var bossId = req.body.bossId;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if (data.coinsUsed[bossId] + 10 <= Math.round(data.totalClicks[0]/500)){
           data.coinsUsed[bossId] += 10;
           data.autoClick[bossId] += 1;
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

  api.post('/me/addMulti', function (req, res) {
    var username = req.decoded.username;
    var bossId = req.body.bossId;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if (data.coinsUsed[bossId] + 50 <= Math.round(data.totalClicks[0]/500)){
           data.coinsUsed[bossId] += 50;
           data.dmgMulti[bossId] += 1;
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
        if (data.coinsUsed[bossId] + 50 <= Math.round(data.totalClicks[0]/500)){
           data.coinsUsed[bossId] ++;
           data.maxClicks[bossId] += 100;
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
    bossId = 0;
    User.findOne({username: username},
    function (err, data) {
      if (!err) {
        if (data.coinsUsed[bossId] + 1 <= Math.round(data.totalClicks[0]/500)){
          console.log(data.colorNames.indexOf(colorName) == -1);
               if (data.colorNames.indexOf(colorName) == -1 ) {
                 data.colorNames.push(colorName);
                 data.coinsUsed[bossId] ++;
                 User.update({username: username},
                 {$set: data}, function(err, user) {
                   if (!err) {
                     res.json({success: true, message: 'Cor comprada.'});
                   }else {
                     res.json({success: false, message: 'Deu ruim'});
                   }
                 });
               } else {
                 res.json({success: false, message: 'Você já tem essa cor'});
               }
             } else {
               res.json({success: false, message: 'Sem dinheiro!'});
             }
      } else {
        res.json({success:false, message:'Algo deu errado'});
      }
    });
  });

}
