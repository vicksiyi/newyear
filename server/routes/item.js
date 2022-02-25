const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadOss = require('../utils/upload');
const item = require('../model/item');
const file = require('../utils/file');

// 上传图片到OSS
function uploadImage(filename) {
    const date = new Date();
    const filepath = `${__dirname}/temp/${filename}`;
    const distpath = `/images/item/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/${filename}`;
    // 上传到OSS
    return new Promise((resolve, reject) => {
        uploadOss.addFile(filepath, distpath).then((url) => {
            file.delFile(filepath); //删除缓存文件
            resolve(url);
        }).catch(err => reject(err));
    })
}
// 上传商品
// $routes /item/addItem
// @desc 上传商品
// @access private , 
router.post('/addItem', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, typeId, filename, num, money, status } = req.body;
    const url = uploadImage(filename); // 上传到OSS获取url;
    const _result = await item.insert(title, typeId, url, num, money, status).catch(err => {
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

// 获取商品列表
// $routes /item/getItem/:page
// @desc 获取商品列表
// @access private , 
router.get('/getItem/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = req.body.page;
    const _result = await item.query(page).catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        data: _result
    })
})

// 上架商品[设置状态]
// $routes /item/upItem
// @desc 上架商品
// @access private
router.put('/upItem/:uuid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const uuid = req.params.uuid;
    const _result = await item.putUp(uuid).catch(err => {
        res.send({
            code: 400,
            msg: '上架失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '上架成功'
    })
})

// 下架商品[设置状态]
// $routes /item/downItem/:uuid
// @desc 下架商品
// @access private
router.put('/downItem/:uuid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const uuid = req.params.uuid;
    const _result = await item.putDown(uuid).catch(err => {
        res.send({
            code: 400,
            msg: '下架失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '下架成功'
    })
})

// 更新商品
// $routes /item/editItem/:uuid
// @desc 更新商品
// @access private
router.put('/editItem/:uuid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const uuid = req.params.uuid;
    const { title, typeId, filename, num, money, status } = req.body;
    const url = uploadImage(filename); // 上传到OSS获取url;
    const _result = await item.edit(uuid, title, typeId, url, num, money, status).catch(err => {
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