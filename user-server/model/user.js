const db = require('../config/keys').mysqlConfig;
const handle = require('../utils/handle');
class User {
    constructor() { }
    commit(sql) {
        return new Promise((resolve, reject) => {
            handle(db, sql, (err, _result) => {
                if (err) reject(err)
                else resolve(_result);
            })
        })
    }
    query(openId) {
        const sql = `select * from users where openId = '${openId}'`;
        return this.commit(sql);
    }
    insert(openId) {
        const sql = `insert into users(openId) values('${openId}');`;
        return this.commit(sql);
    }
}
const user = new User();
module.exports = user;