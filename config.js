require("dotenv").config();

module.exports = {
  username: process.env.USERNAME,
  pass: process.env.API_KEY,
  questions: [
    {
      type: "input",
      name: "source_app",
      message: "Source App: (default = nmbrs) "
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
  ]
};
