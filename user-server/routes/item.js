const express = require('express');
const router = express.Router();
const passport = require('passport');
const item = require('../model/item');
const utils = require('../utils/utils');

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
module.exports = router;