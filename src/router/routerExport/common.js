import MainContent from '@/components/mainContent'
import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import caseHandleRouterJson from './routerJson/caseHandleRouterJson'
import personRouterJson from './routerJson/personRouterJson'
import lawSuperviseJson from './routerJson/lawSuperviseJson'
import caseCenterJson from './routerJson/caseCenterJson'

// 不作为Main组件的子页面展示的页面单独写，如下
const route = [
  // 登录
  {
    path: "/",
    redirect: { name: "login" }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/login.vue")
  },
  // 注册
  {
    path: "/register",
    name: "register",
    meta: {
      title: "register - 注册"
    },
    component: () => import("@/page/login/register.vue")
  },
  // 首页
  {
    path: "/home",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home2",
        component: MainContent,
        children: [
            {
            path: "/index",
            name: "case_handle_home_index",
            meta: {
              title: "案件办理首页"
            },
            component: () => import("@/page/home.vue")
          }
        ]
      }, {
        path: "/caseBook",
        name: "caseBook",
        component: MainContent,
        children: [
          ...caseHandleRouterJson
        ]
      },
      {
        path:"/person",
        name:"person",
        meta:{
          title:"人员详情"
        },
        component: MainContent,
        children: [
          ...personRouterJson
        ]
      },
      ...lawSuperviseJson,
      ...caseCenterJson
    ]
  },
  {
    path: '/reloadPage',
    name: 'reloadPage',
    meta: {
        oneTab:false
    },
    component: () => import("@/router/reload.vue")
}
  //主页的路由
  // {
  //   path: '/main',
  //   name: 'main',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import("@/page/home.vue"),
  //     }
  //   ]
  // },
  // {
  //   path: "*",
  //   component: () => import("@/page/error/error.vue")
  // }
]


export {route}
