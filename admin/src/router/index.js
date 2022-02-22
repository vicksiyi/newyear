import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home';

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/home')
        },
        {
          path: '/invite',
          name: 'invite',
          component: () => import('@/views/order/invite')
        },
        {
          path: '/express',
          name: 'express',
          component: () => import('@/views/order/express')
        },
        {
          path: '/item',
          name: 'item',
          component: () => import('@/views/item/item')
        },
        {
          path: '/notice',
          name: 'notice',
          component: () => import('@/views/system/notice')
        },
        {
          path: '/page',
          name: 'page',
          component: () => import('@/views/system/page')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',    // 此处需特别注意至于最底部
      redirect: '/login'
    }
  ]
})
