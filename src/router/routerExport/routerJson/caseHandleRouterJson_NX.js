export default [

    {
      path: "/adminCoerciveMeasureApproval_NX",
      name: "case_handle_adminCoerciveMeasureApproval_NX",
      meta: {
        title: "交通运输行政强制措施审批-宁夏"
      },
      component: () => import("@/page/caseHandle/case/ningXia/doc/adminCoerciveMeasureApproval_NX.vue")
    },
    {
      path: "/giveUpStatement_NX",
      name: "case_handle_giveUpStatement_NX",
      meta: {
        title: "放弃陈述申辩及听证权利的说明-宁夏"
      },
      component: () => import("@/page/caseHandle/case/ningXia/doc/giveUpStatement_NX.vue")
    },
    {
      path: "/payStageDoc_NX",
      name: "case_handle_payStageDoc_NX",
      meta: {
        title: "分期（延期）缴纳罚款申请书-宁夏"
      },
      component: () => import("@/page/caseHandle/case/ningXia/doc/payStageDoc_NX.vue")
    },
    

]
