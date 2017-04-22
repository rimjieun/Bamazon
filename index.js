var inquirer = require("inquirer");
var Customer = require("./bamazonCustomer");


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
    case "Manager":
      // manager stuff
    case "Supervisor":
      //superviosr stuff
  }
});
