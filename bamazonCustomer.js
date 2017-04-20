var inquirer = require("inquirer");

exports.runInterface = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    displayProducts(res);
    console.log("==============================================");
    runPrompt(res);

  });
}


function displayProducts(arr) {
  arr.forEach(function(item) {
    console.log("==============================================");
    console.log("Item ID: " + item.item_id);
    console.log("Name: " + item.product_name);
    console.log("Price: $" + item.price.toFixed(2));
    console.log("In stock: " + item.stock_quantity + " units");
    console.log("Department: " + item.department_name);
  });
}

function runPrompt(arr) {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Type the ID of the product you would like to buy:"
    }
  ]).then(function(user) {
    if (user.item_id > arr.length) {
      console.log("That Item ID does not exist!");
    }
    else {
      var item = arr[user.item_id - 1];
      var itemName = item.product_name;
      inquirer.prompt([
        {
          name: "item_units",
          type: "input",
          message: "How many units of " + itemName + " would you like to buy?"
        }
      ]).then(function(user) {
        if (user.item_units > item.stock_quantity) {
          console.log("Insufficient quantity!");
        }
        else {
          var orderedUnits = user.item_units;
          inquirer.prompt([
            {
              name: "confirm",
              type: "confirm",
              message: "Are you sure you want to order " + orderedUnits + " units of " + itemName + "?",
              default: true
            }
          ]).then(function(user) {
            if (user.confirm) {
              updateStock(item, orderedUnits);
              // resetStock(item, 50);
            }
            else {
              console.log("We're sorry you couldn't find what you needed. We hope you visit us again.");
              connection.end();
            }
          });
        }
      });
    }
  });
}

function updateStock(obj, num) {
  var itemID = obj.item_id;
  var totalCost = obj.price * num;
  var updatedUnits = obj.stock_quantity - num;
  connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedUnits}, {item_id: itemID}], function(err, res) {
    if (err) throw err;
    console.log("Thank you for your purchase. Your total was $" + totalCost.toFixed(2) + ".");
    connection.end();
  });
}

// function resetStock(obj, num) {
//   var itemID = obj.item_id;
//   connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: num}, {item_id: itemID}], function(err, res) {
//     if (err) throw err;
//     connection.end();
//   });
// }