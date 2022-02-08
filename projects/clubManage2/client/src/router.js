import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "./views/index.vue"
import Register from "./views/register.vue"
import NotFound from "./views/404.vue"
import Login from "./views/login.vue"
import Home from "./views/home.vue"
import InfoShow from "./views/infoshow.vue"
import ActList from "./views/actList.vue"
import MyActList from "./views/myActList.vue"
import AddAct from "./views/addAct.vue"
import AppealList from "./views/appealList.vue"
import Manage from "./views/manage.vue"
import ActAudit from "./views/actAudit.vue"
import ScoreRule from "./views/scoreRule.vue"
import ActScore from "./views/actScore.vue"
import GiveScore from "./views/giveScore"
import MyScore from "./views/myScore.vue"



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
    path: "/index",
    // name: "index",
    component: Index,
    children: [{
        path: '/',
        component: ActList
      },
      {
        path: '/home',
        name: "home",
        component: Home
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: InfoShow
      },
      {
        path: "/actlist",
        name: "actlist",
        component: ActList
      },
      {
        path: "/myactlist",
        name: "myactlist",
        component: MyActList
      },
      {
        path: "/addact",
        name: "addact",
        component: AddAct
      },
      {
        path: "/appeallist",
        name: "appeallist",
        component: AppealList
      },
      {
        path: "/manage",
        name: "manage",
        component: Manage
      },
      {
        path: "/actAudit",
        name: "actAudit",
        component: ActAudit
      },
      {
        path: "/scoreRule",
        name: "scoreRule",
        component: ScoreRule
      },
      {
        path: "/actScore",
        name: "actScore",
        component: ActScore
      },
      {
        path: "/givescore",
        name: "givescore",
        component: GiveScore
      },
      {
        path: "/myscore",
        name: "myscore",
        component: MyScore
      },
    ]
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
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