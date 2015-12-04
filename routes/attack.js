var	mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function (api) {


  api.route('/attack')
  .post( function( req, res) {
    var attackerName = req.decoded.username;
    var bossId = req.body.bossId;
    var clicks = req.body.clicks;

    console.log(attackerName);
    console.log(bossId);
    console.log(clicks);

    res.send('Sai, djabo');


  });


}
