<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="homeImages"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" v-if="homeImages.length < 4"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      homeImages: [
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
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSwiperSuccess(res, file) {
      this.homeImages.push({
        name: res.file,
        url: file.url,
      });
    },
  },
};
</script>

<style scoped>
</style>