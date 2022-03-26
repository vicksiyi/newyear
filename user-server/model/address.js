const Handle = require('../model/handle');
class Address extends Handle {
    constructor() {
        super();
    }
    query(openId) {
        const sql = `select * from address where openId = '${openId}'`;
        return super.commit(sql);
    }
    edit(id, openId, name, mobile, address) {
        const sql = `update address set name='${name}', mobile='${mobile}',
        address = '${address}' where id = ${id} and openId = '${openId}'`;
        return super.commit(sql);
    }
    insert(openId, name, mobile, address) {
        const sql = `insert into address(openId,name,mobile,address) 
        values('${openId}','${name}','${mobile}','${address}')`;
        return super.commit(sql);
    }
}
const address = new Address();
module.exports = address;