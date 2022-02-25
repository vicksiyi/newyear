const Handle = require('../model/handle');
class Admin extends Handle{
    constructor() {
        super();
    }
    // 查询ID
    queryId(id) {
        const sql = `select * from admins where id = '${id}'`;
        return super.commit(sql);
    }
    // 查询账号 Account
    queryAccount(account) {
        const sql = `select * from admins where account = '${account}'`;
        return super.commit(sql);
    }
    insert(account, password) {
        const sql = `insert into admins(account,password) values('${account}','${password}');`;
        return super.commit(sql);
    }
}
const admin = new Admin();
module.exports = admin;