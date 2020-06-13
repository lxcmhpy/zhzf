export default [
  {
    path: "/catsAppraisalExamPersonUpload",
    name: "catsAppraisalExamPersonUpload",
    meta: {
      title: "评议考核-人员报送"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalExamUpload/catsAppraisalExamPersonUpload.vue")
  },
  {
    path: "/catsAppraisalExamCaseUpload",
    name: "catsAppraisalExamCaseUpload",
    meta: {
      title: "评议考核-案件报送"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalExamUpload/catsAppraisalExamCaseUpload.vue")
  }
]
