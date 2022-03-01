<template>
  <el-upload
    name="image"
    action="http://localhost:8080/api/upload/images"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :headers="headers"
    :before-upload="beforeUploadLimit"
    :on-success="handleSwiperSuccess"
    :on-remove="handleRemove"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>
<script>
import { mapGetters } from "vuex";
import Upload from "@/common/upload";
export default {
  name: "Swiper",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      swipers: [],
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
    handleSwiperSuccess(res, file) {
      this.swipers.push({
        name: res.file,
        url: file.url,
      });
    },
    beforeUploadLimit(file) {
      return (
        Upload.beforeUploadLimitImage(this, file) &&
        Upload.beforeUploadLimitLength(this, this.swipers, 8)
      );
    },
  },
};
</script>

<style scoped>
</style>