
module.exports = function (api) {
  require('./signup')(api);
  require('./bosses')(api);
  //ONLY AUTHENTICATED USERS BEYOND TFHIS POINT.
  require('./middlewares')(api);
  require('./attack')(api);
  require('./me')(api);

}
