import MainContent from '@/components/mainContent'

// 考试管理
export const examRouterJson = [
  {
    name: "examManage",
    path: "/exam",
    component: MainContent,
    meta: {
      title: "考试管理"
    },
    redirect: '/exam-manage',
    children: [
      {
        name: "batchManage",
        path: "/exam-manage",
        meta: { title: "批次管理", loading: false },
        component: () => import("@/page/exam/exam-manage/batchManage.vue")
      },
      {
        name: "scoreManage",
        path: "/score-manage",
        meta: { title: "评分管理", loading: false },
        component: () => import("@/page/exam/score-manage/scoreManage.vue")
      },
      {
        name: "planManage",
        path: "/plan-manage",
        meta: { title: "计划管理", loading: false },
        component: () => import("@/page/exam/exam-manage/batchManage.vue")
      }
    ]
  },
  {
    name: "pageManage",
    path: "/exam",
    component: MainContent,
    meta: {
      title: "试卷管理"
    },
    redirect: '/paragraph-management',
    children: [
      {
        name: "maintainPageMenu",
        path: "/maintain-page-menu",
        meta: { title: "维护试卷", loading: false },
        component: () => import("@/page/exam/page-manage/maintain-page-menu/maintainPageMenu.vue")
      },
      {
        name: "maintainPage",
        path: "/maintain-page",
        meta: { title: "试卷预览", loading: false },
        component: () => import("@/page/exam/page-manage/maintain-page/pageView.vue")
      },
      {
        name: "pageApplay",
        path: "/applay-page",
        meta: { title: "审核试卷", loading: false },
        component: () => import("@/page/exam/page-manage/applay-page/pageApplay.vue")
      },
      {
        name: "maintainTemplete",
        path: "/maintain-templete",
        meta: { title: "维护模板", loading: false },
        component: () => import("@/page/exam/page-manage/maintain-templete/maintainTemp.vue")
      },
      // {
      //   name: "maintainTemplete",
      //   path: "/maintain-templete",
      //   meta: { title: "维护模板", loading: false },
      //   component: () => import("@/page/exam/page-manage/maintain-templete/maintainTemp.vue")
      // },
      {
        path: "/viewApplayDetail/:pageId/:name/:type",
        name: "viewApplayDetail",
        meta: {
          title: "试卷预览",
          oneTab:true,
          loading: false
        },
        component: () => import("@/page/exam/page-manage/maintain-page-menu/viewApplayDetail.vue")
      }
    ]
  },
  {
    name: "questionManage",
    path: "/exam",
    component: MainContent,
    meta: {
      title: "题库管理"
    },
    redirect: '/exam-manage',
    children: [
      {
        name: "maintainOutline",
        path: "/maintain-outline",
        meta: { title: "维护大纲", loading: false },
        component: () => import("@/page/exam/question-manage/maintain-outline/maintainOutline.vue")
      },
      {
        name: "maintainQuestion",
        path: "/maintain-question",
        meta: { title: "维护试题", loading: false },
        component: () => import("@/page/exam/question-manage/maintain-question/maintainQuestion.vue")
      }
    ]
  }
]