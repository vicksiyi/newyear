const Handle = require('../model/handle');
class Item extends Handle {
    constructor() {
        super();
    }
    query() {
        const sql = `select uuid,typeId,title,url,num,status,money from items where status = 1;`;
        return super.commit(sql);
    }
    getType(){
        const sql = `select id,title,priority from itemTypes where status = 1 order by priority;`;
        return super.commit(sql);
    }
}
const item = new Item();
module.exports = item;