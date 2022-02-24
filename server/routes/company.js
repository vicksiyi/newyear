const express = require('express');
const router = express.Router();
const passport = require('passport');
const utils = require('../utils/utils');
const company = require('../model/company');

// $routes /company/getCompany/:page
// @desc 分页获取物流公司
// @access private
router.get('/getCompany/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let page = req.params.page;
    let _reuslt = await company.query(page);
    _reuslt = utils.toJson(_reuslt);
    res.send({
        code: 200,
        companys: _reuslt
    })
})

// $routes /company/getCompanyNum
// @desc 分页获取物流公司个数
// @access private
router.get('/getCompanyNum', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _reuslt = await company.getNum();
    _reuslt = utils.toJson(_reuslt);
    res.send({
        code: 200,
        num: _reuslt[0].num
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
    let _ = await company.insert(name, symbol);
    res.send({
        code: 200,
        msg: '插入成功'
    })
})
module.exports = router;