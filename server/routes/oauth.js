const express = require('express');
const router = express.Router();
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('../utils/request');
const keys = require('../config/keys');
const utils = require('../utils/utils');
const admin = require('../model/admin');

const jwtToken = function (rule) {
    return new Promise((resolve, reject) => {
        jwt.sign(rule, keys.secretUser, { expiresIn: 3600 }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        })
    })
}
// $routes /oauth/login
// @desc 登录
// @access private
router.post('/login', async (req, res) => {
    const account = req.body.account;
    const password = md5(account + req.body.password);
    let _result = await admin.queryAccount(account);
    _result = utils.toJson(_result);
    // 验证是否存在
    if (_result.length !== 0) {
        // 验证密码
        if (_result[0].password !== password) {
            res.send({
                code: 401,
                msg: '密码错误'
            })
        } else {
            const rule = { uuid: _result[0].uuid };
            let token = await jwtToken(rule);
            res.send({
                code: 200,
                type: 'success',
                token: 'Bearer ' + token
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '管理员不存在'
        })
    }
})
module.exports = router;