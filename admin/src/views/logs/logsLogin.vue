<template>
  <div>
    <el-row :gutter="20">
      <el-table :data="logs" :height="400" border style="width: 100%">
        <el-table-column prop="time" sortable label="登录时间" width="180">
        </el-table-column>
        <el-table-column prop="account" label="登录账号" width="180">
        </el-table-column>
        <el-table-column prop="device" label="登录设备" width="180">
        </el-table-column>
        <el-table-column prop="address" label="登录位置" width="180">
        </el-table-column>
        <el-table-column prop="ip" label="IP地址"> </el-table-column>
        <el-table-column label="登录状态">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.status === 0
                  ? 'warning'
                  : scope.row.status === 1
                  ? 'success'
                  : 'danger'
              "
            >
              {{ scope.row.status | filterStatus }}
            </el-tag>
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
  </div>
</template>

<script>
export default {
  name: "logsLogin",
  data() {
    return {
      logs: [
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 0,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 0,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 2,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 1,
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          device: "Chrome 98",
          address: "广东-广州",
          ip: "127.0.0.1",
          status: 0,
        },
      ],
    };
  },
  filters: {
    filterStatus: function (index) {
      let status = ["密码错误", "登录成功", "未知错误"];
      return status[index];
    },
  },
};
</script>

<style scoped>
</style>
