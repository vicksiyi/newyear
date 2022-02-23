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
      <el-table :data="localhosts" height="400" border style="width: 100%">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            <div>{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="快递公司"> </el-table-column>
        <el-table-column prop="code" label="编码"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      title="添加公司"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
    >
      <AddLogistic></AddLogistic>
    </el-drawer>
  </div>
</template>

<script>
import AddLogistic from "@/components/System/AddLogistic";
export default {
  name: "Logistic",
  components: { AddLogistic },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      localhosts: [
        {
          name: "顺丰",
          code: "SF",
        },
        {
          name: "壹米滴答",
          code: "YIMIDIDA",
        },
        {
          name: "顺丰",
          code: "SF",
        },
        {
          name: "壹米滴答",
          code: "YIMIDIDA",
        },
        {
          name: "顺丰",
          code: "SF",
        },
        {
          name: "壹米滴答",
          code: "YIMIDIDA",
        },
        {
          name: "顺丰",
          code: "SF",
        },
        {
          name: "壹米滴答",
          code: "YIMIDIDA",
        },
        {
          name: "顺丰",
          code: "SF",
        },
        {
          name: "壹米滴答",
          code: "YIMIDIDA",
        },
      ],
    };
  },
  methods: {
    addLogistic() {
      this.drawer = true;
    },
  },
};
</script>

<style scoped>
</style>