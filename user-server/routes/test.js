const express = require('express');
const router = express.Router();

// $routes /test/test
// @desc 测试
// @access private
router.post('/test', (req, res) => {
    res.send({
        msg: '成功'
    })
})
module.exports = router;