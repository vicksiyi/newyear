// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import http from 'axios';

Vue.config.productionTip = false


import {
  Button, Row, Container, Main, Footer, Header,
  Dropdown, DropdownMenu, DropdownItem, Avatar, Form,
  FormItem, Input, Col, Menu, Submenu, MenuItem,
  MenuItemGroup, Aside, Card, Table,
  TableColumn,
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

Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
