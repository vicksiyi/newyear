<template>
  <el-upload
    name="image"
    class="avatar-uploader"
    :headers="headers"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeUploadImage"
  >
    <img v-if="url" :src="url" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/common/upload";
export default {
  name: "AvatarUpload",
  data() {
    return {
      action: "http://localhost:8080/api/upload/images",
      url: "",
      filename: "",
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.url = URL.createObjectURL(file.raw);
      this.filename = res.file;
      console.log(this.url);
      this.$emit("changeFileName", res.file, this.url);
    },
    beforeUploadImage(file) {
      Upload.beforeUploadLimitImage(this, file);
    },
  },
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
