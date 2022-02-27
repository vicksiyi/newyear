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
      <el-table :data="companys" height="400" border style="width: 100%">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            <div>{{ scope.$index + 1 }}</div>
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
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination background layout="prev, pager, next" :total="num">
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
import AddLogistic from "@/components/System/AddLogistic";
import { mapGetters } from "vuex";
import { getCompany, getCompanyNum, delCompany } from "@/api/company";
import Loading from "@/common/loading";
export default {
  name: "Logistic",
  components: { AddLogistic },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      companys: [],
      num: 0,
    };
  },
  methods: {
    closeDrawer() {
      this.getData();
      this.drawer = false;
    },
    addLogistic() {
      this.drawer = true;
    },
    getData() {
      const params = {
        headers: this.headers,
        page: 0,
      };
      const loading = Loading.start(this);
      Promise.all([getCompany(params), getCompanyNum(params)])
        .then((result) => {
          Loading.end(loading);
          if (result[0].data.code === 200 && result[1].data.code === 200) {
            this.companys = result[0].data.companys;
            this.num = result[1].data.num;
          }
        })
        .catch((err) => {
          Loading.end(loading);
        });
    },
    // 删除物流公司
    del(index) {
      const id = this.companys[index].id;
      const params = {
        headers: this.headers,
        id: id,
      };
      delCompany(params)
        .then(() => {
          this.$message({
            message: "成功删除",
            type: "success",
          });
          this.getData();
        })
        .catch((err) => {
          this.$message.error("未知错误");
        });
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  mounted: async function () {
    this.getData();
  },
};
</script>

<style scoped>
</style>