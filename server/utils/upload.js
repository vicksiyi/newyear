const file = require('./file');
const OSS = require('ali-oss');
const keys = require('../config/keys');
const client = new OSS(keys.ali_oss);

class Upload {
    constructor(client, file) {
        this.client = client;
    }
    // 上传文件到oss[fillpath:文件名称,distpath:oss存储路径]
    addFile(filepath, distpath) {
        const _this = this;
        return new Promise((resolve, reject) => {
            file.readFile(filepath).then((data) => {
                _this.client.put(distpath, data).then((result) => {
                    resolve(result.url);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        })
    }
}
const upload = new Upload(client);
module.exports = upload;