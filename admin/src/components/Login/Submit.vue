<template>
  <div>
    <div class="logo">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" srcset="" />
        <div class="logo-righ">
          <div class="logo-first">
            <span>虎虎生威春联购Web后台</span>
          </div>
          <div class="logo-second">
            <span
              >Huhu Shengwei Spring Festival couplet shopping Web
              background</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="submit-form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="登录账号" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Submit",
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(123, formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.replace("/");
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
.el-button {
  width: 100%;
}
.logo {
  /* float: left; */
  margin: auto;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}
.logo img {
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 50%;
}
.logo .logo-righ {
  /* float: right; */
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-top: 12px;
  /* margin-left: 10px; */
}
.logo .logo-righ .logo-first {
  font-size: 25px;
  color: #303133;
  font-weight: 400;
}
.logo .logo-righ .logo-second {
  font-size: 15px;
}

.submit-form {
  margin-top: 30px;
}
</style>