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
export default {
  name: "AddLogistic",
  data() {
    return {
      ruleForm: {
        name: "",
        symbol: "",
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        symbol: [
          { required: true, message: "请输入公司编码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            headers: this.headers,
            data: _this.ruleForm,
          };
          const _result = await addCompany(params).catch(err=>{
            this.$message.error("重复添加")
          });
          if (_result.data.code === 200) {
            this.$message({
              message: "成功添加",
              type: "success",
            });
            this.$emit("closeDrawer");
            this.ruleForm = {
              name: "",
              symbol: "",
            };
          } else this.$message.error("未知错误");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  mounted: function () {},
};
</script>


<style scoped>
.add-logistic {
  padding: 20px;
}
</style>
