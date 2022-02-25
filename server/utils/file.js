const fs = require("fs");
class File {
    constructor() { }
    // 获取文件相关状态
    getFileStat(filepath) {
        return fs.statSync(filepath)
    }
    // 获取文件列表
    getFiles(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            })
        })
    }
    // 删除文件
    delFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }
    renameFile(oldName, newName) {
        return new Promise((resolve, reject) => {
            fs.rename(oldName, newName, function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, function (err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }
}
const file = new File();
module.exports = file;