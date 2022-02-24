const db = require('../config/keys').mysqlConfig;
const handle = require('../utils/handle');
class Company {
    constructor() { }
    commit(sql) {
        return new Promise((resolve, reject) => {
            handle(db, sql, (err, _result) => {
                if (err) reject(err)
                else resolve(_result);
            })
        })
    }
    // 删除物流公司
    delete(id) {
        const sql = `delete from companys WHERE id=${id};`;
        return this.commit(sql);
    }

    // 分页查询
    query(page) {
        const sql = `select * from companys limit ${page * 20},20`;
        return this.commit(sql);
    }

    // 获取全部数量
    getNum() {
        const sql = `select count(1) as num from companys`;
        return this.commit(sql);
    }

    insert(name, symbol) {
        const sql = `insert into companys(name,symbol) values('${name}','${symbol}');`;
        return this.commit(sql);
    }
}
const company = new Company();
module.exports = company;