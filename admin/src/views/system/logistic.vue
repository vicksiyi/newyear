<template>
  <div>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="3">
        <el-button type="primary" @click="addLogistic()" icon="el-icon-plus"
          >添加物流</el-button
        >
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <ShowLogistic :update="update"></ShowLogistic>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination
          :page-size="20"
          :current-page="page"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="pageChange"
        >
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      title="添加公司"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
    >
      <AddLogistic @closeDrawer="closeDrawer"></AddLogistic>
    </el-drawer>
  </div>
</template>

<script>
import AddLogistic from "@/components/Logistic/AddLogistic";
import ShowLogistic from "@/components/Logistic/ShowLogistic";
import { mapState } from "vuex";
export default {
  name: "Logistic",
  components: { AddLogistic, ShowLogistic },
  data() {
    return {
      drawer: false,
      update: false,
      direction: "rtl",
    };
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
      this.update = !this.update;
    },
    addLogistic() {
      this.drawer = true;
    },
    pageChange(page) {
      this.$store.commit("updatePage", page);
      this.update = !this.update;
    },
  },
  computed: {
    ...mapState({
      total: (state) => state.logistic.total,
      page: (state) => state.logistic.page,
    }),
  },
};
</script>

<style scoped>
</style>