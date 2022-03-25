const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../model/item');
const utils = require('../utils/utils');
const redisHandle = require('../utils/redis');

// $routes /item/getItems
// @desc 获取所有商品
// @access private
router.get('/getItems', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await item.query().catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        data: _result
    })
})

// $routes /item/getType
// @desc 获取获取所有商品列表
// @access private
router.get('/getType', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await item.getType().catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        data: _result
    })
})

// $routes /item/noplay
// @desc 添加到预支付订单{redis缓存}
// @access private
router.post('/noplay', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const cards = req.body.cards;
    const openId = req.user.openId;
    if (typeof cards !== 'string' && JSON.parse(cards)) {
        res.send({
            code: 400,
            msg: '格式错误'
        })
    }
    else if (cards === "{}") {
        res.send({
            code: 400,
            msg: '不能为空'
        })
    }
    else redisHandle.setTtlKey(`mini:noPlay:${openId}:cards:${new Date().getTime()}`, cards).then((key) => {
        res.send({ code: 200, key: key });
    }).catch(err => {
        res.send({ code: 400, msg: '未知错误' })
    });
})

// $routes /item/getPlay
// @desc 获取未支付订单详情
// @access private
router.get('/getPlay/:key', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const key = req.params.key;
    const detail = await redisHandle.getKey(key).catch(err => {
        res.send({ code: 400, msg: '未知错误' })
        throw Error(err);
    });
    const ttl = await redisHandle.getTtlKey(key).catch(err => {
        res.send({ code: 400, msg: '未知错误' })
        throw Error(err);
    });
    const date = new Date().getTime();
    const time = parseInt(key.split(":")[key.split(":").length - 1]);
    res.send({
        code: 200,
        data: { detail:JSON.parse(detail), ttl, date, time }
    })
})
module.exports = router;