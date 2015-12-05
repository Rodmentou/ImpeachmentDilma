var	mongoose = require('mongoose');
var User = require('../models/user');
var Boss = require('../models/boss');

module.exports = function (api) {





  api.route('/bosses')
  .get( function (req, res) {
    Boss.find({}, function (err, bosses) {
      if (!err) {
        console.log(bosses);
        res.json(bosses);
        } else {
          console.log('Error on finding bosses');
          res.json({success: false, message: 'Deu ruim, fí'});
        }
    });
  })


  .post( function (req, res) {



  });

}
