<template>
  <div class="add-logistic">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="公司名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入公司名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司编码" prop="symbol">
        <el-input
          v-model="ruleForm.symbol"
          placeholder="请输入公司编码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm('ruleForm')"
          >添加公司</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addCompany } from "@/api/company";
import Form from "@/common/form";
import { logisticForm, logisticRules } from "@/common/rules";
export default {
  name: "AddLogistic",
  data() {
    return {
      ruleForm: logisticForm,
      rules: logisticRules,
    };
  },
  methods: {
    getParams() {
      return {
        headers: this.headers,
        data: this.ruleForm,
      };
    },
    submitForm(formName) {
      Form.validate(this, formName)
        .then(async (res) => {
          if (res) {
            const params = this.getParams();
            const _result = await addCompany(params).catch((err) => {
              this.$message.error("重复添加");
            });
            Form.tips(this, _result.data.code, _result.data.msg);
            this.ruleForm = Object.assign({}, logisticForm);
            this.$emit("closeDrawer"); // 关闭抽屉，并刷新获取数据
          }
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  }
};
</script>


<style scoped>
.add-logistic {
  padding: 20px;
}
</style>
