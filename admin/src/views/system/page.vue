<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1.5">
        <h1>样式图:</h1>
      </el-col>
      <el-col style="height: 520px; margin-bottom: 20px" :span="6">
        <Phone></Phone>
      </el-col>
      <el-col :span="1.5">
        <h1>数据上传:</h1>
      </el-col>
      <el-col :span="14">
        <el-descriptions title="轮播图">
          <el-descriptions-item>
            <el-row :gutter="20">
              <Swiper></Swiper>
            </el-row>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="首页图">
          <el-descriptions-item>
            <Home></Home>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Phone from "@/components/page/Phone";
import Swiper from "@/components/page/Swiper";
import Home from "@/components/page/Home";
export default {
  name: "page",
  components: { Phone, Swiper, Home },
  data() {
    return {};
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