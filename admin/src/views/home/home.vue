<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <el-row class="home-user" :gutter="20">
            <el-col :span="8">
              <img :src="avatarUrl" alt="" />
            </el-col>
            <el-col :span="16">
              <div class="userinfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-02-21</span></p>
          <p>上次登录地点: <span>广东-广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 420px" shadow="hover">
        <el-table :data="tableData" height="400">
          <el-table-column prop="type" label="类别"> </el-table-column>
          <el-table-column prop="day" label="今日购买"> </el-table-column>
          <el-table-column prop="month" label="本月购买"> </el-table-column>
          <el-table-column prop="all" label="总购买"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-row class="count-data" :gutter="20">
        <el-col v-for="(item, index) in countData" :key="index" :span="8">
          <el-card
            shadow="hover"
            :style="{
              marginTop: index > 2 ? '20px' : '',
              height: '70px',
            }"
            :body-style="{ padding: '0px' }"
          >
            <el-row>
              <el-col :span="6">
                <i
                  class="icon"
                  :class="`el-icon-${item.icon}`"
                  :style="{ background: item.color }"
                ></i>
              </el-col>
              <el-col :span="18">
                <div class="detail">
                  <p class="num">{{ item.value }}</p>
                  <p class="text">{{ item.name }}</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-card style="height: 220px; margin-top: 20px">
        <Echart
          :isItemType="true"
          v-if="isChart"
          :chartData="echartData.orders"
        ></Echart>
      </el-card>
      <el-row style="margin-top: 20px">
        <el-col :span="12">
          <el-card style="height: 240px">
            <Echart
              :isUser="true"
              v-if="isChart"
              :chartData="echartData.users"
            ></Echart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height: 240px">
            <Echart
              :isVideo="true"
              v-if="isChart"
              :chartData="echartData.videos"
            ></Echart>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import Echart from "@/components/Echart";
export default {
  name: "home",
  components: {
    Echart,
  },
  data: function () {
    return {
      avatarUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日已完成订单",
          value: 1234,
          icon: "success",
          color: "#67C23A",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "success",
          color: "#E6A23C",
        },
        {
          name: "今月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今月已完成订单",
          value: 1234,
          icon: "success",
          color: "#67C23A",
        },
        {
          name: "今月未支付订单",
          value: 1234,
          icon: "success",
          color: "#E6A23C",
        },
      ],
      echartData: {
        orders: {},
        users: {},
        videos: {},
      },
      isChart: false,
    };
  },
  methods: {
    getChartData: function () {
      return new Promise((resolve, reject) => {
        getData().then((res) => {
          resolve(res);
        });
      });
    },
  },
  created: async function () {
    let res = await this.getChartData();
    let { code, data } = res.data;
    if (code == 20000) {
      this.tableData = data.tableData;
      let order = data.orderData;
      let xData = order.date;
      let keyArray = Object.keys(order.data[0]);
      let series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      // 生成折线图
      this.echartData.orders.xData = xData;
      this.echartData.orders.lData = keyArray;
      this.echartData.orders.series = series;
      // 生成柱形图
      this.echartData.users.xData = data.userData.map((item) => item.date);
      this.echartData.users.series = [
        {
          name: "新增用户",
          data: data.userData.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: data.userData.map((item) => item.active),
          type: "bar",
        },
      ];

      // 生成饼图
      this.echartData.videos.series = [
        {
          data: data.videoData,
          type: "pie",
        },
      ];
    }
    this.isChart = true;
  },
};
</script>

<style scoped>
.user {
  height: 140px;
  border-bottom: 1px solid #e9eaec;
}
.login-info {
  margin-top: 20px;
}
.login-info p {
  font-size: 10px;
  line-height: 25px;
  color: #80848f;
}
.login-info p span {
  margin-left: 20px;
  font-size: 12px;
  color: #303133;
}
.home-user img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.home-user .userinfo {
  margin-top: 25px;
}
.home-user .userinfo .name {
  font-size: 30px;
  font-weight: 600;
  line-height: 50px;
  color: #1c2438;
}
.home-user .userinfo .access {
  font-size: 12px;
  line-height: 30px;
  color: #495060;
}
.count-data .icon {
  width: 50px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  color: #fff;
  font-size: 30px;
}
.detail .num {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
  color: #1c2438;
}
.detail .text {
  font-size: 12px;
  color: #80848f;
}
</style>