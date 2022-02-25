const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const check = require('../utils/check');
const file = require('../utils/file');
const upload = multer({
    dest: __dirname + '/temp',
    limits: {
        fieldSize: 2 * 1024 * 1024 // 2 MB
    }
})

// 上传图片
// $routes /upload/images
// @desc 图片保存[缓存]
// @access private , passport.authenticate('jwt', { session: false })
router.post('/images', upload.single('image'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const mimetype = req.file.mimetype;
    const filepath = req.file.path;
    if (!check.isImage(mimetype)) { // 图片类型限制
        file.delFile(filepath).then(() => {
            res.send({
                code: 400,
                msg: '上传类型只能是png/jpeg'
            })
        }).catch(err => { throw Error(err) });  // 删除缓存文件
        return;
    }
    const suffix = req.file.originalname.split(".").at(-1); // 后缀
    const filename = `${req.file.filename}.${suffix}`;
    file.renameFile(filepath, `${__dirname}/temp/${filename}`).then(() => {
        res.send({
            code: 200,
            file: filename
        })
    }).catch(err => { throw Error(err) });
})
module.exports = router;