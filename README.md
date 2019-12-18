# simple-hhmm
A simple module for basic HH:mm format time calculations

Install with `npm i simple-hhmm`

Include with `require('simple-hhmm');`


## Functions
- Default parameters are specified if they aren't required

`createTime(input="00:00")`
- Creates a new simpleTime formatted object in the format { hours: Number, minutes: Number }
- Parameter is purposefully specific and must be a string in the format "HH:mm" where HH is 0-23 and mm is 0-59
- MUST INCLUDE LEADING ZERO -> ex: 4:07 -> `createTime("04:07");`
- Returns newly created object

`tryCreateTime(input)`
- Attempts to create a new simpleTime format object with a time string that has additional information appended on the end
- Example Times: "10:15 am", "02:12 next", "09:45pm" (if the string includes pm in it, 12 hours will be added)
- Parameter is a string that starts with 5 characters in "HH:mm" format
- Returns a new simpleTime object if possible, or -1 if unsuccessful

`strTime(t1)`
- Formats simpleTime object as a string
- Parameter is a simpleTime formatted object
- Returns a stringified simpleTime format object in "HH:mm" format

`addTime(t1,t2,overwrite=false)`
- Adds one time to another and returns the result. t1 is overwritten if the 3rd parameter is true
- Hours or minutes past their maximums are rolled over (if minutes rolls over, an hour is added)
- Parameters are 2 simpleTime format objects, overwrite is a boolean and not required
- Returns the result of the two times being added together as a simpleTime format object

`subTime(t1,t2,overwrite=false)`
- Subtracts one time from another and returns the result. t1 is overwritten if the 3rd parameter is true
- Edge cases are handled similarly to addTime
- Parameters are 2 simpleTime format objects, overwrite is a boolean and not required
- Returns the result of the times being subtracted as a simpleTime format object

`difTime(t1,t2)`
- Gets the difference between two times
- If t2 is before t1, t1 is considered as 'the day before'
- Parameters are two simpleTime format objects
- Returns the difference between two times as a simpleTime format object.

## Examples
```
const s_hhmm = require('simple-hhmm');

var test = s_hhmm.createTime("12:35");
var test2 = s_hhmm.createTime("01:15");
var test3 = s_hhmm.createTime("21:45");
var test4 = s_hhmm.createTime("12:24");
var test5 = s_hhmm.createTime("12:37");
var test6 = s_hhmm.createTime("12:24");
console.log("Times:\nt1: " + s_hhmm.strTime(test) + "\nt2: " + s_hhmm.strTime(test2) + "\nt3: " + s_hhmm.strTime(test3) + "\nt4: " + s_hhmm.strTime(test4) + "\nt5: " + s_hhmm.strTime(test5));
console.log(s_hhmm.strTime(test) + " plus " + s_hhmm.strTime(test2) + " is " + s_hhmm.strTime(s_hhmm.addTime(test, test2)) + " -> overwrite false");
console.log(s_hhmm.strTime(test5) + " plus " + s_hhmm.strTime(test3) + " is " + s_hhmm.strTime(s_hhmm.addTime(test5, test3, true)) + " -> overwrite true");
console.log(s_hhmm.strTime(test) + " minus " + s_hhmm.strTime(test2) + " is " + s_hhmm.strTime(s_hhmm.subTime(test, test2)) + " -> overwrite false");
console.log(s_hhmm.strTime(test2) + " minus " + s_hhmm.strTime(test) + " is " + s_hhmm.strTime(s_hhmm.subTime(test2, test, true)) + " -> overwrite true");
console.log("Time between " + s_hhmm.strTime(test) + " and " + s_hhmm.strTime(test2) + " is " + s_hhmm.strTime(s_hhmm.difTime(test, test2)));
console.log("Time between " + s_hhmm.strTime(test) + " and " + s_hhmm.strTime(test3) + " is " + s_hhmm.strTime(s_hhmm.difTime(test, test3)));
console.log("Time between " + s_hhmm.strTime(test3) + " and " + s_hhmm.strTime(test2) + " is " + s_hhmm.strTime(s_hhmm.difTime(test3, test2)));
console.log("Time between " + s_hhmm.strTime(test) + " and " + s_hhmm.strTime(test4) + " is " + s_hhmm.strTime(s_hhmm.difTime(test, test4)));
console.log("Time between " + s_hhmm.strTime(test) + " and " + s_hhmm.strTime(test5) + " is " + s_hhmm.strTime(s_hhmm.difTime(test, test5)));
console.log("Time between " + s_hhmm.strTime(test6) + " and " + s_hhmm.strTime(test4) + " is " + s_hhmm.strTime(s_hhmm.difTime(test6, test4)));
```

### Output
```
Times:
t1: 12:35
t2: 01:15
t3: 21:45
t4: 12:24
t5: 12:37
12:35 plus 01:15 is 13:50 -> overwrite false
12:37 plus 21:45 is 10:22 -> overwrite true
12:35 minus 01:15 is 11:20 -> overwrite false
01:15 minus 12:35 is 12:40 -> overwrite true
Time between 12:35 and 12:40 is 00:05
Time between 12:35 and 21:45 is 09:10
Time between 21:45 and 12:40 is 14:55
Time between 12:35 and 12:24 is 23:49
Time between 12:35 and 10:22 is 21:47
Time between 12:24 and 12:24 is 00:00
```