import MainContent from '@/components/mainContent'

// 培训管理
export const trainedRouterJson = [
  {
    name: "trainedManage",
    path: "/trained",
    component: MainContent,
    meta: { title: "培训管理" },
    redirect: '/trained-batch-manage',
    children: [
      {
        name: "trainBatchManage",
        path: "/trained-batch-manage",
        meta: { title: "批次管理", loading: false },
        component: () => import("@/page/trained/trained-manage/batchManage.vue")
      },
      {
        name: "mockExam",
        path: "/mock-exam",
        meta: { title: "模拟考试", loading: false },
        component: () => import("@/page/trained/trained-manage/mockExam.vue")
      }
    ]
  },
  {
    name: "courseManage",
    path: "/course-manage",
    meta: { title: "课程管理", loading: false },
    component: () => import("@/page/trained/course-manage/courseManage.vue")
  },
  {
    name: "trainedOrganization",
    path: "/trained-organization",
    meta: { title: "培训机构", loading: false },
    component: () => import("@/page/trained/trained-organization/trainedOrganization.vue")
  }
]