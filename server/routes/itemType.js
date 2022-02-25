const express = require('express');
const router = express.Router();
const passport = require('passport');
const itemType = require('../model/itemType');

// 上传商品类别
// $routes /itemType/addItemType
// @desc 上传商品类别
// @access private , 
router.post('/addItemType', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const title = req.body.title;
    const _result = await itemType.insert(title).catch(err => {
        res.send({
            code: 400,
            msg: '插入类别失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '插入成功'
    })
})

// 获取商品类别列表
// $routes /itemType/getItemType
// @desc 获取商品类别列表
// @access private , 
router.get('/getItemType', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const _result = await itemType.query().catch(err => {
        res.send({
            code: 400,
            msg: '获取类别失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        data: _result
    })
})

// 下架商品类别[设置状态]
// $routes /itemType/delItemType/:id
// @desc 下架商品类别
// @access private
router.put('/downItemType/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;
    const _result = await itemType.putDown(id).catch(err => {
        res.send({
            code: 400,
            msg: '下架类别失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '下架成功'
    })
})

// 上架商品类别[设置状态]
// $routes /itemType/upItemType/:id
// @desc 上架商品类别
// @access private
router.put('/upItemType/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;
    const _result = await itemType.putUp(id).catch(err => {
        res.send({
            code: 400,
            msg: '上架类别失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '上架成功'
    })
})

// 交换优先级
// $routes /itemType/swapItemType
// @desc 交换优先级
// @access private
router.put('/swapItemType', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id1, id2 } = req.body;
    const _result = await itemType.swap(id1,id2).catch(err => {
        res.send({
            code: 400,
            msg: '交换优先级失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '成功交换'
    })
})

module.exports = router;