const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadOss = require('../utils/upload');
const item = require('../model/item');

// 上传商品
// $routes /item/addItem
// @desc 上传商品
// @access private , 
router.post('/addItem', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, type, filename, num, money, status } = req.body;
    const url = await uploadOss.uploadImage(filename); // 上传到OSS获取url;
    const _result = await item.insert(title, type, url, num, money, status).catch(err => {
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

// 获取商品列表，及数量
// $routes /item/getItem/:page
// @desc 获取商品列表,及数量
// @access private , 
router.get('/getItem/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = req.params.page - 1;
    let { filterType, search } = req.query;
    if (filterType === undefined || filterType === '') filterType = -1;
    if (search === undefined) search = '';
    Promise.all([item.query(page, search, filterType), item.getNum(search, filterType)]).then(_result => {
        res.send({
            code: 200,
            total: _result[1][0].num,
            data: _result[0]
        })
    }).catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
})

// 更新商品
// $routes /item/editItem/:uuid
// @desc 更新商品
// @access private
router.post('/editItem', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { uuid, title, type, filename, num, money, status, url } = req.body;
    url = url || await uploadImage(filename); // 上传到OSS获取url;
    const _result = await item.edit(uuid, title, type, url, num, money, status).catch(err => {
        res.send({
            code: 400,
            msg: '更新失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '更新成功'
    })
})
module.exports = router;