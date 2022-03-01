<template>
  <div>
    <el-upload
      name="image"
      action="http://localhost:8080/api/upload/images"
      list-type="picture-card"
      :file-list="swipers"
      :on-preview="handlePictureCardPreview"
      :headers="headers"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSwiperSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Swiper",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      swipers: [
        {
          name: "",
          url: "http://localhost:8080/static/img/1.e12286e.jpg",
        },
        {
          name: "",
          url: "http://localhost:8080/static/img/2.e476cfc.jpg",
        },
        {
          name: "",
          url: "http://localhost:8080/static/img/3.53ee0df.jpg",
        },
        {
          name: "",
          url: "http://localhost:8080/static/img/4.2eb1bd9.jpg",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadProgress(event, res, fileList) {
      console.log(event, res, fileList);
    },
    handleSwiperSuccess(res, file) {
      this.swipers.push({
        name: res.file,
        url: file.url,
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
</style>