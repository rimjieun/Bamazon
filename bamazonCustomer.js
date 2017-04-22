var inquirer = require("inquirer");
var mysql = require("mysql");
var Config = require("./config");
require("console.table");

var connection = mysql.createConnection(Config.BAMAZON);

connection.connect(function(err) {
  if (err) throw err;
});

function displayProducts(arr) {
  var itemsArr = [];
  arr.forEach(function(i) {
    var item = {
      ID: i.item_id,
      Name: i.product_name,
      Price: i.price.toFixed(2)
    };

    itemsArr.push(item);
  });
  console.table(itemsArr);
}

function runItemOrder(arr) {
  inquirer.prompt([
  {
    name: "item_id",
    type: "input",
    message: "Type the ID of the product you would like to buy:"
  }
    ]).then(function(user) {

      if (user.item_id > arr.length) {
        console.log("That Item ID does not exist!");
        process.exit();
      }

      var item = arr[user.item_id - 1];
      var itemID = item.item_id;
      var itemName = item.product_name;
      var itemQuantity = item.stock_quantity;

      inquirer.prompt([
      {
        name: "item_units",
        type: "input",
        message: "How many units of " + itemName + " would you like to buy?"
      }
        ]).then(function(user) {
          var orderedUnits = user.item_units;
          if (orderedUnits > item.stock_quantity) {
            console.log("Insufficient quantity!");
            process.exit();
          }
          inquirer.prompt([
          {
            name: "confirm",
            type: "confirm",
            message: "Are you sure you want to order " + orderedUnits + " units of " + itemName + "?",
            default: true
          }
            ]).then(function(user) {
              if (!user.confirm) {
                console.log("We're sorry you couldn't find what you needed. We hope you visit us again.");
                process.exit();
              }

              var totalCost = item.price * orderedUnits;
              var newQuantity = itemQuantity - orderedUnits;

              connection.query(
                "UPDATE products SET ? WHERE ?",
                [{stock_quantity: newQuantity}, {item_id: itemID}],
                function(err, res) {
                  if (err) throw err;
                  console.log("Thank you for your purchase. Your total was $" + totalCost.toFixed(2) + ".");
                  process.exit();
                });
            });
        });
    });
}

exports.runApplication = function(){
  connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;
      displayProducts(res);
      console.log("==============================================");
      runItemOrder(res);
    });
};