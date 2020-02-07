const inquirer = require("inquirer");
const normalize = require("./utils/normalize");
const formQuery = require("./utils/formQuery");
const { questions } = require("./config");
const producer = require("./producer");

// Gather inputs to form a query
inquirer.prompt(questions).then(answers => {
  const normalized = normalize(answers);
  const query = formQuery(normalized);
  // Send query to the broker
  producer(query);
});
