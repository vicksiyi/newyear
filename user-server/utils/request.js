const request = require('request');
class HttpRequest {
    constructor() { }
    getConfig() {
        return {
            method: "GET",   //指定请求方法类型：GET, POST
            json: true,
            timeout: 30000,  // 设置请求超时，单位是毫秒  
            headers: {
                "content-type": "application/json",
            },
            // qs: data    // 进行GET请求时，此处的参数一定是qs,请注意，如果是POST请求，参数是form            
        }
    }
    get(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign(this.getConfig(), options);
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body)   // 返回response的内容
                } else {
                    reject(error);   // 返回错误信息
                }
            });
        });
    }
}
const axios = new HttpRequest();
module.exports = axios;