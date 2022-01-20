import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "../views/register.vue"
import NotFound from "../views/notFound.vue"
import Login from "../views/login.vue"
import Index from "../views/index.vue"



// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   undefined
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    // name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "*",
    name: "/404",
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router