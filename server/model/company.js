const Handle = require('../model/handle');
class Company extends Handle {
    constructor(){
        super();
    }
    // 删除物流公司
    delete(id) {
        const sql = `delete from companys WHERE id=${id};`;
        return super.commit(sql);
    }

    // 分页查询
    query(page) {
        const sql = `select * from companys order by time desc limit ${page * 20},20`;
        return super.commit(sql);
    }

    // 获取全部数量
    getNum() {
        const sql = `select count(1) as num from companys`;
        return super.commit(sql);
    }

    insert(name, symbol) {
        const sql = `insert into companys(name,symbol) values('${name}','${symbol}');`;
        return super.commit(sql);
    }
}
const company = new Company();
module.exports = company;