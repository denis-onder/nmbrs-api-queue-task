const axios = require("axios");
const xml_parser = require("xml2json");

module.exports = async (user, pass, companyID) => {
  const options = {
    url: "https://api.nmbrs.nl/soap/v2.1/EmployeeService.asmx",
    headers: {
      "Content-Type": "text/xml"
    },
    body: `<?xml version="1.0" encoding="utf-8"?>\n<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n    <soap12:Header>\n        <AuthHeader xmlns="https://api.nmbrs.nl/soap/v2.1/EmployeeService">\n            <Username>${user}</Username>\n            <Token>${pass}</Token>\n        </AuthHeader>\n    </soap12:Header>\n    <soap12:Body>\n        <List_GetByCompany xmlns="https://api.nmbrs.nl/soap/v2.1/EmployeeService">\n            <CompanyId>${companyID}</CompanyId>\n            <active>all</active>\n        </List_GetByCompany>\n    </soap12:Body>\n</soap12:Envelope>`
  };
  const res = await axios.post(options.url, options.body, {
    headers: options.headers
  });
  const json = await xml_parser.toJson(res.data);
  return JSON.parse(json)["soap:Envelope"]["soap:Body"]
    .List_GetByCompanyResponse.List_GetByCompanyResult.Employee;
};
