<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="" srcset="" />
      <div class="logo-righ">
        <div class="logo-first">
          <span>虎虎生威春联购管理系统</span>
        </div>
        <div class="logo-second">
          <span
            >Huhu Shengwei Spring Festival couplet purchase management
            system</span
          >
        </div>
      </div>
    </div>
    <div v-if="!isLogin" class="header-right">
      <div class="avatar">
        <el-dropdown @command="selectAvatar">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">个人中心</el-dropdown-item>
            <el-dropdown-item :command="1">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    selectAvatar(res) {
      if (!res) {
        this.$router.push("/person/detail");
      } else if (res == 1) {
        this.$router.push("/data/manage");
      } else this.$router.push("/login");
    },
  },
  mounted: function () {},
};
</script>


<style scoped>
.header {
  width: 100%;
  height: 60px;
  background: #d8322e;
  border-bottom: 1px solid rgb(93, 178, 218);
  box-shadow: 0 2px 12px 0 rgba(221, 71, 71, 0.1);
}
.logo {
  float: left;
  margin-left: 0px;
}
.logo img {
  width: 40px;
  height: 40px;
  margin: 10px;
}
.logo .logo-righ {
  float: right;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-top: 12px;
  margin-left: 10px;
  color: #fff;
}
.logo .logo-righ .logo-first {
  font-size: 20px;
  font-weight: 400;
}
.logo .logo-righ .logo-second {
  font-size: 12px;
}
.header > .header-right {
  float: right;
  margin-right: 20px;
}
.header-right .avatar {
  margin: 10px;
}
.header-right .avatar-menu {
  margin-top: -20px;
}
.header-right .item {
  color: #fff;
  line-height: 60px;
  font-size: 15px;
  cursor: pointer;
}
</style>
