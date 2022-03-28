<template>
  <div class="submit-logistic">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="物流单号" prop="courierNum">
        <el-input
          type="text"
          placeholder="请输入物流单号"
          v-model="ruleForm.courierNum"
        ></el-input>
      </el-form-item>
      <el-form-item label="物流公司" prop="companyId">
        <el-select v-model="ruleForm.companyId" placeholder="请选择物流公司">
          <el-option
            v-for="item in logistics"
            :key="item.symbol"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Form from "@/common/form";
import Loading from "@/common/loading";
import { addLogistic } from "@/api/order";
import { sendLogisticForm, sendLogisticRule } from "@/common/rules";
export default {
  name: "SubmitLogistic",
  components: {},
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      logistics: (state) => state.logistic.logistics,
      orderId: (state) => state.order.orderId,
      expressId: (state) => state.order.expressId,
    }),
  },
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(sendLogisticForm)),
      rules: JSON.parse(JSON.stringify(sendLogisticRule)),
    };
  },
  methods: {
    getParams() {
      let data = {
        ...this.ruleForm,
        expressId: this.expressId,
        orderId: this.orderId,
      };
      return {
        headers: this.headers,
        data: data,
      };
    },
    submitForm(formName) {
      const loading = Loading.start(this);
      Form.validate(this, formName)
        .then(async (res) => {
          if (res) {
            const params = this.getParams();
            const _result = await addLogistic(params).catch((err) => {
              this.$message.error("未知错误");
            });
            Form.tips(this, _result.data.code, _result.data.msg);
            this.ruleForm = JSON.parse(JSON.stringify(sendLogisticForm));
            this.$emit("closeDrawer"); // 关闭抽屉，并刷新获取数据
          }
          Loading.end(loading);
        })
        .catch((err) => {
          Loading.end(loading);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.submit-logistic {
  padding: 20px;
}
</style>