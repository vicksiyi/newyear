const Handle = require('../model/handle');
class Notice extends Handle {
    constructor() {
        super();
    }
    getLast() {
        const sql = `select * from notices where status = 1 and 
        now() > startTime and now() < endTime order by time desc limit 1;`;
        return super.commit(sql);
    }
}
const notice = new Notice();
module.exports = notice;