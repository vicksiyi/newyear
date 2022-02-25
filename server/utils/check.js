const file = require('./file');
const rules = {
    images: ['image/jpeg', 'image/png']
}
class Check {
    constructor(rules) {
        this.rules = rules;
    }
    // 是不是图片类型[上传]
    isImage(mimetype) {
        return this.rules.images.indexOf(mimetype) !== -1;
    }
    // 检查文件是否过期
    isTimeout(filepath, limitTime) {
        const time = (new Date()).getTime();
        const ctime = new Date(file.getFileStat(filepath).ctime).getTime();
        const diff = time - ctime;
        if (diff > limitTime) return true;
        return false;
    }
}
const check = new Check(rules);
module.exports = check;