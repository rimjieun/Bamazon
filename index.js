var inquirer = require("inquirer");
var Customer = require("./bamazonCustomer");
var Manager = require("./bamazonManager");


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
      Customer.runApplication();
      break;
    case "Manager":
      Manager.runApplication();
      break;
    case "Supervisor":
      //superviosr stuff
  }
});
