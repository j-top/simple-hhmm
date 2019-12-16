# simple-hhmm
A simple module for basic HH:mm format time calculations

## functions
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
- Returns the result of the two times being added together

`subTime(t1,t2,overwrite=false)`
- Subtracts one time from another and returns the result. t1 is overwritten is the 3rd parameter is true
- Edge cases are handled similarly to addTime
- Parameters are 2 simpleTime format objects, overwrite is a boolean and not required
- Returns the result of the times being subtracted

`difTime(t1,t2)`
- Gets the difference between two times
- Parameters are two simpleTime format objects
- Returns the difference between two times. If t2 is before t1, t1 is considered as 'the day before'