const Handle = require('../model/handle');
class ItemType extends Handle{
    constructor() { 
        super();
    }
    // 上架
    putUp(id){
        const sql = `update itemTypes set status = 1 where id = ${id}`;
        return super.commit(sql);
    }
    // 下架
    putDown(id) {
        const sql = `update itemTypes set status = 0 where id = ${id}`;
        return super.commit(sql);
    }
    // 交换两个id的优先级
    swap(id1,id2) {
        const sql = `update itemTypes as a, itemTypes as b set a.priority=b.priority, b.priority=a.priority where a.id = ${id1} and b.id= ${id2};`;
        return super.commit(sql);
    }
    // 查询所有类别
    query(){
        const sql = `select * from itemTypes order by priority asc;`;
        return super.commit(sql);
    }
    // 插入商品类别
    insert(title) {
        const sql = `insert into itemTypes(title,status) values('${title}',1);`;
        return super.commit(sql);
    }
}
const itemType = new ItemType();
module.exports = itemType;