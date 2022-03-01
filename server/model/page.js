const Handle = require('../model/handle');
class Page extends Handle {
    constructor() {
        super();
    }
    insert(adminId, url, type) {
        const sql = `insert into images(adminId,url,type) values(${adminId},'${url}',${type});`;
        return super.commit(sql);
    }
    // 获取页面设计图
    query() {
        const sql = `select id,url,type from images`;
        return super.commit(sql);
    }
}
const page = new Page();
module.exports = page;