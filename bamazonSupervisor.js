var inquirer = require("inquirer");
var mysql = require("mysql");
var Config = require("./config");

var connection = mysql.createConnection(Config.BAMAZON);

connection.connect(function(err) {
  if (err) throw err;
});