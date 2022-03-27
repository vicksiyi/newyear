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
    <el-row style="margin-top: 20px" :gutter="20">
      <ShowInvite @showItems="showItems"></ShowInvite>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="getInviteLen"
        >
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      title="查看商品"
      :visible.sync="drawer"
      :direction="direction"
      :size="400"
    >
      <ShowItem :isInvite="true"></ShowItem>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShowItem from "@/components/Play/ShowItem";
import ShowInvite from "@/components/Play/ShowInvite";
export default {
  name: "invite",
  components: { ShowItem, ShowInvite },
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
        },
        {
          value: "2",
          label: "取件号",
        },
      ],
      searchType: "",
      search: "",
    };
  },
  methods: {
    showItems(orderId) {
      this.drawer = true;
      this.$store.commit("updateInvite", this.invites[orderId]);
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
    ...mapState({
      invites: (state) => state.order.invites,
    }),
    getInviteLen() {
      return Object.keys(this.invites).length;
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