import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../../components/Login.vue'
import Home from '../../components/Home.vue'
import Welcome from '../../components/Welcome.vue'
import Users from '../../components/user/Users.vue'
import Right from '../../components/power/Rights.vue'
import Roles from '../../components/power/Roles.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/Home',
    component: Home,
    redirect: '/Welcome',
    children: [
      { path: '/Welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Right },
      { path: '/roles', component: Roles }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  // to：将要访问的路径
  // from： 代表从哪个路径跳转而来
  // next：是一个函数，表示放行
  //    next() 放行  next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
