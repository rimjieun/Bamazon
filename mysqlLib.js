var mysql = require("mysql");
var Config = require("./config");
var pool = mysql.createPool(Config.mysql);

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};