<template>
  <el-table
    v-loading="loading"
    :data="logistics"
    height="400"
    border
    style="width: 100%"
  >
    <el-table-column label="序号" width="180">
      <template slot-scope="scope">
        <div>{{ (page - 1) * 20 + scope.$index + 1 }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="快递公司"> </el-table-column>
    <el-table-column prop="symbol" label="编码"> </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="danger" @click="del(scope.$index)" size="mini"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getCompany, delCompany } from "@/api/company";
import Form from "@/common/form";
export default {
  name: "ShowLogistic",
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
      logistics: (state) => state.logistic.logistics,
      page: (state) => state.logistic.page,
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
    // 获取数据
    getData() {
      const params = {
        headers: this.headers,
        page: this.page,
      };
      this.loading = true;
      getCompany(params)
        .then((result) => {
          this.loading = false;
          this.$store.commit("updateLogistics", result.data.data);
          this.$store.commit("updateTotal", result.data.total);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    // 删除物流公司
    del(index) {
      const id = this.logistics[index].id;
      const params = {
        headers: this.headers,
        id: id,
      };
      this.loading = true;
      delCompany(params)
        .then((res) => {
          Form.tips(this, res.data.code, "成功删除");
          this.loading = false;
          this.$store.commit("updatePage", 1);
          this.getData();
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style scoped>
</style>
