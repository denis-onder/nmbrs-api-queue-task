const days_off = require("./api/days_off");

module.exports = (query, id) => {
  switch (query.controller) {
    case "importDaysoff":
      console.log(`Handling request ${id}...`);
      days_off(query);
      break;
    default:
      console.log("This controller method currently is not supported.");
      break;
  }
};
