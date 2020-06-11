
export default [
    {
      path: "/catsAppraisalExamReport",
      name: "catsAppraisalExamReport",
      meta: {
        title: "评议考核-上报"
      },
      component: () => import("@/page/catsAppraisalExamination/catsAppraisalExamReport.vue")
    }, {
        path: "/catsAppraisalExam",
        name: "catsAppraisalExam",
        meta: {
          title: "评议考核-考核"
        },
        component: () => import("@/page/catsAppraisalExamination/catsAppraisalExam.vue")
    }, {
        path: "/catsAppraisalSet",
        name: "catsAppraisalSet",
        meta: {
          title: "考核参数设置"
        },
        component: () => import("@/page/catsAppraisalExamination/catsAppraisalSet.vue")
    }, {
        path: "/catsAppraisalStartUp",
        name: "catsAppraisalStartUp",
        meta: {
          title: "评议考核发起"
        },
        component: () => import("@/page/catsAppraisalExamination/catsAppraisalStartUp.vue")
    }, {
      path: "/noticeManager",
      name: "noticeManager",
      meta: {
        title: "公告信息"
      },
      component: () => import("@/page/catsAppraisalExamination/noticeManage/noticeManage.vue")
  }
]
