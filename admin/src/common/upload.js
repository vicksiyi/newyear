class Upload {
    beforeUploadLimitImage(_this, file) {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            _this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        }
        if (!isLt2M) {
            _this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
    }
    // 限制上传列表的长度
    beforeUploadLimitLength(_this, filelist, limitLen) {
        const length = filelist.length;
        const isLen = length >= limitLen;
        if (isLen) {
            _this.$message.error(`上传不可以超过${limitLen}张图片`);
        }
        return !isLen;
    }
}

export default new Upload();