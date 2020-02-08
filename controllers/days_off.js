const fs = require("fs");
const getCompanyID = require("../api/getCompanyID");
const getAllActiveEmployees = require("../api/getAllActiveEmployees");
const getAbscenseData = require("../api/getAbscenseData");
const path = require("path");

let timestamp;
let folder_name;

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
          date: absence.Start,
          data: {
            duration_minutes: calcTimeDifference(absence.Start, absence.End),
            day_off_name: absence.Dossier,
            internal_code: absence.AbsenceId
          }
        };
      }
    });
  }
  const payload = {
    group_id,
    source_app,
    source_app_internal_id: employee_id,
    calendar
  };
  writeOutput(payload);
};

const writeOutput = data => {
  const json = JSON.stringify(data, null, 2);
  const filename = path.resolve(
    __dirname,
    folder_name,
    `case-${data.group_id}-${data.source_app_internal_id}.json`
  );
  fs.writeFile(filename, json, "utf-8", err => {
    if (err) throw err;
  });
};

module.exports = async ({ user, pass, group, source_app }) => {
  const companyID = await getCompanyID(user, pass);
  console.log(`Company ID: ${companyID}`);
  const employees = await getAllActiveEmployees(user, pass, companyID);
  console.log(`Number of employeed: ${employees.length}`);
  timestamp = Date.now();
  folder_name = `../output/${timestamp}`;
  fs.mkdirSync(path.resolve(__dirname, folder_name));
  console.log(`Created output folder: '/output/${timestamp}/'`);
  await employees.forEach(async (employee, i) => {
    const absenceData = await getAbscenseData(user, pass, employee.Id);
    formOutput(group, source_app, employee.Id, absenceData);
  });
  console.log("Request handling complete");
};
