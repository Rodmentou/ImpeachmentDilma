
module.exports = function (api) {
  require('./signup')(api);
  //ONLY AUTHENTICATED USERS BEYOND TFHIS POINT.
  require('./middlewares')(api);
  require('./bosses')(api);
  require('./attack')(api);
  require('./me')(api);

}
