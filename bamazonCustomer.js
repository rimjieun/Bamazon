var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pompano00",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

connection.query("SELECT * FROM Bamazon", function(err, res) {
  if (err) throw err;
  console.log(res);
});

inquirer.prompt([
  {
    name: "item_id",
    type: "input",
    message: "Type the ID of the product you would like to buy:"
  },
  {
    name: "item_units",
    type: "input",
    message: "How many units of this product would you like to buy?"
  }
]).then(function(user) {

});