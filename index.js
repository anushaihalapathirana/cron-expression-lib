  /**
   * UTCDateTime format -> "Sat Dec 01 2018 10:30:00 GMT+0530 (India Standard Time)"
   * selection -> "second, minute, hour, day, month, year"
   * selectedDaysOfWeekArray -> [MON,TUE] 
   * selectedMonths -> 0-11
   * repeatOccurence -> for daily option -> 1-31
   */
exports.generateCronExpression = function(selection, UTCDateTime, selectedDaysOfWeekArray, selectedMonths, repeatOccurence) {
  
  const SELECTIONS = {
    SECOND: 'SECOND',
    MINUTE: 'MINUTE',
    HOUR: 'HOUR',
    DAY: 'DAY',
    MONTH: 'MONTH',
    YEAR: 'YEAR',
  }
  const WEEK_DAYS = {
    SUN: 'SUN',
    MON: 'MON',
    TUE: 'TUE',
    WED: 'WED',
    THU: 'THU',
    FRI: 'FRI',
    SAT: 'SAT',
  }

  const MONTH_DAYS = {
    JAN: 'JAN',
    FEB: 'FEB',
    MAR: 'MAR',
    APR: 'APR',
    MAY: 'MAY',
    JUN: 'JUN',
    JUL: 'JUL',
    AUG: 'AUG',
    SEP: 'SEP',
    OCT: 'OCT',
    NOV: 'NOV',
    DEC: 'DEC',
  }

  const WEEK_DAYS_ARRAY = ['SUN', 'MON', 'TUE','WED', 'THU', 'FRI', 'SAT'];
  UTCDateTime = new Date("Sat Dec 01 2018 10:30:04 GMT+0530 (India Standard Time)");

  let seconds = '*';
  let minutes = '*';
  let hours = '*';
  let dayOfMonth = '*';
  let month = '*';
  let dayOfWeek = '*';
  let year = '*';
  let error = false;
  let errorMsg = '';

  seconds = UTCDateTime.getSeconds();
  minutes = UTCDateTime.getMinutes();
  hours = UTCDateTime.getHours();
  // month = UTCDateTime.getMonth();
  // year = UTCDateTime.getFullYear();
  dayOfMonth = dayOfWeek == "*" ? "?" : "*";

  let repeat = (typeof repeatOccurence == 'string') ? parseInt(repeatOccurence) : repeatOccurence;

  if(selection === SELECTIONS.SECOND) {
    if(!repeatOccurence) {
      seconds = UTCDateTime.getSeconds();
    } else if(repeatOccurence && repeat >=0 && repeat <= 59) {
      seconds = UTCDateTime.getSeconds()+'/'+repeat.toString();
    } else {
      error = true;
      errorMsg =  "invalid value. Accepted values are 0-59";
    }
    minutes = '0';
    hours = '0';
    dayOfMonth = dayOfWeek == "*" ? "?" : "*";
  } else if(selection === SELECTIONS.MINUTE) {
      if(!repeatOccurence) {
        minutes = UTCDateTime.getMinutes();
      } else if(repeatOccurence && repeat >=0 && repeat <= 59) {
        minutes = UTCDateTime.getMinutes()+'/'+repeat.toString();
      } else {
        error = true;
        errorMsg =  "invalid value. Accepted values are 0-59";
      }
      seconds = UTCDateTime.getSeconds();
      hours = '0';
  } else if(selection === SELECTIONS.HOUR) {
    if(!repeatOccurence) {
      hours = UTCDateTime.getHours();
    } else if(repeatOccurence && repeat >=0 && repeat <= 23) {
      hours = UTCDateTime.getHours()+'/'+repeat.toString();
    } else {
      error = true;
      errorMsg = "invalid value. Accepted values are 0-23";
    }
    seconds = UTCDateTime.getSeconds();
    minutes = UTCDateTime.getMinutes();
  } else if(selection === SELECTIONS.DAY || selection === SELECTIONS.MONTH || selection === SELECTIONS.YEAR) {
    let isWeekDays = selectedDaysOfWeekArray.includes(WEEK_DAYS.SUN) || selectedDaysOfWeekArray.includes(WEEK_DAYS.MON) || selectedDaysOfWeekArray.includes(WEEK_DAYS.TUE) ||
            selectedDaysOfWeekArray.includes(WEEK_DAYS.THU) || selectedDaysOfWeekArray.includes(WEEK_DAYS.FRI) || selectedDaysOfWeekArray.includes(WEEK_DAYS.SAT);
    let validCount = 0;
    let isValid = false;

    selectedDaysOfWeekArray.forEach(element => {
      if(typeof element !== 'number') {
        validCount = validCount+1; 
      }
    });

    if(validCount === 0) isValid = true;

    if(selectedDaysOfWeekArray && isWeekDays) {
      let selectedDaysOfWeek = selectedDaysOfWeekArray.join(',');
      dayOfWeek = selectedDaysOfWeek;
      dayOfMonth = '?';
    } else if(selectedDaysOfWeekArray && selectedDaysOfWeekArray.length === 1 && (selectedDaysOfWeekArray[0] === "L" || selectedDaysOfWeekArray[0] === "LW") ) {
      dayOfMonth = selectedDaysOfWeekArray[0];
      dayOfWeek = '?';
    } else if (selectedDaysOfWeekArray && isValid) {
      dayOfMonth = selectedDaysOfWeekArray.join(',');
      dayOfWeek = '?';
    } else {
      error = true;
      errorMsg = "invalid value. Accepted values are SUN, MON, TUE, WED, THU, FRI, SAT, L, LW and 1-31";
    }

    let isMonthName = selectedMonths && (selectedMonths.includes(MONTH_DAYS.JAN) || selectedMonths.includes(MONTH_DAYS.FEB) || selectedMonths.includes(MONTH_DAYS.MAR) ||
    selectedMonths.includes(MONTH_DAYS.APR) || selectedMonths.includes(MONTH_DAYS.MAY) || selectedMonths.includes(MONTH_DAYS.JUN) ||
    selectedMonths.includes(MONTH_DAYS.JUL) ||selectedMonths.includes(MONTH_DAYS.AUG) ||selectedMonths.includes(MONTH_DAYS.SEP) ||
    selectedMonths.includes(MONTH_DAYS.OCT) ||selectedMonths.includes(MONTH_DAYS.NOV) ||selectedMonths.includes(MONTH_DAYS.DEC));
    
    if(selectedMonths && isMonthName && (selection === SELECTIONS.MONTH || selection === SELECTIONS.YEAR)) {
        month = selectedMonths.join(',');
    } else {
      error = true;
      errorMsg = "invalid value. Accepted values are JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC";
    }

    if(selection === SELECTIONS.YEAR) {
      year = UTCDateTime.getFullYear();
    }


    seconds = UTCDateTime.getSeconds();
    minutes = UTCDateTime.getMinutes();
    hours = UTCDateTime.getHours();
  } else {
    error = true;
    errorMsg = "invalid value. Accepted values are SECOND, MINUET, HOUR, DAY, MONTH, YEAR";
  }

  if(!error) {
    let cronExpressionArray = [seconds, minutes, hours, dayOfMonth, month, dayOfWeek, year];
    let cronExpression = cronExpressionArray.join(" ")
    return cronExpression;
  } else {
    return errorMsg;
  }
}

console.log(module.exports.generateCronExpression("YEAR",1,[1,2],["JAN"],5));