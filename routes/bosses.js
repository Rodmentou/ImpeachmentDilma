var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {


  api.route('/bosses')
  .get( function (req, res) {
    var boss = [];
    boss[0] = {name: 'Dilmal', totalHp: 1800, accumulated: 0, id:0};
    boss[1] = {name: 'Cunhal', totalHp: 1800, accumulated: 0, id:1};

    res.json(boss);
  });

}
