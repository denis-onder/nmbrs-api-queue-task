const axios = require("axios");
const xml_parser = require("xml2json");
const path = require("path");
const fs = require("fs");

const output_path = path.join(__dirname, "../output");

const getCompanyID = async (user, pass) => {
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

const getAllActiveEmployees = async (user, pass, companyID) => {
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

const getAbscenseData = async (user, pass, employeeID) => {
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

const calcTimeDifference = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const difference = endTime.getTime() - startTime.getTime();
  return Math.round(difference / 60000);
};

const formOutput = (group_id, source_app, employee_id, absences) => {
  let calendar = [];
  if (Array.isArray(absences)) {
    calendar = absences.map(absence => {
      if (absence.Percentate !== 100) {
        return {
          date: absence.RegistrationStartDate,
          data: {
            duration_minutes: calcTimeDifference(
              absence.RegistrationStartDate,
              absence.RegistrationEndDate
            ),
            day_off_name: absence.Dossier,
            internal_code: absence.AbsenceId
          }
        };
      }
    });
  }
  const payload = JSON.stringify(
    {
      group_id,
      source_app,
      source_app_internal_id: employee_id,
      calendar
    },
    null,
    2
  );
  writeOutput(payload);
};

const writeOutput = json => {
  const filename = `file-${Date.now()}.json`;
  fs.writeFile(filename, json, "utf-8", err => {
    if (err) throw err;
    console.log("Writing output...");
  });
};

module.exports = async ({ user, pass, group, source_app }) => {
  const companyID = await getCompanyID(user, pass);
  console.log(`Company ID: ${companyID}`);
  const employees = await getAllActiveEmployees(user, pass, companyID);
  console.log(`Number of employeed: ${employees.length}`);
  for (const employee of employees) {
    const absenceData = await getAbscenseData(user, pass, employee.Id);
    formOutput(group, source_app, employee.Id, absenceData);
  }
  console.log("Request handling complete.");
};
