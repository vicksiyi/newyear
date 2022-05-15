const express = require('express');
const router = express.Router();
const passport = require('passport');
const utils = require('../utils/utils');
const company = require('../model/company');

// $routes /company/getCompany/:page
// @desc 分页获取物流公司
// @access private
router.get('/getCompany/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let page = req.params.page - 1;
    let _reuslt = await company.query(page).catch(err => {
        res.send({
            code: 400,
            msg: '重复添加'
        })
    })
    _reuslt = utils.toJson(_reuslt);
    let _total = await company.getNum().catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
    });
    _total = utils.toJson(_total);  // 获取总数
    res.send({
        code: 200,
        data: _reuslt,
        total: _total[0].num
    })
})

// $routes /company/delCompany/:id
// @desc 删除物流公司
// @access private
router.delete('/delCompany/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let id = req.params.id;
    let _ = await company.delete(id);
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

// $routes /company/addCompany
// @desc 添加物流公司物流公司
// @access private
router.post('/addCompany', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let name = req.body.name;
    let symbol = req.body.symbol;
    let _result = await company.getCompany(name, symbol);
    _result = utils.toJson(_result);
    if (_result[0].num > 0) {
        res.send({ code: 400, msg: '不能重复插入' })
        return;
    }
    let _ = await company.insert(name, symbol);
    res.send({ code: 200, msg: '插入成功' })
})
module.exports = router;