# simple-hhmm
A simple module for basic HH:mm format time calculations
Install with `const s_hhmm = require('simple-hhmm');`


## Functions
- Default parameters are specified if they aren't required

`createTime(input="00:00")`
- Creates a new simpleTime formatted object in the format { hours: Number, minutes: Number }
- Parameter is purposefully specific and must be a string in the format "HH:mm" where HH is 0-23 and mm is 0-59
- MUST INCLUDE LEADING 0'S ex: 4:07 -> `createTime("04:07");`
- Returns newly created object

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
- Subtracts one time from another and returns the result. t1 is overwritten is the 3rd parameter is true
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
var test = st.createTime("12:35");
var test2 = st.createTime("01:15");
var test3 = st.createTime("21:45");
var test4 = st.createTime("12:24");
var test5 = st.createTime("12:37");
var test6 = st.createTime("12:24");
console.log("Times:\nt1: " + st.strTime(test) + "\nt2: " + st.strTime(test2) + "\nt3: " + st.strTime(test3) + "\nt4: " + st.strTime(test4) + "\nt5: " + st.strTime(test5));
console.log(st.strTime(test) + " plus " + st.strTime(test2) + " is " + st.strTime(st.addTime(test, test2)) + " -> overwrite false");
console.log(st.strTime(test5) + " plus " + st.strTime(test3) + " is " + st.strTime(st.addTime(test5, test3, true)) + " -> overwrite true");
console.log(st.strTime(test) + " minus " + st.strTime(test2) + " is " + st.strTime(st.subTime(test, test2)) + " -> overwrite false");
console.log(st.strTime(test2) + " minus " + st.strTime(test) + " is " + st.strTime(st.subTime(test2, test, true)) + " -> overwrite true");
console.log("Time between " + st.strTime(test) + " and " + st.strTime(test2) + " is " + st.strTime(st.difTime(test, test2)));
console.log("Time between " + st.strTime(test) + " and " + st.strTime(test3) + " is " + st.strTime(st.difTime(test, test3)));
console.log("Time between " + st.strTime(test3) + " and " + st.strTime(test2) + " is " + st.strTime(st.difTime(test3, test2)));
console.log("Time between " + st.strTime(test) + " and " + st.strTime(test4) + " is " + st.strTime(st.difTime(test, test4)));
console.log("Time between " + st.strTime(test) + " and " + st.strTime(test5) + " is " + st.strTime(st.difTime(test, test5)));
console.log("Time between " + st.strTime(test6) + " and " + st.strTime(test4) + " is " + st.strTime(st.difTime(test6, test4)));
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