module.exports.createTime = function createTime(input="00:00"){
    if(typeof input !== typeof "easter egg") throw new Error("Invalid Type: Must be of type 'string'.").stack;
    if(input.length !== 5) throw new Error("Invalid Length: Must be of length 5.").stack;
    var split = input.split(':');
    if(split[0].length !== 2) throw new Error("Invalid Separator: Separator must be ':' and be located at index 2.").stack;
    var hours = Number(split[0]);
    var minutes = Number(split[1]);
    if(isNaN(hours) || isNaN(minutes)) throw new Error("Invalid Input: Hours and/or minutes is not a number.").stack;
    if(hours > 23) throw new Error("Invalid Input: Hours must be between 00 and 23.").stack;
    if(minutes > 60) throw new Error("Invalid Input: Minutes must be between 00 and 59.").stack;
    return { hours : hours, minutes: minutes };
}

const simpleTimeError = new Error("Invalid Type: Parameters must match simpleTime format: \nObject {\n  hours: Number,\n  minutes: Number\n}");

function isSimpleTime(input){
    if(input.hours && input.minutes && !isNaN(input.hours) || input.hours === 0 && !isNaN(input.minutes)) return true;
    return false;
}

module.exports.strTime = function strTime(t1){
    if(isSimpleTime(t1)){
        return "" + (t1.hours < 10 ? "0" + t1.hours : t1.hours) + ":" + (t1.minutes < 10 ? "0" + t1.minutes : t1.minutes);
    }
    else throw simpleTimeError.stack;
}

module.exports.addTime = function addTime(t1, t2, overwrite=false){
    if(isSimpleTime(t1) && isSimpleTime(t2)){
        const temp = { hours: t1.hours, minutes: t1.minutes };
        temp.minutes += t2.minutes;
        if(temp.minutes >= 60){
            temp.hours++;
            temp.minutes -= 60;
        }
        temp.hours += t2.hours;
        if(temp.hours > 23) temp.hours -= 24;

        if(overwrite){
            t1.hours = temp.hours;
            t1.minutes = temp.minutes;
        }
        return temp;
    }
    else throw simpleTimeError.stack;
}

module.exports.subTime = function subTime(t1,t2, overwrite=false){
    if(isSimpleTime(t1) && isSimpleTime(t2)){
        const temp = { hours: t1.hours, minutes: t1.minutes };
        temp.minutes -= t2.minutes;
        if(temp.minutes < 0){
            temp.hours--;
            temp.minutes += 60;
        }
        temp.hours -= t2.hours;
        if(temp.hours < 0) temp.hours += 24;

        if(overwrite){
            t1.hours = temp.hours;
            t1.minutes = temp.minutes;
        }
        return temp;
    }
    else throw simpleTimeError.stack;
}

module.exports.difTime = function difTime(t1,t2){
    if(isSimpleTime(t1) && isSimpleTime(t2)){
        const difTime = { hours: 0, minutes: 0 };
        var lessOneHour = 0;

        if(t1.hours < t2.hours){
            if(t1.minutes <= t2.minutes){
                difTime.minutes = t2.minutes - t1.minutes;
            }
            else{
                difTime.minutes = t2.minutes + 60 - t1.minutes;
                lessOneHour = 1;
            }
            difTime.hours = t2.hours - t1.hours - lessOneHour;
        }
        else if(t1.hours > t2.hours){
            if(t1.minutes <= t2.minutes){
                difTime.minutes = t2.minutes - t1.minutes;
            }
            else{
                difTime.minutes = t2.minutes + 60 - t1.minutes;
                lessOneHour = 1;
            }   
            difTime.hours = t2.hours + 24 - t1.hours - lessOneHour;
        }
        else{
            if(t1.minutes <= t2.minutes){
                difTime.minutes = t2.minutes - t1.minutes;
            }
            else{
                difTime.minutes = t2.minutes + 60 - t1.minutes;
                difTime.hours = 23;
            }
        }
        return difTime;
    }
    else throw simpleTimeError.stack;
}