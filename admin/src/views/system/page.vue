<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1.5">
        <h1>样式图:</h1>
      </el-col>
      <el-col style="height: 520px; margin-bottom: 20px" :span="6">
        <Phone></Phone>
      </el-col>
      <el-col :span="1.5">
        <h1>数据上传:</h1>
      </el-col>
      <el-col :span="14">
        <ShowPage></ShowPage>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Phone from "@/components/page/Phone";
import ShowPage from "@/components/page/ShowPage";
export default {
  name: "page",
  components: { Phone, ShowPage },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {},
};
</script>