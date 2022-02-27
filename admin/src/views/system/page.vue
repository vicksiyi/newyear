<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1.5">
        <h1>样式图:</h1>
      </el-col>
      <el-col style="height: 520px; margin-bottom: 20px" :span="6">
        <div class="phone">
          <div class="content">
            <div class="top">
              <img class="top-img" src="@/assets/swiper-top.png" alt="" />
            </div>
            <div>
              <el-carousel
                trigger="click"
                indicator-position="none"
                height="100px"
              >
                <el-carousel-item v-for="item in swipers" :key="item.id">
                  <img class="carousel-img" :src="item.url" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="shopping">开始选购吧!</div>
            <div class="center">
              <div class="item">
                <img class="item-img" src="../../assets/1.jpg" alt="" />
              </div>
              <div class="item">
                <img class="item-img" src="../../assets/2.jpg" alt="" />
              </div>
              <div class="item">
                <img class="item-img" src="../../assets/3.jpg" alt="" />
              </div>
              <div class="item">
                <img class="item-img" src="../../assets/4.jpg" alt="" />
              </div>
            </div>
            <div class="bottom">
              <!-- <img class="bottom-img" src="@/assets/bottom.png" alt="" /> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="1.5">
        <h1>数据上传:</h1>
      </el-col>
      <el-col :span="14">
        <el-descriptions title="轮播图">
          <el-descriptions-item>
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
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="首页图">
          <el-descriptions-item>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :file-list="homeImages"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "page",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      swipers: [
        {
          name: "",
          url: "http://localhost:8080/static/img/swiper.e00c62c.jpg",
        },
      ],
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
    }
  },
};
</script>

<style scoped>
.phone {
  margin: 0 20px 0;
  background-image: url("../../assets/phone.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
  padding: 60px 16px;
  box-sizing: border-box;
  width: 240px;
}
.phone .content {
  width: 100%;
  height: 380px;
  background: #fff;
  position: relative;
}
.phone .content .top-img {
  width: 100%;
  height: 80px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.phone .content .carousel-img {
  height: 100px;
}
.phone .content .center .item {
  float: left;
  width: 68px;
  height: 68px;
  margin-left: 23px;
  margin-top: 5px;
}
.phone .content .center .item-img {
  width: 68px;
  height: 68px;
}
.phone .content .bottom {
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  background-image: url("../../assets/bottom.png");
  background-repeat: no-repeat;
  background-size: 100%;
  box-sizing: border-box;
}
.phone .content .shopping {
  padding: 5px;
  width: 80px;
  height: 10px;
  margin: 4px auto;
  background: #d8322e;
  color: #fff;
  border-radius: 10px;
  text-align: center;
}
</style>