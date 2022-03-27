<template>
  <el-table
    :data="notPlays"
    v-loading="loading"
    height="400"
    border
    style="width: 100%"
  >
    <el-table-column prop="time" sortable label="订单日期" width="180">
    </el-table-column>
    <el-table-column prop="openId" label="用户ID" width="240">
    </el-table-column>
    <el-table-column prop="count" label="商品数量"> </el-table-column>
    <el-table-column label="订单商品" width="80">
      <template slot-scope="scope">
        <el-button type="success" size="mini" @click="showItems(scope.$index)"
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
</template>

<script>
import { mapGetters} from "vuex";
import { getNotPlay } from "@/api/play";
export default {
  name: "ShowNoPlay",
  data() {
    return {
      notPlays: [],
      loading: false,
    };
  },
  methods: {
    showItems: function (index) {
      this.$emit("showItems", index);
    },
    getNoPlay: function () {
      this.loading = true;
      const params = {
        headers: this.headers,
      };
      getNotPlay(params)
        .then((result) => {
          this.loading = false;
          this.notPlays = result.data.data;
          this.$store.commit("updateNotPlays", result.data.data);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  mounted: function () {
    this.getNoPlay();
  },
};
</script>


<style scoped>
</style>
