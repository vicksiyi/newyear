const express = require('express');
const router = express.Router();
const passport = require('passport');
const addressHandle = require('../model/address');
const utils = require('../utils/utils');

// $routes /address/add
// @desc 添加地址
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, mobile, address } = req.body;
    const openId = req.user.openId;
    addressHandle.insert(openId, name, mobile, address).catch(err => {
        res.send({
            code: 400,
            msg: '添加失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: "添加成功"
    })
})

// $routes /address/get
// @desc 获取地址
// @access private
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const openId = req.user.openId;
    let _result = addressHandle.query(openId).catch(err => {
        res.send({
            code: 400,
            msg: '查询失败'
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        data: _result
    })
})
module.exports = router;