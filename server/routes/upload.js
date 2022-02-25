const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const check = require('../utils/check');
const file = require('../utils/file');
const uploadOss = require('../utils/upload');
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
router.post('/images', upload.single('images'), passport.authenticate('jwt', { session: false }), (req, res) => {
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

// 上传OSS测试
// $routes /upload/test
// @desc 上传OSS测试
// @access private
// router.post('/test', (req, res) => {
//     const date = new Date();
//     const filename = req.body.filename;
//     const filepath = `${__dirname}/temp/${filename}`;
//     const distpath = `/images/tests/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/${filename}`;
//     // 上传到OSS
//     uploadOss.addFile(filepath, distpath).then((url) => {
//         file.delFile(filepath); //删除缓存文件
//         res.send({
//             code: 200,
//             url: url
//         })
//     }).catch(err => {
//         res.send({
//             code: 400,
//             msg: "文件过时,请重新上传"
//         })
//         throw Error(err);
//     });
// })
module.exports = router;