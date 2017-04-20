var inquirer = require("inquirer");
var mysql = require("mysql");
var CONFIG = require("./config");

var connection = mysql.createConnection(CONFIG.mySQL);

connection.connect(function(err) {
  if (err) throw err;
});

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  displayProducts(res);
  console.log("==============================================");
  runPrompt(res);
  connection.end();
});

function runPrompt(arr) {
  inquirer.prompt([
    {
      
    },
    {
      name: "item_units",
      type: "input",
      message: "How many units of this product would you like to buy?"
    },
    {
      name: "confirm",
      type: "confirm",
      message: "Are you sure?",
      default: true
    }
  ]).then(function(user) {
    

  });
}



function displayProducts(arr) {
  arr.forEach(function(item) {
    console.log("==============================================");
    console.log("Product ID: " + item.item_id);
    console.log("Name: " + item.product_name);
    console.log("Price: " + item.price);
    console.log("In stock: " + item.stock_quantity + " units");
    console.log("Department: " + item.department_name);
  })
}

function promptProductID(arr) {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Type the ID of the product you would like to buy:"
    }
  ]).then(function(user) {
    if (user.item_id > arr.length) {
      console.log("That Product ID does not exist!");
      promptProductID();
    }
  });
}
