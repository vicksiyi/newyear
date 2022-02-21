<template>
  <div id="login">
    <el-container>
      <el-header>
        <div class="header">
          <Header :isLogin="true"></Header>
        </div>
      </el-header>
      <el-main>
        <div class="form-login-submit">
          <Submit></Submit>
        </div>
      </el-main>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Submit from "@/components/Login/Submit";
export default {
  name: "Login",
  components: { Header, Footer, Submit },
};
</script>

<style>
.header {
  height: 60px;
}
.el-header {
  padding: 0;
}
.el-footer {
  padding: 0;
}
.form-login-submit {
  width: 600px;
  margin: 30px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 80px;
  padding-right: 90px;
}
</style>
