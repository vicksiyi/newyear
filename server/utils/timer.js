const path = require('path');
const check = require('./check');
const file = require('./file');
const time = 3000;
const limitTime = 10 * 60 * 1000;  // 文件过期时间
const dirpath = path.join(__dirname, '../routes/temp');
let timeTimeout = null; // 定时器
console.log('定时器启动!!!');

// 定时器
async function timer() {
    // 获取文件列表
    let files = await file.getFiles(dirpath).catch(err => { throw Error(err); });
    files.forEach(filename => {
        const filepath = `${dirpath}\\${filename}`;
        // 判断是否过期
        const isTimeout = check.isTimeout(filepath, limitTime);
        // 如果已经过期，删除文件
        if (isTimeout) { 
            file.delFile(filepath);
        }
    });
    timeTimeout = setTimeout(() => {
        clearTimeout(timeTimeout);
        timer();
    }, time);
}
timer(); //启动定时器