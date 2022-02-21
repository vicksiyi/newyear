<template>
  <div id="home">
    <el-container>
      <el-aside style="width: auto"><CommonAside></CommonAside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer><Footer></Footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommonAside from "@/components/Home/CommonAside";
export default {
  name: "Home",
  components: { Header, Footer, CommonAside },
};
</script>
<style scoped>
.header {
  height: 60px;
}
.el-header {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>
