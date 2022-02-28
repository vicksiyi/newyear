//页面加载
class Form {
    // 验证表单
    validate(_this, formName) {
        return new Promise((resolve, reject) => {
            _this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    resolve(true);
                } else {
                    resolve(false);
                    return false;
                }
            });
        });
    }
    // 根据状态 提示
    tips(_this, code, msg = "") {
        if (code === 200) {
            _this.$message({
                message: msg ? msg : '成功',
                type: "success",
            });
        } else _this.$message.error(msg);
    }
}

export default new Form();