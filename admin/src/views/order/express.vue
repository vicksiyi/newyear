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
      <el-table :data="orders" height="400" border style="width: 100%">
        <el-table-column prop="startTime" sortable label="订单日期" width="180">
        </el-table-column>
        <el-table-column prop="openId" label="用户ID" width="160">
        </el-table-column>
        <el-table-column prop="logisticCode" label="物流号" width="200">
        </el-table-column>
        <el-table-column prop="logistic" label="物流公司" width="100">
        </el-table-column>
        <el-table-column prop="orderId" label="订单ID" width="240">
        </el-table-column>
        <el-table-column label="订单商品" width="80">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="showItems(scope.$index)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="80">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.status === 0
                  ? ''
                  : scope.row.status === 1
                  ? 'warning'
                  : 'success'
              "
            >
              {{ scope.row.status | filterStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="action-list">
              <div>
                <el-button
                  type="warning"
                  @click="sendLogistic(scope.$index)"
                  size="mini"
                  :disabled="scope.row.status == 0 ? false : true"
                  >发货</el-button
                >
              </div>
              <div>
                <el-button
                  @click="showLogistic(scope.$index)"
                  type="primary"
                  size="mini"
                  >物流</el-button
                >
              </div>
            </div>
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
      :title="show === 0 ? '查看物品' : show === 1 ? '物流信息' : '物流状态'"
      :visible.sync="drawer"
      :direction="direction"
      :size="show === 1 ? 600 : 400"
    >
      <ShowItem v-if="show === 0"></ShowItem>
      <SubmitLogistic v-else-if="show == 1"></SubmitLogistic>
      <ShowLogistic v-else></ShowLogistic>
    </el-drawer>
  </div>
</template>

<script>
import ShowItem from "@/components/Order/ShowItem";
import SubmitLogistic from "@/components/Order/SubmitLogistic";
import ShowLogistic from "@/components/Order/ShowLogistic";
export default {
  name: "express",
  components: { ShowItem, SubmitLogistic, ShowLogistic },
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
      orders: [
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 2,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 1,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 1,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 1,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          logisticCode: "780098068058",
          logistic: "顺丰",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
      ],
      show: 0,
    };
  },
  methods: {
    showItems(index) {
      this.show = 0;
      this.drawer = true;
    },
    sendLogistic(index) {
      this.show = 1;
      this.drawer = true;
    },
    showLogistic(index) {
      this.show = 2;
      this.drawer = true;
    },
  },
  computed: {
    searchLabel: function () {
      if (this.searchType == "") return "请先选择搜索类型";
      return `请输入${this.searchTypes[this.searchType].label}`;
    },
  },
  filters: {
    filterStatus: function (value) {
      let status = ["未发货", "已发货", "已完成"];
      return status[value];
    },
  },
};
</script>

<style scoped>
.action-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>