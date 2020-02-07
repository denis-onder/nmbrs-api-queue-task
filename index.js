const inquirer = require("inquirer");
const normalize = require("./utils/normalize");
const formQuery = require("./utils/formQuery");
const { questions } = require("./config");

// Gather inputs to form a query for the message broker
inquirer.prompt(questions).then(answers => {
  const normalized = normalize(answers);
  console.log(formQuery(normalized));
});
