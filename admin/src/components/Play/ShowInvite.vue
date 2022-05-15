<template>
  <el-table
    :data="getInviteData"
    v-loading="loading"
    height="400"
    border
    style="width: 100%"
  >
    <el-table-column prop="time" sortable label="订单日期" width="180">
    </el-table-column>
    <el-table-column prop="openId" label="用户ID"> </el-table-column>
    <el-table-column prop="num" label="取件号" width="100"> </el-table-column>
    <el-table-column prop="orderId" label="订单ID"> </el-table-column>
    <!-- <el-table-column prop="time" sortable label="取件时间" width="180">
    </el-table-column> -->
    <el-table-column label="订单商品" width="120">
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
              : 'info'
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
            <el-popconfirm
              @confirm="done(scope.row.orderId)"
              title="确定下一状态?"
            >
              <el-button
                :disabled="scope.row.status === 2"
                slot="reference"
                type="warning"
                size="mini"
                >下一状态</el-button
              >
            </el-popconfirm>
          </div>
          <!-- <div>
            <el-button type="danger" size="mini">已取货</el-button>
          </div> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getInvite, nextStatus } from "@/api/order";
export default {
  name: "ShowInvite",
  computed: {
    ...mapGetters("header", ["getHeader"]),
    ...mapState({
      page: (state) => state.order.invitePage,
    }),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    getInviteData() {
      let data = [];
      let len = Object.keys(this.invites).length;
      let keys = Object.keys(this.invites);
      let start = 10 * (this.page - 1);
      let end = start + 10 > len ? len : start + 10;
      for (let i = start; i < end; ++i) {
        data.push(Object.assign(this.invites[keys[i]], { orderId: keys[i] }));
      }
      return data;
    },
  },
  data() {
    return {
      invites: [],
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
      getInvite(params)
        .then((result) => {
          this.loading = false;
          this.invites = result.data.data;
          this.$store.commit("updateInvites", result.data.data);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    done(orderId) {
      this.loading = true;
      const params = {
        headers: this.headers,
        orderId: orderId,
      };
      nextStatus(params)
        .then((result) => {
          this.loading = false;
          this.getData();
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
  },
  mounted() {
    this.getData();
  },
  filters: {
    filterStatus: function (value) {
      let status = ["处理中", "等待取", "已完成"];
      return status[value];
    },
  },
};
</script>