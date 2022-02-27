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
}

export default new Upload();