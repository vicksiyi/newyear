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
      <el-card style="height: 220px; margin-top: 20px"></el-card>
      <el-row style="margin-top: 20px">
        <el-col :span="12">
          <el-card style="height: 200px"></el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height: 200px"></el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "home",
  data: function () {
    return {
      avatarUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      tableData: [
        {
          type: "盒联1.1m",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "盒联1.3m",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "盒联1.6m",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "盒联2.2m",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "盒联3.0m",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "二开直联",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "二开半直联",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "三开直联",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "四开直联",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "五开直联",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "红包",
          day: "100",
          month: "1000",
          all: "10000",
        },
        {
          type: "中国结",
          day: "100",
          month: "1000",
          all: "10000",
        },
      ],
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
    };
  },
  methods: {},
  mounted: function () {
    this.$http
      .get("/user?ID=1234")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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