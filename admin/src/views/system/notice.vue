<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-alert
          description="在这里你可以选择到自己满意的春联饰品，欢迎光临"
          type="warning"
        >
          <h1 slot="title">当前公告</h1>
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
      <el-table :data="tableData" height="400" border style="width: 100%">
        <el-table-column prop="date" sort label="通知时间" width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column prop="endTime" label="通知时长" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="warning" size="mini">编辑</el-button>
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
      title="添加公告"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
      ><Submit></Submit>
    </el-drawer>
  </div>
</template>

<script>
import Submit from "@/components/System/Submit";
export default {
  name: "notice",
  components: { Submit },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      tableData: [
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
        {
          date: "2022-01-03 20:00:00",
          title: "用户须知",
          content: "在这里你可以选择到自己满意的春联饰品，欢迎光临",
          endTime: "1天3个小时",
          status: "正在公告",
        },
      ],
    };
  },
  methods: {
    addNotice() {
      this.drawer = true;
    },
  },
};
</script>

<style scoped>
</style>