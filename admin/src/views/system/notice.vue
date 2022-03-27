<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" v-loading="loading">
        <el-alert
          :description="`${notice.title}--${notice.content}`"
          type="warning"
        >
          <h1 slot="title">当前公告[注:如果有多条公告，只显示最新的一条]</h1>
        </el-alert>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="3">
        <el-button type="primary" @click="addNotice()" icon="el-icon-plus"
          >添加公告</el-button
        >
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <Show :update="update" @updateLast="updateLast"></Show>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination
          :page-size="20"
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      title="添加公告"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
      ><Submit @closeDrawer="closeDrawer"></Submit>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getLast } from "@/api/notice";
import Submit from "@/components/Notice/Submit";
import Show from "@/components/Notice/Show";
export default {
  name: "notice",
  components: { Submit, Show },
  watch: {
    update() {
      this.getLast();
    },
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      update: false,
      loading: false,
      notice: "",
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      total: (state) => state.notice.total,
    }),
  },
  methods: {
    addNotice() {
      this.drawer = true;
    },
    getLast() {
      const params = {
        headers: this.headers,
      };
      this.loading = true;
      getLast(params)
        .then((result) => {
          this.loading = false;
          this.notice = result.data.notice ? result.data.notice : {title:"暂无",content:"暂无"};
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    closeDrawer() {
      this.drawer = false;
      this.updateLast();
    },
    updateLast(){
      this.update = !this.update;
    },
    pageChange(page) {
      this.$store.commit("updatePage", page);
    },
  },
  mounted() {
    this.getLast();
  },
};
</script>

<style scoped>
</style>