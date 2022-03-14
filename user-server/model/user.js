const Handle = require("./handle");
class User extends Handle {
    constructor() { super(); }
    query(openId) {
        const sql = `select * from users where openId = '${openId}'`;
        return super.commit(sql);
    }
    insert(openId) {
        const sql = `insert into users(openId) values('${openId}');`;
        return super.commit(sql);
    }
}
const user = new User();
module.exports = user;