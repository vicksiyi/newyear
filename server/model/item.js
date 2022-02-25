const Handle = require('../model/handle');
class Item extends Handle {
    constructor() {
        super();
    }
    edit(uuid, title, url, num, money) {
        const sql = `update items set title = '${title}', url='${url}',
        num = ${num}, money = ${money} where uuid='${uuid}'`;
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
    query(page) {
        const sql = `select i.uuid,i.title,t.title as type,
        i.url,i.num,i.status,i.money from items i 
        inner join itemTypes t where i.typeId = t.id limit ${20 * page},20;`;
        return super.commit(sql);
    }
    // 插入商品
    insert(title, url, num, money) {
        const sql = `insert into items(title,url,num,status,money) 
        values('${title}','${url}',${num},0,${money})`;
        return super.commit(sql);
    }
}
const item = new Item();
module.exports = item;