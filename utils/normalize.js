module.exports = answers => {
  if (answers.source_app === "" || answers.source_app === " ")
    answers.source_app = "nmbrs";
  return answers;
};
