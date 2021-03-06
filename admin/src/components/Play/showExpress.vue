<template>
  <el-table
    :data="getExpressData"
    v-loading="loading"
    height="400"
    border
    style="width: 100%"
  >
    <el-table-column prop="time" sortable label="订单日期" width="180">
    </el-table-column>
    <el-table-column prop="openId" label="用户ID" width="160">
    </el-table-column>
    <el-table-column prop="companyName" label="物流公司"> </el-table-column>
    <el-table-column prop="courierNum" label="物流号"> </el-table-column>
    <el-table-column prop="orderId" label="订单ID" width="240">
    </el-table-column>
    <el-table-column label="物流信息" width="240">
      <template slot-scope="scope">
        {{
          `姓名:${scope.row.name};手机号:${scope.row.mobile};地址:${scope.row.address}`
        }}
      </template>
    </el-table-column>
    <el-table-column label="订单商品" width="100">
      <template slot-scope="scope">
        <el-button
          type="success"
          size="mini"
          @click="showItems(scope.row.orderId)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="status" label="订单状态" width="120">
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
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <div class="action-list">
          <div>
            <el-button
              type="warning"
              @click="sendLogistic(scope.row.orderId, scope.row.expressId)"
              size="mini"
              :disabled="scope.row.status == 0 ? false : true"
              >发货</el-button
            >
          </div>
          <div>
            <el-button
              @click="
                showLogistic(
                  scope.row.orderId,
                  scope.row.expressId,
                  scope.row.courierNum
                )
              "
              type="primary"
              size="mini"
              :disabled="scope.row.status == 1 ? false : true"
              >物流</el-button
            >
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getExpress } from "@/api/order";
export default {
  name: "ShowExpress",
  props: {
    update: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    update() {
      this.getData();
    },
  },
  computed: {
    ...mapState({
      page: (state) => state.order.expressPage,
    }),
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    getExpressData() {
      let data = [];
      let len = Object.keys(this.express).length;
      let keys = Object.keys(this.express);
      let start = 10 * (this.page - 1);
      let end = start + 10 > len ? len : start + 10;
      for (let i = start; i < end; ++i) {
        data.push(Object.assign(this.express[keys[i]], { orderId: keys[i] }));
      }
      return data;
    },
  },
  data() {
    return {
      express: [],
      loading: false,
    };
  },
  methods: {
    showItems(orderId) {
      this.$emit("showItems", orderId);
    },
    getData() {
      this.loading = true;
      const params = {
        headers: this.headers,
      };
      getExpress(params)
        .then((result) => {
          this.loading = false;
          this.express = result.data.data;
          this.$store.commit("updateExpress", result.data.data);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    showLogistic(orderId, expressId, courierNum) {
      this.$emit("showLogistic", orderId, expressId, courierNum);
    },
    sendLogistic(orderId, expressId) {
      this.$emit("sendLogistic", orderId, expressId);
    },
  },
  mounted() {
    this.getData();
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