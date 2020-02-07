require("dotenv").config();

module.exports = {
  username: process.env.USERNAME,
  pass: process.env.API_KEY,
  queue: process.env.QUEUE,
  questions: [
    {
      type: "input",
      name: "source_app",
      message: "Source App: (default = nmbrs) "
    },
    {
      type: "input",
      name: "group",
      message: "Group: (default = 1234) "
    },
    {
      type: "input",
      name: "controller",
      message: "Controller: (default = importDaysoff) "
    }
  ]
};
