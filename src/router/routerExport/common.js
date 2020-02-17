import mainLagout from "@/page/lagout/mainLagout";

import MainContent from '@/components/mainContent'
import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import caseHandleRouterJson from './routerJson/caseHandleRouterJson'


// 不作为Main组件的子页面展示的页面单独写，如下
const loginRouter = {
  path: "/login",
  name: "login",
  component: () => import("@/page/login/login.vue")
};
const registRouter = {
  path: "/register",
  name: "register",
  meta: {
    title: "register - 注册"
  },
  component: () => import("@/page/login/register.vue")
};
const redirectRouter = {
  path: "/",
  redirect: { name: "login" }
};

//首页 及 文书
const homeRouter = {
  path: "/home",
  name: "home",
  component: Layout,
  children: [
    {
      path: "/index",
      name: "home2",
      component: MainContent,
      children: [
        {
          path: "index",
          name: "home_index",
          meta: {
            title: "首页"
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
    }
  ]
};
//主页的路由
const lagoutOneRouter = [
  {
    path: '/main',
    name: 'main',
    component: mainLagout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("@/page/home.vue"),
      }
    ]
  },
  {
    path: "*",
    component: () => import("@/page/error/error.vue")
  }
];

export {loginRouter, registRouter,redirectRouter,homeRouter,lagoutOneRouter}
