import MainContent from '@/components/mainContent'

// 我的培训(个人培训)
export default [
  {
    path: '/myTrainingManage',
    name: 'myTrainingManage',
    component: MainContent,
    children: [
      {
        name: "myTrainingHome",
        path: "/training-home",
        meta: { title: "首页", loading: false },
        component: () => import('@/page/myTraining/home.vue')
      },
      {
        name: "dailyClassroom",
        path: "/daily-classroom",
        meta: { title: "日常课堂", loading: false },
        component: () => import("@/page/myTraining/dailyClassroom.vue")
      },
      {
        name: "myTraining",
        path: "/my-training",
        meta: { title: "我的培训", loading: false },
        component: () => import("@/page/myTraining/myTraining.vue")
      },
      {
        name: "MyMockExam",
        path: "/my-mock-exam",
        meta: { title: "模拟考试", loading: false },
        component: () => import("@/page/myTraining/mockExam.vue")
      },
      {
        name: "learningHistory",
        path: "/learning-history",
        meta: { title: "学习历史", loading: false },
        component: () => import("@/page/myTraining/learningHistory.vue")
      },
      {
        name: "myCredits",
        path: "/my-credits",
        meta: { title: "我的学分", loading: false },
        component: () => import("@/page/myTraining/myCredits.vue")
      },
      {
        name: "viewCourseDetail",
        path: "/view-course-detail",
        meta: { title: "课程详情", loading: false },
        component: () => import("@/page/myTraining/components/viewCourseware.vue")
      },
      {
        name: "startAnswerMockExam",
        path: "/answer-mockexam",
        meta: { title: "开始答题", loading: false, refuseBack: true },
        component: () => import("@/page/myTraining/components/startAnswer.vue")
      },
      {
        name: "CourseDetails",
        path: "/course-detail/:lessonId/:perId",
        meta: { title: "课程详情", loading: false },
        component: () => import("@/page/myTraining/components/courseDetails.vue")
      },
      {
        name: "startTrained",
        path: "/start-trained/:trainName/:trainperId",
        meta: { title: "开始培训", loading: false, refuseBack: true },
        component: () => import("@/page/myTraining/components/trainDetail.vue")
      }
    ]}
]