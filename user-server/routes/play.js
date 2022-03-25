const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../model/item');
const utils = require('../utils/utils');
const redisHandle = require('../utils/redis');

// $routes /item/getNotPlay
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
        _result = Object.assign(_result, { key:keys[i],time: parseInt(keys[i].split(":")[keys[i].split(":").length - 1]), ttl: _ttl, date: new Date().getTime() });
        result.push(_result);
    }
    res.send({
        code: 200,
        data: result
    });
})

// $routes /item/playDone
// @desc 支付完成处理
// @access private
router.post('/playDone', passport.authenticate('jwt', { session: false }), async (req, res) => {

})
module.exports = router;