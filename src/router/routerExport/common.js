import MainContent from '@/components/mainContent'
import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import caseHandleRouterJson from './routerJson/caseHandleRouterJson'
import caseHandleRouterJson_JX from './routerJson/caseHandleRouterJson_JX'
import caseHandleRouterJson_QH from './routerJson/caseHandleRouterJson_QH'
import lawSuperviseJson from './routerJson/lawSuperviseJson'
import caseCenterJson from './routerJson/caseCenterJson'
import {
  personRouterJson
} from './routerJson/personRouterJson'
import {
  examRouterJson
} from './routerJson/examRouterJson'
import catsDataScreenJson from './routerJson/catsDataScreenJson'
import inspectionJson from './routerJson/inspectionJson'
import catsAppraisalExamReportJson from './routerJson/catsAppraisalExamReportJson'
import catsAppraisalExamUploadJson from './routerJson/catsAppraisalExamUploadJson'
import {
  StartRouter
} from './routerJson/startExamRouterJson'
import {
  trainedRouterJson
} from './routerJson/trainedRouterJson'
import myTrainingRouterJson from './routerJson/myTrainingRouterJson'
import deviceRouterJson from './routerJson/deviceRouterJson'
import lawEnforcementSupervisionRouterJson from './routerJson/lawEnforcementSupervisionRouterJson'
import noticeRouterJson from './routerJson/noticeRouterJson'
import fxypRouterJson from './routerJson/fxypRouterJson'
import fxypRouterJson_QH from './routerJson/fxypRouterJson_QH'
// 不作为Main组件的子页面展示的页面单独写，如下
const route = [
  // 登录
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/login.vue")
  },
  {
    path: "/loginByToken/:TokenKey/:TokenKey_expired",
    name: "loginByToken",
    component: () => import("@/page/login/loginByToken.vue")
  },
  ...catsDataScreenJson,
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
    children: [{
        path: "/home",
        name: "home2",
        component: MainContent,
        children: [{
          path: "/index",
          name: "case_handle_home_index",
          meta: {
            title: "案件办理首页"
          },
          component: () => import("@/page/home.vue")
        }]
      }, {
        path: "/caseBook",
        name: "caseBook",
        component: MainContent,
        children: [
          ...caseHandleRouterJson,
          ...caseHandleRouterJson_JX,
          ...caseHandleRouterJson_QH

        ]
      },
      ...lawSuperviseJson,
      ...caseCenterJson,
      ...inspectionJson,
      ...personRouterJson,
      ...examRouterJson,
      ...trainedRouterJson,
      ...myTrainingRouterJson,
      ...catsAppraisalExamReportJson,
      ...catsAppraisalExamUploadJson,
      ...deviceRouterJson,
      ...lawEnforcementSupervisionRouterJson,
      ...noticeRouterJson,
      ...fxypRouterJson,
      ...fxypRouterJson_QH,
    ]
  },
  {
    path: '/reloadPage',
    name: 'reloadPage',
    meta: {
      oneTab: false
    },
    component: () => import("@/router/reload.vue")
  },
  {
    path: "/details",
    name: "details",
    meta: {
      title: "预览"
    },
    component: () => import("@/page/notice/components/details")
  },
  // 人员考试子系统路由
  ...StartRouter
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


export {
  route
}
