// Your code here
function createEmployeeRecord(data) {
    return {

        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ') // destructuring

    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10), // needs integer, not string
        date // destructure
    }
    employeeRecord.timeInEvents.push(clockIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ') //destructuring

    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10), //needs integer, not string
        date //destructuring
    }
    employeeRecord.timeOutEvents.push(clockOut)

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    //find timein event and timeout event for that date

    //iterate through time in events and find one with matching date
    const timeIn = employeeRecord.timeInEvents.find(function(timeEvent) {
        return timeEvent.date === date
    })

    const timeOut = employeeRecord.timeOutEvents.find(function(timeEvent) {
        return timeEvent.date === date
    })

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100 //so that returns 2 instead of 200

    // maybe a better way of doing this

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let payPeriod = employeeRecord.timeInEvents.map(function(e) {
        return e.date
    })


    let totalPay = payPeriod.reduce(function(counter, date) {
            return counter + wagesEarnedOnDate(employeeRecord, date)
        }, 0) //counter starts at 0 b/c pass in 0 as argument

    return totalPay
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(counter, employee) {
            return counter + allWagesFor(employee)
        }, 0) // default 0 again
}


////// IM GOING TO CRY IN THE SHOWER /////////