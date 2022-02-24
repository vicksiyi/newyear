const db = require('../config/keys').mysqlConfig;
const handle = require('../utils/handle');
class Admin {
    constructor() { }
    commit(sql) {
        return new Promise((resolve, reject) => {
            handle(db, sql, (err, _result) => {
                if (err) reject(err)
                else resolve(_result);
            })
        })
    }
    // 查询ID
    queryId(id) {
        const sql = `select * from admins where id = '${id}'`;
        return this.commit(sql);
    }
    // 查询账号 Account
    queryAccount(account) {
        const sql = `select * from admins where account = '${account}'`;
        return this.commit(sql);
    }
    insert(account, password) {
        const sql = `insert into admins(account,password) values('${account}','${password}');`;
        return this.commit(sql);
    }
}
const admin = new Admin();
module.exports = admin;