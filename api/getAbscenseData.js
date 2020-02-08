const axios = require("axios");
const xml_parser = require("xml2json");

module.exports = async (user, pass, employeeID) => {
  const options = {
    url: "https://api.nmbrs.nl/soap/v2.1/EmployeeService.asmx",
    headers: {
      "Content-Type": "text/xml"
    },
    body: `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <soap:Header>\n        <AuthHeader xmlns=\"https://api.nmbrs.nl/soap/v2.1/EmployeeService\">\n            <Username>${user}</Username>\n            <Token>${pass}</Token>\n        </AuthHeader>\n    </soap:Header>\n    <soap:Body>\n        <Absence_GetList xmlns=\"https://api.nmbrs.nl/soap/v2.1/EmployeeService\">\n            <EmployeeId>${employeeID}</EmployeeId>\n        </Absence_GetList>\n    </soap:Body>\n</soap:Envelope>`
  };
  const res = await axios.post(options.url, options.body, {
    headers: options.headers
  });
  const json = await xml_parser.toJson(res.data);
  return JSON.parse(json)["soap:Envelope"]["soap:Body"].Absence_GetListResponse
    .Absence_GetListResult.Absence;
};
