const isEmpty = require("./isEmpty");

module.exports = answers => {
  if (isEmpty(answers.source_app)) answers.source_app = "nmbrs";
  if (isEmpty(answers.group)) answers.group = 1234;
  if (isEmpty(answers.controller)) answers.controller = "importDaysoff";
  return answers;
};
