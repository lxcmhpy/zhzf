import Layout from '@/page/lagout/mainLagout'
import MainContent from '@/components/mainContent'

export const personRouterJson = [
  //人员详情页面
  {
    path: "/personDetailPage",
    name: "personDetailPage",
    meta: {
      title: "个人详情",
      oneTab:true,
    },
    component: () => import("@/page/person/person-manage/personDetailPage.vue")
  },
  {
    path: "/viewApplayDetail",
    name: "viewApplayDetail",
    meta: {
      title: "试卷预览",
      oneTab:true,
    },
    component: () => import("@/page/exam/page-manage/maintain-page-menu/viewApplayDetail.vue")
  }
]

// 人员详情--动态添加路由
export const PersonDetailRouter = [
  {
    path:"/personDetail",
    component: Layout,
    children: [
      {
        path: '/detail',
        component: MainContent,
        children: []
      }
    ]
  }
]
