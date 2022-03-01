const express = require('express');
const router = express.Router();
const passport = require('passport');
const page = require('../model/page');
const utils = require('../utils/utils');
const uploadOss = require('../utils/upload');

// $routes /page/add
// @desc 添加图片
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const adminId = req.user.uuid;
    const { filename, type } = req.body;
    const url = await uploadOss.uploadImage(filename); // 上传到OSS获取url;
    const _result = await page.insert(adminId, url, type).catch(err => {
        res.send({
            code: 400,
            msg: '插入失败'
        })
        throw Error(err);
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
    const _result = await page.query().catch(err => {
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
module.exports = router;