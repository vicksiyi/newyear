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
    const { title, type, filename, num, money, status } = req.body;
    const url = await uploadImage(filename); // 上传到OSS获取url;
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

// 获取商品列表
// $routes /item/getItem/:page
// @desc 获取商品列表
// @access private , 
router.get('/getItem/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = req.params.page - 1;
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

// 获取商品总数量
// $routes /item/getNum
// @desc 获取商品总数量
// @access private
router.get('/getNum', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const _result = await item.getNum().catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        total: _result[0].num
    })
})

// 类别筛选
// $routes /item/getFilterItem
// @desc 类别筛选
// @access private
router.get('/getFilterItem/:typeId/:page', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const page = req.params.page - 1, typeId = req.params.typeId;
    const _result = await item.query(page, true, typeId).catch(err => {
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

// 类别筛选 商品数量
// $routes /item/getFilterNum
// @desc 类别筛选 商品数量
// @access private
router.get('/getFilterNum/:typeId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const typeId = req.params.typeId;
    const _result = await item.getNum(true, typeId).catch(err => {
        res.send({
            code: 400,
            msg: '获取失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        total: _result[0].num
    })
})

// 模糊查询
// $routes /item/search/:key
// @desc 模糊查询
// @access private
router.get('/search/:key', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const key = req.params.key;
    const _result = await item.search(key).catch(err => {
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
module.exports = router;