
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
    }
]
