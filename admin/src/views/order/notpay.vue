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
      <ShowNoPlay @showItems="showItems"></ShowNoPlay>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination background layout="prev, pager, next" :total="getNotPlayLen">
        </el-pagination
      ></el-col>
    </el-row>
    <el-drawer
      title="查看商品"
      :visible.sync="drawer"
      :direction="direction"
      :size="400"
    >
      <ShowItem :isNotPlay="true"></ShowItem>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShowItem from "@/components/Play/ShowItem";
import ShowNoPlay from "@/components/Play/ShowNoPlay";
export default {
  name: "notpay",
  components: { ShowItem, ShowNoPlay },
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
      ],
      searchType: "",
      search: "",
      showData: {},
    };
  },
  methods: {
    showItems(index) {
      this.drawer = true;
      this.$store.commit("updateNotPlay", this.notPlays[index]);
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
      notPlays: (state) => state.play.notPlays,
    }),
    getNotPlayLen() {
      return this.notPlays.length;
    },
  },
};
</script>

<style scoped>
</style>
