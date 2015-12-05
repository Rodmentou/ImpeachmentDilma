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


}
