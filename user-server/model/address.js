const Handle = require('../model/handle');
class Address extends Handle {
    constructor() {
        super();
    }
    query(openId) {
        const sql = `select * from address where openId = '${openId}'`;
        return super.commit(sql);
    }
    insert(openId,name,mobile,address) {
        const sql = `insert into address(openId,name,mobile,address) 
        values('${openId}','${name}','${mobile}','${address}')`;
        return super.commit(sql);
    }
}
const address = new Address();
module.exports = address;