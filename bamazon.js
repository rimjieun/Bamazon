var inquirer = require("inquirer");


var Customer = require("./bamazonCustomer");
var Manager = require("./bamazonManager");
var Supervisor = require("./bamazonSupervisor");

var connection = mysql.createConnection(CONFIG.mySQL);

connection.connect(function(err) {
  if (err) throw err;
});

inquirer.prompt([
  {
    name: "status",
    type: "list",
    message: "You are a:",
    choices: ["Customer", "Manager", "Supervisor"]
  }
]).then(function(user) {
  switch (user.status) {
    case "Customer":
      Customer.runInterface(connection);
  }
});