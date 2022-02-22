// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import http from 'axios';
import '@/api/mock.js';

Vue.config.productionTip = false


import {
  Button, Row, Container, Main, Footer, Header,
  Dropdown, DropdownMenu, DropdownItem, Avatar, Form,
  FormItem, Input, Col, Menu, Submenu, MenuItem,
  MenuItemGroup, Aside, Card, Table,
  TableColumn, Breadcrumb, BreadcrumbItem, Tag, Popconfirm,
  MessageBox, Select, Message, Option, Drawer, Radio, RadioGroup,
  Upload
} from 'element-ui';
Vue.use(Button);
Vue.use(Row);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Aside);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Popconfirm);
Vue.use(Select);
Vue.use(Option);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);

Vue.prototype.$http = http;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
