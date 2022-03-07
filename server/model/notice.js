const Handle = require('../model/handle');
class Notice extends Handle {
    constructor() {
        super();
    }
    getNum() {
        const sql = `select count(1) as total from notices;`;
        return super.commit(sql);
    }
    update(id, status) {
        const sql = `update notices set status=${status} where id = ${id};`;
        return super.commit(sql);
    }
    insert(title, content, startTime, endTime) {
        const sql = `insert into notices(title,content,startTime,endTime) 
        values('${title}','${content}','${startTime}','${endTime}')`;
        return super.commit(sql);
    }
    query(page) {
        const sql = `select id,title,content,startTime,endTime,status,count(1) as total 
        from notices group by id order by time desc limit ${page * 20},20`;
        return super.commit(sql);
    }
}
const notice = new Notice();
module.exports = notice;