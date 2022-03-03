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
import Form from "@/common/form";
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
            const _result = await addItemType(params).catch((err) => {
              this.$message.error("重复添加");
            });
            Form.tips(this, _result.data.code, _result.data.msg);
            this.$emit("closeDrawer");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>


<style scoped>
.form {
  padding: 20px;
}
</style>
