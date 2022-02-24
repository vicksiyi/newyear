const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('../utils/request');
const keys = require('../config/keys');
const user = require('../model/user');
const utils = require('../utils/utils');

// 验证Code & 获取openId
const oauthCode = function (code) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${keys.APPID}&secret=${keys.SECRET}&js_code=${code}&grant_type=authorization_code`;
    return new Promise((resolve, reject) => {
        axios.get({ url }).then(res => {
            resolve(res);
        }).catch(err => { reject(err); })
    })
}

const jwtToken = function (rule) {
    return new Promise((resolve, reject) => {
        jwt.sign(rule, keys.secretUser, { expiresIn: 3600 }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        })
    })
}

// $routes /oauth/getToken/:code
// 获取Token
// @access public
router.get('/getToken/:code', async (req, res) => {
    const code = req.params.code;
    const _result = await oauthCode(code);
    if (_result.openid) {
        const rule = { openId: _result.openid };
        jwtToken(rule).then(async token => {
            let result = utils.toJson(await user.query(_result.openid));
            if (result.length == 0) {
                // 如果用户不存在，插入用户
                let _ = await user.insert(_result.openid);
            }
            res.json({
                code: 200,
                type: 'success',
                token: 'Bearer ' + token
            })
        }).catch(err => {
            throw new Error(err);
        })
    }
    else res.send({
        code: 400,
        msg: 'code失效'
    });
})

// $routes /oauth/oauthToken
// 验证token
// @access public
router.get('/oauthToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        code: 200
    })
})
module.exports = router;