const express = require('express');
const router = express.Router();
const passport = require('passport');
const page = require('../model/page');
const utils = require('../utils/utils');

// $routes /page/getPage
// @desc 获取首页轮播图&图片
// @access private
router.get('/getPage', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await page.query().catch(err => {
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