const express = require('express');
const router = express.Router();
const passport = require('passport');
const notice = require('../model/notice');
const utils = require('../utils/utils');

// $routes /notice/add
// @desc 添加公告
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, content, startTime, endTime } = req.body;
    const _result = await notice.insert(title, content, startTime, endTime).catch(err => {
        res.send({
            code: 400,
            msg: "插入失败"
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '成功插入'
    })
})

// $routes /notice/update
// @desc 变换状态
// @access private
router.put('/update/:id/:status', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id, status } = req.params;
    const _result = await notice.update(id, status).catch(err => {
        res.send({
            code: 400,
            msg: "更新失败"
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '更新成功'
    })
})

// $routes /notice/get
// @desc 查询公告
// @access private
router.get('/get/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = req.params.page - 1;
    let _result = await notice.query(page).catch(err => {
        res.send({
            code: 400,
            msg: "获取失败"
        })
        throw Error(err);
    });
    let _total = await notice.getNum().catch(err => {
        res.send({
            code: 400,
            msg: "获取失败"
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        notices: _result,
        total: _total[0].total
    })
})
module.exports = router;