const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../model/item');
const utils = require('../utils/utils');
const redisHandle = require('../utils/redis');
const transaction = require("../model/transaction");
const fs = require('fs');
const { redis } = require('../config/keys');

// $routes /play/getNotPlay
// @desc 获取未支付订单
// @access private
router.get('/getNotPlay', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const openId = req.user.openId;
    const keyword = `mini:noPlay:${openId}:cards:*`;
    const keys = await redisHandle.getKeys(keyword).catch(err => {
        res.send({ code: 400, msg: '未知错误' })
        throw Error(err);
    });
    let result = [];
    for (let i = 0; i < keys.length; ++i) {
        let _ans = await redisHandle.getKey(keys[i]).catch(err => {
            res.send({ code: 400, msg: '未知错误' })
            throw Error(err);
        });
        let _ttl = await redisHandle.getTtlKey(keys[i]).catch(err => {
            res.send({ code: 400, msg: '未知错误' })
            throw Error(err);
        });
        let _result = { data: JSON.parse(_ans) };
        _result = Object.assign(_result, { key: keys[i], time: parseInt(keys[i].split(":")[keys[i].split(":").length - 1]), ttl: _ttl, date: new Date().getTime() });
        result.push(_result);
    }
    res.send({
        code: 200,
        data: result
    });
})

// 获取文件里面的值
function getNum() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/../config/coun.txt`, (err, data) => {
            let num = parseInt(data.toString());
            fs.writeFile(`${__dirname}/../config/coun.txt`, (num + 1) % 9999 + "", () => { });
            num = String(num);
            while (num.length < 4) {
                num = "0" + num;
            }
            resolve(num);
        })
    })
}

// $routes /play/playDone
// @desc 支付完成处理
// @access private
router.post('/playDone', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const openId = req.user.openId;
    const { msg, type, key, addressId } = req.body; // msg备注 type快递/自取 key订单
    transaction.start().catch(err => { throw err; }); // 开启事务
    // 生成订单
    let sql = `insert into orders(msg,openId,type) values('${msg}','${openId}',${type});`;
    transaction.insert(sql).then(() => {
        return new Promise((resolve, reject) => {
            sql = `select uuid from orders where openId = '${openId}' 
            order by time desc limit 1;`;
            // 获取最新插入的订单
            transaction.query(sql).then((orderLast) => {
                resolve(orderLast[0].uuid);
            }).catch((error) => reject(error));
        })
    }).then((orderId) => {
        // 上传订单物品信息
        return new Promise(async (resolve, reject) => {
            let items = await redisHandle.getKey(key);
            if (!items) reject();
            items = JSON.parse(items);
            for (let item in items) {
                sql = `insert into itemRelOrder(itemId,orderId,num) 
                values('${items[item].uuid}','${orderId}',${items[item].count});`;
                let _temp = await transaction.insert(sql).catch((error) => reject(error));
            }
            resolve(orderId);
        })
    }).then(async (orderId) => {
        if (type === 0) {  // 自取的处理方式
            const num = await getNum();
            sql = `insert into invites(orderId, num) values('${orderId}','${num}');`;
            return new Promise((resolve, reject) => {
                transaction.insert(sql).then(() => {
                    resolve(orderId, num);
                }).catch((error) => reject(error));
            })
        } else {
            sql = `insert into express(orderId, addressId) values('${orderId}',${addressId});`;
            return new Promise((resolve, reject) => {
                transaction.insert(sql).then(() => {
                    resolve(orderId, null);
                }).catch((error) => reject(error));
            })
        }
    }).then((orderId, num) => {
        // 提交事务
        return new Promise((resolve, reject) => {
            transaction.commit().then(() => {
                redisHandle.delKey(key);  // 删除未支付订单
                res.send({
                    code: 200,
                    msg: '成功插入',
                    orderId: orderId,
                    num: num
                })
            }).catch((error) => reject(error));
        })
    }).catch(err => {
        res.send({
            code: 400,
            msg: '插入失败'
        })
        transaction.rollback(err);
    });
})
module.exports = router;