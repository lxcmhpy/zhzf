import mainLagout from "@/page/lagout/mainLagout";

import MainContent from '@/components/mainContent'
import Layout from '@/page/lagout/mainLagout' //Layout 是架构组件，不在后台返回，在文件里单独引入

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: "/login",
  name: "login",
  component: () => import("@/page/login/login.vue")
};
export const registRouter = {
  path: "/register",
  name: "register",
  meta: {
    title: "register - 注册"
  },
  component: () => import("@/page/login/register.vue")
};
export const redirectRouter = {
  path: "/",
  redirect: { name: "login" }
};

//首页 及 文书
export const homeRouter = {
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
          path: "/index",
          name: "home_index",
          meta: {
            title: "首页"
          },
          component: () => import("@/page/home.vue")
        }
      ]
    },
    {
      path: "/caseBook",
      name: "caseBook",
      component: MainContent,
      children: [
        {
          path: "/inquestNotes",
          name: "inquestNotes",
          meta: {
            title: "勘验笔录"
          },
          component: () => import("@/page/caseHandle/case/inquestNotes.vue")
        },
        {
          path: "/enforceForm",
          name: "enforceForm",
          meta: {
            title: "中止（终结、恢复）行政强制执行通知书-表单"
          },
          component: () => import("@/page/caseHandle/case/form/enforceForm.vue")
        },
        {
          path: "/finishForm",
          name: "finishForm",
          meta: {
            title: "结案报告-表单"
          },
          component: () => import("@/page/caseHandle/case/form/finishReportForm.vue")
        },
        {
          path: "/sendReportForm",
          name: "sendReportForm",
          meta: {
            title: "送达回证-表单"
          },
          component: () => import("@/page/caseHandle/case/form/sendReportForm.vue")
        },
        {
          path: "/caseInvestig",
          name: "caseInvestig",
          meta: {
            title: "案件调查报告"
          },
          component: () => import("@/page/caseHandle/case/caseInvestigReport.vue")
        },
        {
          path: "/caseDoc",
          name: "caseDoc",
          meta: {
            title: "调查类文书"
          },
          component: () => import("@/page/caseHandle/case/caseDoc.vue")
        },
        {
          path: "/establish",
          name: "establish",
          meta: {
            title: "立案登记表-pdf"
          },
          component: () => import("@/page/caseHandle/unRecordCase/establish.vue")
        },
        {
          path: "/payStage",
          name: "payStage",
          meta: {
            title: "分期（延期）缴纳罚款通知书-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/payStage.vue")
        },
        {
          path: "/executAnnounce",
          name: "executAnnounce",
          meta: {
            title: "执行公告-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/executAnnounce.vue")
        },
        {
          path: "/remindLetter",
          name: "remindLetter",
          meta: {
            title: "催告书-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/remindLetter.vue")
        },
        {
          path: "/enforceInstead",
          name: "enforceInstead",
          meta: {
            title: "代履行决定书-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/enforceInstead.vue")
        },
        {
          path: "/enforceDecide",
          name: "enforceDecide",
          meta: {
            title: "强制执行决定书-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/enforceDecide.vue")
        },
        {
          path: "/enforce",
          name: "enforce",
          meta: {
            title: "中止（终结、恢复）行政强制执行通知书-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/enforce.vue")
        },
        {
          path: "/finishReport",
          name: "finishReport",
          meta: {
            title: "结案报告-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/finishReport.vue")
        },
        {
          path: "/sendReport",
          name: "sendReport",
          meta: {
            title: "送达回证-pdf"
          },
          component: () => import("@/page/caseHandle/case/pdf/sendReport.vue")
        },
        {

          path: "/filingApproval",
          name: "filingApproval",
          meta: {
            title: "立案登记表"
          },
          component: () => import("@/page/caseHandle/unRecordCase/filingApprovalForm.vue")
        },
        {

          path: "/caseDetail",
          name: "caseDetail",
          meta: {
            title: "案件详情"
          },
          component: () => import("@/page/caseHandle/caseDetail.vue")
        }
        
      ]
    }
  ]
};
//主页的路由
export const lagoutOneRouter = [
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

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  registRouter,
  homeRouter,
  // ...lagoutOneRouter,
  redirectRouter
];
