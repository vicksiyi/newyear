<template>
  <el-table
    v-loading="loading"
    :data="notices"
    height="400"
    border
    style="width: 100%"
    :default-sort="{ prop: 'startTime', order: 'descending' }"
  >
    <el-table-column sortable prop="startTime" label="时间" width="180">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180"> </el-table-column>
    <el-table-column prop="content" label="内容"> </el-table-column>
    <el-table-column sortable prop="endTime" label="结束时间" width="180">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag
          v-if="scope.row.status === 1"
          :type="showType(scope.row.startTime, scope.row.endTime)"
        >
          {{ showLabel(scope.row.startTime, scope.row.endTime) }}
        </el-tag>
        <el-tag v-else type="info"> 已撤回 </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.status == 1"
          type="danger"
          @click="recall(scope.row.id, 0)"
          size="mini"
          :disabled="
            show(scope.row.startTime, scope.row.endTime) === 2 ? true : false
          "
          >撤回</el-button
        >

        <el-button
          v-else
          type="success"
          @click="recall(scope.row.id, 1)"
          size="mini"
          >显示</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { get, update } from "@/api/notice";
import { formatTimestamp } from "@/common/time";
export default {
  name: "Show",
  props: {
    update: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    update(res) {
      this.getData();
    },
    page() {
      this.getData();
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      notices: (state) => state.notice.notices,
      page: (state) => state.notice.page,
      total: (state) => state.notice.total,
    }),
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getData() {
      const params = {
        headers: this.headers,
        page: this.page,
      };
      this.loading = true;
      get(params)
        .then((result) => {
          this.loading = false;
          result.data.notices.map((values) => {
            values.startTime = formatTimestamp(values.startTime);
            values.endTime = formatTimestamp(values.endTime);
          });
          this.$store.commit("updateNotice", result.data.notices);
          this.$store.commit("updateTotal", result.data.total);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    show(startTime, endTime) {
      let time = new Date().getTime();
      startTime = new Date(startTime).getTime();
      endTime = new Date(endTime).getTime();
      if (time < startTime) return 0;
      else if (time > startTime && time < endTime) return 1;
      else return 2;
    },
    showType(startTime, endTime) {
      const type = this.show(startTime, endTime);
      if (type === 0) return "";
      else if (type === 1) return "success";
      else return "warning";
    },
    showLabel(startTime, endTime) {
      const type = this.show(startTime, endTime);
      if (type === 0) return "待公告";
      else if (type === 1) return "公告中";
      else return "已公告";
    },
    recall(id, status) {
      const params = {
        headers: this.headers,
        status: status,
        id: id,
      };
      update(params)
        .then((result) => {
          this.$message({
            type: "success",
            message: "更新完成",
          });
          this.getData();
          this.$emit("updateLast");
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
  },
  mounted: function () {
    this.getData();
  },
};
</script>


<style scoped>
</style>
