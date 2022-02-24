function handle(objHost, sql, callback, add = null) {
    let mysql = require('mysql');
    var connection = mysql.createConnection(objHost);
    connection.connect();
    //增删改查
    if (add != null) {
        connection.query(sql, add, callback);
    } else {
        connection.query(sql, callback);
    }
    connection.end();
}
module.exports = handle;