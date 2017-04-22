var inquirer = require("inquirer");
var mysql = require("mysql");
var Config = require("./config");
require("console.table");

var connection = mysql.createConnection(Config.BAMAZON);

connection.connect(function(err) {
  if (err) throw err;
});

function viewTotalSalesByDept(arr) {
  var deptArr = [];
  arr.forEach(function(d) {
    var dept = {
      ID: d.department_id,
      Name: d.department_name,
      "Overhead Costs": d.overhead_costs.toFixed(2),
      "Total Sales": d.total_sales.toFixed(2),
      "Total Profit": (d.total_sales - d.overhead_costs).toFixed(2)
      };
    deptArr.push(dept);
  });
  console.table(deptArr);
  process.exit();
}

function createNewDept() {
  inquirer.prompt([
  {
    name: "dept_name",
    type: "input",
    message: "What department would you like to add? (e.g. Baby & Toddler)"
  },
  {
    name: "dept_overhead_costs",
    type: "input",
    message: "What is the overhead cost of this department? (e.g. 500)"
  }
    ]).then(function(user) {
      connection.query(
        "INSERT INTO departments SET ?",
        [
          {
            department_name: user.dept_name,
            overhead_costs: user.dept_overhead_costs
          }
        ], function(err, res) {
          if (err) throw err;
          console.log("Your department has been added successfully.");
          process.exit();
        })
    });
}

exports.runApplication = function() {
  inquirer.prompt([
  {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Total Sales by Department", "Create New Department"]
  }
    ]).then(function(user) {
      switch (user.action) {
        case "View Total Sales by Department":
          connection.query(
            "SELECT * FROM departments",
            function(err, res) {
              viewTotalSalesByDept(res);
            })
          break;
        case "Create New Department":
          createNewDept();
          break;
      }
    });
};