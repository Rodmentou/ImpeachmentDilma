var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {

  api.get('/ranking/top10/:bossId', function (req, res) {
    var bossId = req.params.bossId;
    var obj = {};
    var totalClicksId = 'totalClicks.' + req.params.bossId;
    var obj = {};
    obj[totalClicksId] = '-1';

    User.find({}).sort(obj).limit(50).exec(
      function (err, data) {
        res.json(data);
      });
  });

  api.get('/ranking/me', function (req, res) {

  });

}
