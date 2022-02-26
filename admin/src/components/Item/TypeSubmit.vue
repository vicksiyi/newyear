<template>
  <div class="form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="类别" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入类别名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm('ruleForm')"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addItemType } from "@/api/item/type";
export default {
  name: "TypeSubmit",
  data() {
    return {
      ruleForm: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请输入类别名称", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            headers: _this.headers,
            data: _this.ruleForm,
          };
          const _result = await addItemType(params).catch((err) => {
            this.$message.error("重复添加");
          });
          if (_result.data.code === 200) {
            this.$message({
              message: "成功添加",
              type: "success",
            });
            this.$emit("closeDrawer");
          } else this.$message.error(_result.data.msg);
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
.form {
  padding: 20px;
}
</style>
