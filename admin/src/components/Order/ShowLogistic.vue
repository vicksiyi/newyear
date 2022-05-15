<template>
  <div class="show-logistic" v-loading="loading">
    <el-steps
      v-if="!isEmpty"
      finish-status="success"
      direction="vertical"
      :active="1"
    >
      <el-step
        v-for="(item, index) in logistics"
        :key="index"
        :icon="index == 0 ? 'el-icon-circle-check' : 'el-icon-remove-outline'"
        :title="item.AcceptTime"
        :description="item.AcceptStation"
      ></el-step>
    </el-steps>
    <el-empty v-else description="暂无信息"></el-empty>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getLogistic } from "@/api/three/logistic";
export default {
  name: "ShowLogistic",
  components: {},
  computed: {
    ...mapState({
      courierNum: (state) => state.order.courierNum,
    }),
  },
  data() {
    return {
      loading: false,
      logistics: [],
      isEmpty: false,
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      getLogistic(this.courierNum)
        .then((res) => {
          this.isEmpty = res.data.State != "3";
          let _logistic = res.data.Traces;
          this.logistics = _logistic;
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("获取错误");
          this.loading = false;
        });
    },
  },
  watch: {
    courierNum() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.show-logistic {
  padding: 20px;
}
</style>