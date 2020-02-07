module.exports = {
  username: process.env.USERNAME,
  pass: process.env.API_KEY,
  questions: [
    {
      type: "input",
      name: "user",
      message: "User: "
    },
    {
      type: "input",
      name: "pass",
      message: "Pass: "
    }
  ]
};
