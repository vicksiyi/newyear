<template>
  <div id="home">
    <el-container>
      <el-aside style="width: auto"><CommonAside></CommonAside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main>
          <div class="tab">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="item in tag"
                :key="item.path"
                :to="{ path: item.path  }"
                >{{item.label}}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
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
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { Header, Footer, CommonAside },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabLists,
    }),
  },
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
.tab {
  margin-bottom: 20px;
}
</style>
