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
    <el-row style="margin-top: 20px">
      <ShowExpress
        :update="update"
        @showItems="showItems"
        @showLogistic="showLogistic"
        @sendLogistic="sendLogistic"
      ></ShowExpress>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="getExpressLen"
        >
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      :title="show === 0 ? '查看物品' : show === 1 ? '物流信息' : '物流状态'"
      :visible.sync="drawer"
      :direction="direction"
      :size="show === 1 ? 600 : 400"
    >
      <ShowItem v-if="show === 0" :isExpress="true"></ShowItem>
      <SubmitLogistic
        @closeDrawer="closeDrawer"
        v-else-if="show == 1"
      ></SubmitLogistic>
      <ShowLogistic v-else></ShowLogistic>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShowItem from "@/components/Play/ShowItem";
import ShowExpress from "@/components/Play/ShowExpress";
import SubmitLogistic from "@/components/Order/SubmitLogistic";
import ShowLogistic from "@/components/Order/ShowLogistic";
export default {
  name: "express",
  components: { ShowItem, SubmitLogistic, ShowLogistic, ShowExpress },
  data() {
    return {
      drawer: false,
      direction: "rtl",
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
      show: 0,
      update: false,
    };
  },
  methods: {
    showItems(orderId) {
      this.show = 0;
      this.drawer = true;
      this.$store.commit("updateExp", this.express[orderId]);
    },
    sendLogistic(orderId, expressId) {
      this.show = 1;
      this.drawer = true;
      this.$store.commit("updateOrderId", orderId);
      this.$store.commit("updateExpressId", expressId);
    },
    showLogistic(orderId, expressId, courierNum) {
      this.show = 2;
      this.drawer = true;
      this.$store.commit("updateOrderId", orderId);
      this.$store.commit("updateExpressId", expressId);

      console.log(courierNum);
      this.$store.commit("updateCourierNum", courierNum);
    },
    closeDrawer() {
      this.drawer = false;
      this.update = !this.update;
    },
  },
  computed: {
    searchLabel: function () {
      if (this.searchType == "") return "请先选择搜索类型";
      return `请输入${this.searchTypes[this.searchType].label}`;
    },
    ...mapState({
      express: (state) => state.order.express,
    }),
    getExpressLen() {
      return Object.keys(this.express).length;
    },
  },
};
</script>