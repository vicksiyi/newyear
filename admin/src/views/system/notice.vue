<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-alert
          description="在这里你可以选择到自己满意的春联饰品，欢迎光临"
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
      <Show :update="update"></Show>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination background layout="prev, pager, next" :total="total">
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
import { mapState } from "vuex";
import Submit from "@/components/Notice/Submit";
import Show from "@/components/Notice/Show";
export default {
  name: "notice",
  components: { Submit, Show },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      update: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      total: (state) => state.notice.total,
    }),
  },
  methods: {
    addNotice() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
      this.update = !this.update;
    },
  },
};
</script>

<style scoped>
</style>