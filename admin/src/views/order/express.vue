<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="filter" clearable placeholder="状态筛选">
          <el-option
            v-for="item in filterLists"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="searchType" clearable placeholder="搜索类型">
          <el-option
            v-for="item in searchTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="search" :placeholder="searchLabel"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "express",
  data() {
    return {
      filterLists: [
        {
          value: "1",
          label: "未发货",
        },
        {
          value: "2",
          label: "已发货",
        },
        {
          value: "3",
          label: "已完成",
        },
      ],
      filter: "",
      searchTypes: [
        {
          value: "0",
          label: "订单号",
        },
        {
          value: "1",
          label: "用户ID",
        },
      ],
      searchType: "",
      search: "",
    };
  },
  computed: {
    searchLabel: function () {
      if (this.searchType == "") return "请先选择搜索类型";
      return `请输入${this.searchTypes[this.searchType].label}`;
    }
  },
};
</script>

<style scoped>
</style>