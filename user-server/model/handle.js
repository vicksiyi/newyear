const db = require('../config/keys').mysqlConfig;
const handle = require('../utils/handle');
class Handle {
    commit(sql) {
        return new Promise((resolve, reject) => {
            handle(db, sql, (err, _result) => {
                if (err) reject(err)
                else resolve(_result);
            })
        })
    }
}
module.exports = Handle;