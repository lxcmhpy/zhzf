/** 人员考试子系统路由 */
import examLayout from "@/page/exam/examLayout";

const StartRouter = [
  // 登录
  {
    path: "/",
    redirect: { name: "examLogin" }
  },
  {
    path: "/examLogin",
    name: "examLogin",
    meta: { loading: false },
    component: () => import("@/page/exam/login.vue")
  },
  {
    path: "/examSys",
    name: 'examSys',
    component: examLayout,
    rediect:  '/enterSystem',
    children: [
      {
        path: "/entrySystem",
        name: "entrySystem",
        meta: { loading: false },
        component: () => import("@/page/exam/start-exam/entrySystem")
      },
      {
        path: "/invigilator",
        name: "invigilator",
        meta: { loading: false },
        component: () => import("@/page/exam/start-exam/invigilator")
      },
      {
        path: "/examineeEntry",
        name: "examineeEntry",
        meta: { loading: false },
        component: () => import("@/page/exam/start-exam/examineeEntry")
      },
      {
        path: "/countDown",
        name: "countDown",
        meta: { loading: false },
        component: () => import("@/page/exam/start-exam/countDown")
      },
      {
        path: "/startAnswer",
        name: "startAnswer",
        meta: { loading: false },
        component: () => import("@/page/exam/start-exam/startAnswer")
      },
      {
        path: "/markPaper",
        name: "markPaper",
        component: () => import("@/page/exam/start-exam/markPaper"),
        redirect: '/markExam',
        children: [
          {
            path: "/markExam",
            name: "markExam",
            meta: { loading: false },
            component: () => import("@/page/exam/start-exam/markExam")
          },
          {
            path: "/waitMark",
            name: "waitMark",
            meta: { loading: false },
            component: () => import("@/page/exam/start-exam/waitMark")
          },
          {
            path: "/markQuestion",
            name: "markQuestion",
            meta: { loading: false },
            component: () => import("@/page/exam/start-exam/markQuestion")
          }
        ]
      }
    ]
  }
]

export { StartRouter }
