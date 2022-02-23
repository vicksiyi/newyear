<template>
  <div>
    <el-row :gutter="20">
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
    <el-row style="margin-top: 20px" :gutter="20">
      <el-table :data="orders" height="400" border style="width: 100%">
        <el-table-column prop="startTime" sortable label="订单日期" width="180">
        </el-table-column>
        <el-table-column prop="openId" label="用户ID" width="240">
        </el-table-column>
        <el-table-column prop="orderId" label="订单ID"> </el-table-column>
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
          <template>
            <el-tag effect="dark" type="info"> 未支付 </el-tag>
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
      title="查看商品"
      :visible.sync="drawer"
      :direction="direction"
      :size="400"
    >
      <ShowItem></ShowItem>
    </el-drawer>
  </div>
</template>

<script>
import ShowItem from "@/components/Order/ShowItem";
export default {
  name: "notpay",
  components: { ShowItem },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      filterLists: [
        {
          value: "0",
          label: "处理中",
        },
        {
          value: "1",
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
        }
      ],
      searchType: "",
      search: "",
      orders: [
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 1,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 1,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
        {
          startTime: "2022-01-12 22:00:00",
          openId: "oCBbG4l1p3sBJSo_oEwSlDw_RA9I",
          number: "A001",
          time: "2022-01-12 22:30:00",
          orderId: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          items: [{}],
          status: 0,
        },
      ],
    };
  },
  methods: {
    showItems(index) {
      console.log(index);
      this.drawer = true;
    },
    done(index) {
      console.log(`完成${index}`);
    },
  },
  computed: {
    searchLabel: function () {
      if (this.searchType == "") return "请先选择搜索类型";
      return `请输入${this.searchTypes[this.searchType].label}`;
    },
  }
};
</script>

<style scoped>
</style>
