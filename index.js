const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "source_app",
    message: "Source App: "
  },
  {
    type: "input",
    name: "user",
    message: "User: "
  },
  {
    type: "input",
    name: "pass",
    message: "Pass: "
  },
  {
    type: "input",
    name: "group",
    message: "Group: "
  },
  {
    type: "input",
    name: "controller",
    message: "Controller: "
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(answers);
});
