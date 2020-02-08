const axios = require("axios");
const xml_parser = require("xml2json");
const fs = require("fs");

module.exports = async (user, pass) => {
  const options = {
    url: "https://api.nmbrs.nl/soap/v2.1/CompanyService.asmx",
    headers: {
      "Content-Type": "text/xml"
    },
    body: `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n    <soap12:Header>\n        <AuthHeader xmlns=\"https://api.nmbrs.nl/soap/v2.1/CompanyService\">\n            <Username>${user}</Username>\n            <Token>${pass}</Token>\n        </AuthHeader>\n    </soap12:Header>\n    <soap12:Body>\n        <List_GetAll xmlns=\"https://api.nmbrs.nl/soap/v2.1/CompanyService\" />\n    </soap12:Body>\n</soap12:Envelope>`
  };
  const res = await axios.post(options.url, options.body, {
    headers: options.headers
  });
  const json = await xml_parser.toJson(res.data);
  return JSON.parse(json)["soap:Envelope"]["soap:Body"].List_GetAllResponse
    .List_GetAllResult.Company.ID;
};
