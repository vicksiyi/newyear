<template>
  <div class="phone">
    <div class="content">
      <div class="top">
        <img class="top-img" src="@/assets/swiper-top.png" alt="" />
      </div>
      <div>
        <el-carousel trigger="click" indicator-position="none" height="100px">
          <el-carousel-item v-for="item in swipers" :key="item.id">
            <img class="carousel-img" :src="item.url" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="shopping">开始选购吧!</div>
      <div class="center">
        <div v-for="item in pages" :key="item.id" class="item">
          <img class="item-img" :src="item.url" alt="" />
        </div>
      </div>
      <div class="bottom">
        <!-- <img class="bottom-img" src="@/assets/bottom.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Phone",
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      images: (state) => state.page.images,
    }),
    swipers() {
      return this.images.filter((item) => item.type === 0);
    },
    pages() {
      return this.images.filter((item, val) => {
        return item.type === 1;
      }).slice(0,4);
    },
  },
  methods: {}
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
  width: 100%;
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