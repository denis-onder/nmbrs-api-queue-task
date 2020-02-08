const inquirer = require("inquirer");
const validateInput = require("./utils/validateInput");
const formQuery = require("./utils/formQuery");
const { questions } = require("./config");
const producer = require("./producer");

// Gather inputs to form a query
inquirer.prompt(questions).then(answers => {
  const validated = validateInput(answers);
  const query = formQuery(validated);
  // Send query to the broker
  producer(query);
});
