<template>
  <div>
    <el-upload
      name="image"
      class="avatar-uploader"
      :headers="headers"
      :action="action"
      :show-file-list="false"
      :on-change="handleChange"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUploadImage"
    >
      <img v-if="url" :src="url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <el-progress v-if="showProcess" :percentage="percentage"></el-progress>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/common/upload";
export default {
  name: "AvatarUpload",
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      action: "http://localhost:8080/api/upload/images",
      filename: "",
      showProcess: false,
      percentage: 0,
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
      this.$emit("changeFileName", res.file, this.url);
    },
    beforeUploadImage(file) {
      Upload.beforeUploadLimitImage(this, file);
    },
    handleChange(file) {
      if (file.status === "ready") {
        this.percentage = 0;
        this.showProcess = true;
        const interval = setInterval(() => {
          if (this.percentage >= 99) {
            clearInterval(interval);
            return;
          }
          this.percentage += 1;
        }, 20);
      }
      if (file.status === "success") {
        this.percentage = 100;
        this.showProcess = false;
      }
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
