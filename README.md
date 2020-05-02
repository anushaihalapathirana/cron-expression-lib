# cron-expression-lib

cron-expressopn-lib is a Node.js libry to generate **quartz** cron expression.

## Installation
    npm install cron

## usage

    var cronExpression = require('cron-exp-lib');
    var cron = cronExpression.generateCronExpression("YEAR", new Date(), [1,2], ["JAN"], 5);

Pass following parameters to generateCronExpression function. 
- selection (string)
- UTCDateTime (UTCtime)
- selectedDaysOfWeekArray (array)
- selectedMonths (array)
- repeatOccurence (number)

**Available options**
- selection 
    - SECOND, MINUTE, HOUR, DAY, MONTH, YEAR
- selectedDaysOfWeekArray
    - Array of strings with names of week (allowed first three capital letters )["MON","WED"]
    - Array of numbers with 1 to 31 [5,7,21]
    - Array with ["L"]
    - Array with ["LW"]
- selectedMonths
    - Array of strings with names of months (allowed first three capital letters ) ["FEB", "MAY"]

**Available cron patterns**

    Asterisk. E.g. *
    Question mark E.g. ?
    repeat occurrences. E.g. */2

## cron accepted values
    Seconds: 0-59
    Minutes: 0-59
    Hours: 0-23
    Day of Month: 1-31, L, LW
    Months: (JAN-DEC)
    Day of Week: (SUN-SAT)
