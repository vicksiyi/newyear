import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

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
          path: '/order/notpay',
          name: 'notpay',
          component: () => import('@/views/order/notpay')
        },
        {
          path: '/order/invite',
          name: 'invite',
          component: () => import('@/views/order/invite')
        },
        {
          path: '/order/express',
          name: 'express',
          component: () => import('@/views/order/express')
        },
        {
          path: '/item',
          name: 'item',
          component: () => import('@/views/item/item')
        },
        {
          path: '/system/notice',
          name: 'notice',
          component: () => import('@/views/system/notice')
        },
        {
          path: '/system/page',
          name: 'page',
          component: () => import('@/views/system/page')
        },
        {
          path: '/system/logistic',
          name: 'logistic',
          component: () => import('@/views/system/logistic')
        },
        {
          path: '/logs/login',
          name: 'logsLogin',
          component: () => import('@/views/logs/logsLogin')
        },
        {
          path: '/logs/manage',
          name: 'logsManage',
          component: () => import('@/views/logs/logsManage')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '*',    // 此处需特别注意至于最底部
    //   redirect: '/login'
    // }
  ]
})
