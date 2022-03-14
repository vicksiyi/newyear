const express = require('express');
const router = express.Router();
const passport = require('passport');
const notice = require('../model/notice');
const utils = require('../utils/utils');

// $routes /notice/getNotice
// @desc 获取公告
// @access private
router.get('/getNotice', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await notice.getLast().catch(err => {
        res.send({
            code: 400,
            msg: '查询失败'
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        notice: _result[0]
    })
})
module.exports = router;