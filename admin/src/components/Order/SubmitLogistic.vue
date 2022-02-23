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
      <el-form-item label="物流单号" prop="logisticCode">
        <el-input
          type="text"
          placeholder="请输入物流单号"
          v-model="ruleForm.logisticCode"
        ></el-input>
      </el-form-item>
      <el-form-item label="物流公司" prop="logistic">
        <el-select v-model="logistic" placeholder="请选择物流公司">
          <el-option
            v-for="item in logistics"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
export default {
  name: "SubmitLogistic",
  components: {},
  data() {
    return {
      logistics: [
        {
          value: "SF",
          label: "顺丰",
        },
        {
          value: "HTKY",
          label: "百世快递",
        },
        {
          value: "ZTO",
          label: "中通",
        },
        {
          value: "YTO",
          label: "圆通",
        },
      ],
      logistic: "",
      ruleForm: {
        logisticCode: "",
        logistic: "",
      },
      rules: {
        logisticCode: {
          required: true,
          message: "请输入物流单号",
          trigger: "blur",
        },
        logistic: {
          required: true,
          message: "请选择物流公司",
          trigger: "change",
        },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
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