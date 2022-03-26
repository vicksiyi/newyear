const keys = require('../config/keys');
const redis = require('redis');
const dbConfig = keys.redis;
const RDS_PORT = dbConfig.port;     //端口号
const RDS_HOST = dbConfig.host;     //服务器IP
const RDS_PWD = dbConfig.pass;     //密码
const RDS_OPTS = { auth_pass: RDS_PWD };

class RedisHandle {
    constructor(RDS_PORT, RDS_HOST, RDS_OPTS) {
        this.RDS_PORT = RDS_PORT, this.RDS_HOST = RDS_HOST, this.RDS_OPTS = RDS_OPTS;
        this.redisClient = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
        this.redisClient.on('connect', function () {
            console.log('Modify redis connect success!');
        });
        this.redisClient.on('error', function (err) {
            console.log('Error ' + err);
        });
    }

    // 获取键值
    getKey(key) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.get(key, function (err, result) {
                if (err) reject(err)
                else resolve(result);
            })
        })
    }

    // 设置值
    setKey(key, value) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.set(key, value, (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        })
    }

    // 设置存在过期时间的值{默认一个小时}
    setTtlKey(key, value, time = 3600) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.set(key, value, (err, key) => {
                if (err) reject(err);
                else resolve();
            });
        }).then(() => {
            return new Promise((resolve, reject) => {
                _this.redisClient.expire(key, time, (err) => {
                    if (err) reject(err);
                    else resolve(key);
                });
            })
        })
    }

    // 获取过期时间
    getTtlKey(key) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.ttl(key, function (err, reply) {
                if (err) resolve(err);
                else resolve(reply);
            });
        })
    }
    // 获取符合条件的keys
    getKeys(keyword) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.keys(keyword, function (err, reply) {
                if (err) resolve(err);
                else resolve(reply);
            })
        })
    }
    // 删除某个key
    delKey(key) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.redisClient.del(key, function (err, result) {
                if (err) reject(err)
                else resolve(result);
            })
        })
    }
}
const redisHandle = new RedisHandle(RDS_PORT, RDS_HOST, RDS_OPTS);
module.exports = redisHandle;

