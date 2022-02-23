<template>
  <div class="add-logistic">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="公司名称" prop="name" required>
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入公司名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司编码" prop="code" required>
        <el-input
          v-model="ruleForm.code"
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
export default {
  name: "AddLogistic",
  data() {
    return {
      ruleForm: {
        name: "",
        code: "",
        startTime1: "",
        startTime2: "",
        endTime1: "",
        endTime2: "",
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入公司编码", trigger: "blur" }],
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
    }
  },
  mounted: function () {},
};
</script>


<style scoped>
.add-logistic {
  padding: 20px;
}
</style>
