/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payRate;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}
