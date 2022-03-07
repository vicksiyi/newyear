const formatTimestamp = function (timestamp) {
    var dateObj = new Date(timestamp);
    var year = dateObj.getYear() + 1900;
    var month = dateObj.getMonth() + 1;
    var theDate = dateObj.getDate();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    return year + "-" + month + "-" + theDate + " " + hour + ":" + minute + ":" + second;
}

const mergeTime = function (time1, time2) {
    time1 = formatTimestamp(new Date(time1).getTime());
    time2 = formatTimestamp(new Date(time2).getTime());
    let time = `${time1.split(" ")[0]} ${time2.split(" ")[1]}`;
    return time;
}

module.exports = {
    mergeTime,
    formatTimestamp
}