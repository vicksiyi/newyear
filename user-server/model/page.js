const Handle = require("./handle");
class Page extends Handle {
    constructor() { super(); }
    query() {
        const sql = `select id,url,type from images`;
        return super.commit(sql);
    }
}
const page = new Page();
module.exports = page;