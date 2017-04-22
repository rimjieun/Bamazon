var inquirer = require("inquirer");
var mysql = require("mysql");
var Config = require("./config");
require("console.table");

var connection = mysql.createConnection(Config.BAMAZON);

connection.connect(function(err) {
  if (err) throw err;
});

function viewProductsForSale(arr) {
  var itemsArr = [];
  arr.forEach(function(i) {
    var item = {
      ID: i.item_id,
      Name: i.product_name,
      Price: i.price.toFixed(2),
      "In stock": i.stock_quantity + " unit(s)"
    };
    itemsArr.push(item);
  });
  console.table(itemsArr);
  process.exit();
}

function viewLowInventory(arr) {
  if (arr.length == 0) {
    console.log("No items are low on inventory.");
    process.exit();
  }
  var itemsArr = [];
  arr.forEach(function(i) {
    var item = {
      ID: i.item_id,
      Name: i.product_name,
      Price: i.price.toFixed(2),
      "In stock": i.stock_quantity + " unit(s)"
    };
    itemsArr.push(item);
  });
  console.table(itemsArr);
  process.exit();
}

function addToInventory(arr) {

  inquirer.prompt([
  {
    name: "item_id",
    type: "input",
    message: "Type the ID of the item you want to add to:"
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
        message: "How many units of " + itemName + " would you like to add?"
      }
        ]).then(function(user) {
          var newQuantity = itemQuantity + Number(user.item_units);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{stock_quantity: newQuantity}, {item_id: itemID}],
            function(err, res) {
              if (err) throw err;
              console.log("Your addition has been successfully processed.");
              process.exit();
            });
        });
    });

}

function addNewProduct(arr) {

  inquirer.prompt([
  {
    name: "item_name",
    type: "input",
    message: "What item would you like to add? (e.g. Banana)"
  },
  {
    name: "item_department",
    type: "list",
    message: "What department does this item belong in?",
    choices: arr
  },
  {
    name: "item_price",
    type: "input",
    message: "What is the unit price of this item? (e.g. 0.85)"
  }
    ]).then(function(user) {
      connection.query(
        "INSERT INTO products SET ?",
        [
          {
            product_name: user.item_name,
            department_name: user.item_department,
            price: user.item_price
          }
        ], function(err, res) {
          if (err) throw err;
          console.log("The new item has been added successfully.");
          process.exit();
        });
    });
}

exports.runApplication = function() {
  inquirer.prompt([
  {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }
    ]).then(function(user) {
      switch (user.action) {
        case "View Products for Sale":
          connection.query(
            "SELECT * FROM products",
            function(err, res) {
              if (err) throw err;
              viewProductsForSale(res);
            });
          break;
        case "View Low Inventory":
          connection.query(
            "SELECT * FROM products WHERE stock_quantity <= 5",
            function(err, res) {
              if (err) throw err;
              viewLowInventory(res);
            });
          break;
        case "Add to Inventory":
          connection.query(
            "SELECT * FROM products",
            function(err, res) {
              if (err) throw err;
              addToInventory(res);
            });
          break;
        case "Add New Product":
          connection.query(
            "SELECT department_name FROM departments",
            function(err, res) {
              if (err) throw err;
              var dept = res.map(function(item) {
                return item.department_name;
              })
              addNewProduct(dept);
            });
          break;
      }
    });
};