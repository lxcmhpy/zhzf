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
        component: () => import("@/page/exam/start-exam/entrySystem")
      },
      {
        path: "/invigilator",
        name: "invigilator",
        component: () => import("@/page/exam/start-exam/invigilator")
      },
      {
        path: "/examineeEntry",
        name: "examineeEntry",
        component: () => import("@/page/exam/start-exam/examineeEntry")
      },
      {
        path: "/countDown",
        name: "countDown",
        component: () => import("@/page/exam/start-exam/countDown")
      },
      {
        path: "/startAnswer",
        name: "startAnswer",
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
            component: () => import("@/page/exam/start-exam/markExam")
          },
          {
            path: "/waitMark",
            name: "waitMark",
            component: () => import("@/page/exam/start-exam/waitMark")
          },
          {
            path: "/markQuestion",
            name: "markQuestion",
            component: () => import("@/page/exam/start-exam/markQuestion")
          }
        ]
      }
    ]
  }
]

export { StartRouter }
