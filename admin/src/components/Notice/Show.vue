<template>
  <el-table
    v-loading="loading"
    :data="notices"
    height="400"
    border
    style="width: 100%"
  >
    <el-table-column prop="startTime" sort label="时间" width="180">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180"> </el-table-column>
    <el-table-column prop="content" label="内容"> </el-table-column>
    <el-table-column prop="endTime" label="结束时间" width="180">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag
          v-if="!isShow(scope.row.startTime, scope.row.endTime)"
          :type="scope.row.status === 1 ? '' : 'info'"
        >
          {{ scope.row.status | filterStatus }}
        </el-tag>
        <el-tag v-else type="success"> 公告中 </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template>
        <el-button type="warning" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">撤回</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { get } from "@/api/notice";
import { formatTimestamp } from "@/common/time";
import Form from "@/common/form";
export default {
  name: "Show",
  props: {
    update: {
      type: Boolean,
      default: false,
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
      isEdit: (state) => state.notice.isEdit,
    }),
  },
  watch: {
    update(res) {
      this.getData();
    },
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
    isShow(startTime, endTime) {
      let time = new Date().getTime();
      startTime = new Date(startTime).getTime();
      endTime = new Date(endTime).getTime();
      return time > startTime && time < endTime;
    }
  },
  mounted: function () {
    this.getData();
  },
  filters: {
    filterStatus(index) {
      const status = ["已撤回", "待公告"];
      return status[index];
    },
  },
};
</script>


<style scoped>
</style>
