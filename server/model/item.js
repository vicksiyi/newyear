const Handle = require('../model/handle');
class Item extends Handle {
    constructor() {
        super();
    }
    getNum(isFilter = false, typeId) {
        const sql = `select count(1) as num from items where ${isFilter ? 'typeId=' + typeId : '1=1'};`;
        console.log(sql);
        return super.commit(sql);
    }
    edit(uuid, title, typeId, url, num, money, status) {
        const sql = `update items set title = '${title}',typeId=${typeId}, url='${url}',
        num = ${num}, money=${money},status=${status} where uuid='${uuid}'`;
        return super.commit(sql);
    }
    // 上架商品
    putUp(uuid) {
        const sql = `update items set status = 1 where uuid = '${uuid}'`;
        return super.commit(sql);
    }
    // 下架商品
    putDown(uuid) {
        const sql = `update items set status = 2 where uuid = '${uuid}'`;
        return super.commit(sql);
    }
    // 分页获取商品
    query(page, isFilter = false, typeId) {
        const sql = `select i.uuid,i.title,t.title as type,
        i.url,i.num,i.status,i.money from items i 
        inner join itemTypes t where i.typeId = t.id 
        ${isFilter ? 'and i.typeId =' + typeId : ''} limit ${20 * page},20;`;
        return super.commit(sql);
    }
    // 插入商品
    insert(title, typeId, url, num, money, status) {
        const sql = `insert into items(title,typeId,url,num,money,status) 
        values('${title}',${typeId},'${url}',${num},${money},${status})`;
        return super.commit(sql);
    }
}
const item = new Item();
module.exports = item;