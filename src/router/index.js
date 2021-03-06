import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login' // 登录 组件

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') }, // 登录 组件
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { path: '', component: () => import('@/views/home') },
      { path: '/qa', component: () => import('@/views/qa') },
      { path: '/my', component: () => import('@/views/my') },
      { path: '/video', component: () => import('@/views/video') }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
