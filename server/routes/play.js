const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadOss = require('../utils/upload');
const item = require('../model/item');
const redisHandle = require("../utils/redis");
const utils = require("../utils/utils");

// $routes /play/getNotPlay
// @desc 获取未支付订单
// @access private , 
router.get('/getNotPlay', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await redisHandle.getKeys('mini:noPlay:*');
    let data = [];
    for (let i = 0; i < _result.length; ++i) {
        let _data = { money: 0, count: 0, items: [] };
        let _temp = await redisHandle.getKey(_result[i]);
        _temp = JSON.parse(_temp);
        for (const key in _temp) {
            _data.money += _temp[key].money;
            _data.count++;
            _data.items.push(_temp[key]);
        }
        _data.openId = _result[i].split(":")[2];
        _data.time = utils.formatTimestamp(parseInt(_result[i].split(":")[_result[i].split(":").length - 1]));
        data.push(_data);
    }
    res.send({
        code: 200,
        data: data
    })
})
module.exports = router;