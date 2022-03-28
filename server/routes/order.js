const express = require('express');
const router = express.Router();
const passport = require('passport');
const order = require('../model/order');
const utils = require("../utils/utils");
const transaction = require("../model/transaction");

// $routes /order/getInvite
// @desc 获取自取订单
// @access private , 
router.get('/getInvite', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await order.getInvite().catch(err => {
        res.send({
            code: 400,
            msg: "获取失败"
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    let data = {};
    for (let i = 0; i < _result.length; ++i) {
        if (!data.hasOwnProperty(_result[i].orderId)) {
            data[_result[i].orderId] = {
                money: 0,
                count: 0,
                items: [],
                time: "",
                num: "",
                status: 0,
                openId: ""
            }
        }
        data[_result[i].orderId].count++;
        data[_result[i].orderId].openId = _result[i].openId;
        data[_result[i].orderId].status = _result[i].status;
        data[_result[i].orderId].num = _result[i].inviteNum;
        data[_result[i].orderId].money += _result[i].money;
        data[_result[i].orderId].msg = _result[i].msg;
        data[_result[i].orderId].items.push({
            money: _result[i].money,
            num: _result[i].num,
            title: _result[i].title,
            type: _result[i].iType,
            uuid: _result[i].itemId,
            url: _result[i].url
        })
        data[_result[i].orderId].time = utils.formatTimestamp(new Date(_result[i].time).getTime())
    }
    res.send({
        code: 200,
        data: data
    })
})

// $routes /order/nextStatus
// @desc 切换到下一状态
// @access private , 
router.put('/nextStatus/:orderId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const orderId = req.params.orderId;
    let _result = await order.nextStatus(orderId).catch(err => {
        res.send({
            code: 400,
            msg: '切换失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '切换成功'
    })
})

// $routes /order/getExpress
// @desc 获取快递订单
// @access private , 
router.get('/getExpress', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await order.getExpress().catch(err => {
        res.send({
            code: 400,
            msg: "获取失败"
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    let data = {};
    for (let i = 0; i < _result.length; ++i) {
        if (!data.hasOwnProperty(_result[i].orderId)) {
            data[_result[i].orderId] = {
                money: 0,
                count: 0,
                items: [],
                time: "",
                status: 0,
                openId: ""
            }
        }
        data[_result[i].orderId].count++;
        data[_result[i].orderId].openId = _result[i].openId;
        data[_result[i].orderId].status = _result[i].status;
        data[_result[i].orderId].name = _result[i].name;
        data[_result[i].orderId].mobile = _result[i].mobile;
        data[_result[i].orderId].address = _result[i].address;
        data[_result[i].orderId].expressId = _result[i].expressId;
        data[_result[i].orderId].courierNum = _result[i].courierNum;
        data[_result[i].orderId].companyName = _result[i].companyName;
        data[_result[i].orderId].money += _result[i].money;
        data[_result[i].orderId].msg = _result[i].msg;
        data[_result[i].orderId].items.push({
            money: _result[i].money,
            num: _result[i].num,
            title: _result[i].title,
            type: _result[i].iType,
            uuid: _result[i].itemId,
            url: _result[i].url
        })
        data[_result[i].orderId].time = utils.formatTimestamp(new Date(_result[i].time).getTime())
    }
    res.send({
        code: 200,
        data: data
    })
})

// $routes /order/addLogistic
// @desc 发货
// @access private , 
router.post('/addLogistic', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { orderId, companyId, expressId, courierNum } = req.body;
    transaction.start().catch(err => { throw err; }); // 开启事务
    let sql = `insert into logistics(companyId,expressId,courierNum)
    values(${companyId},'${expressId}','${courierNum}')`;
    transaction.insert(sql).then(() => {
        return new Promise((resolve, reject) => {
            sql = `update orders set status = 1 where uuid='${orderId}'`;
            // 更新状态
            transaction.insert(sql).then((orderLast) => {
                resolve();
            }).catch((error) => reject(error));
        })
    }).then(() => {
        // 提交事务
        return new Promise((resolve, reject) => {
            transaction.commit().then(() => {
                res.send({
                    code: 200,
                    msg: "成功"
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