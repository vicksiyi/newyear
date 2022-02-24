exports.randomString = function (len) {
    len = len || 32;
    let timestamp = new Date().getTime();
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomStr + timestamp;
}

exports.getSmsCode = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}