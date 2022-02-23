<template>
  <el-menu
    :default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    text-color="#606266"
    active-text-color="#d8322e"
  >
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.label"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "/home",
        },
        {
          label: "订单详情",
          icon: "s-order",
          children: [
            {
              path: "/order/notpay",
              name: "notpay",
              label: "未付订单",
              icon: "user",
              url: "/order/notpay",
            },
            {
              path: "/order/invite",
              name: "invite",
              label: "到店自取",
              icon: "user",
              url: "/order/invite",
            },
            {
              path: "/order/express",
              name: "express",
              label: "快递派送",
              icon: "goods",
              url: "/order/express",
            },
          ],
        },
        {
          path: "/item",
          name: "item",
          label: "商品管理",
          icon: "s-shop",
          url: "/item/item",
        },
        {
          label: "系统管理",
          icon: "s-tools",
          children: [
            {
              path: "/system/notice",
              name: "notice",
              label: "公告管理",
              url: "/system/notice",
            },
            {
              path: "/system/page",
              name: "page",
              label: "页面管理",
              url: "/system/page",
            },
            {
              path: "/system/logistic",
              name: "logistic",
              label: "物流管理",
              url: "/system/logistic",
            },
          ],
        },
        {
          label: "日志管理",
          icon: "discount",
          children: [
            {
              path: "/logs/login",
              name: "loginLog",
              label: "登录日志",
              url: "/logs/login",
            },
            {
              path: "/logs/manage",
              name: "manageLog",
              label: "操作日志",
              url: "/logs/manage",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu: function (item) {
      this.$router.push(item.path);
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>