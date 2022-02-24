exports.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

exports.formatTimestamp = function (timestamp) {
    var dateObj = new Date(timestamp);

    var year = dateObj.getYear() + 1900;
    var month = dateObj.getMonth() + 1;
    var theDate = dateObj.getDate();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    return year + "-" + month + "-" + theDate + " " + hour + ":" + minute + ":" + second;
}

exports.toJson = function (result) {
    return JSON.parse(JSON.stringify(result));
}