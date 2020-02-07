const inquirer = require("inquirer");
const { questions } = require("./config");

inquirer.prompt(questions).then(answers => {
  // Temp log, push object to handler
  console.log(answers);
});
