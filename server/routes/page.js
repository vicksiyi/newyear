const express = require('express');
const router = express.Router();
const passport = require('passport');
const page = require('../model/page');
const utils = require('../utils/utils');
const uploadOss = require('../utils/upload');
const file = require('../utils/file');
const trasaction = require('../model/transaction');

// $routes /page/add
// @desc 添加图片[事务处理]
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const adminId = req.user.uuid;
    const { files, type } = req.body; // 获取图片类型
    trasaction.start().catch(err => { throw err; }); // 开启事务
    for (let i = 0; i < files.length; i++) {
        const url = await uploadOss.uploadImage(files[i]); // 上传到OSS获取url;
        const sql = `insert into images(adminId,url,type) values('${adminId}','${url}',${type});`;
        trasaction.insert(sql).catch(err => {
            res.send({
                code: 400,
                msg: '插入失败'
            })
            trasaction.rollback(err);
        });
    }
    // 提交事务
    trasaction.commit().catch(err => {
        res.send({
            code: 400,
            msg: '插入失败'
        })
        trasaction.rollback(err);
    });
    res.send({
        code: 200,
        msg: '成功插入'
    })
})

// $routes /page/get
// @desc 获取图片
// @access private
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let _result = await page.query().catch(err => {
        res.send({
            code: 400,
            msg: '插入失败'
        })
        throw Error(err);
    });
    _result = utils.toJson(_result);
    res.send({
        code: 200,
        data: _result
    })
})

// $routes /page/del
// @desc 删除图片
// @access private
router.delete('/del/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const id = req.params.id;
    let _result = await page.del(id).catch(err => {
        res.send({
            code: 400,
            msg: '删除失败'
        })
        throw Error(err);
    });
    res.send({
        code: 200,
        msg: '删除成功'
    })
})
module.exports = router;