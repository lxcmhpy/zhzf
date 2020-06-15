
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
      path: "/catsAppraisalStartUpAdd",
      name: "catsAppraisalStartUpAdd",
      meta: {
        title: "评议考核发起"
      },
      component: () => import("@/page/catsAppraisalExamination/catsAppraisalStartUpAdd.vue")
  }, {
      path: "/noticeManage",
      name: "noticeManage",
      meta: {
        title: "公告信息"
      },
      component: () => import("@/page/catsAppraisalExamination/noticeManage/noticeManage.vue")
  },
  {
    path: "/catsAppraisalExamination",
    name: "catsAppraisalExamination",
    meta: {
      title: "评议考核首页面"
    },
    component: () => import("@/page/catsAppraisalExamination/assessExtract/assessExtract.vue")

}
, {
    path: "/personExtract",
    name: "personExtract",
    meta: {
      title: "人员抽取"
    },
    component: () => import("@/page/catsAppraisalExamination/assessExtract/personExtract.vue")
  },{
    path: "/caseExtract",
    name: "caseExtract",
    meta: {
      title: "案件抽取"
    },
    component: () => import("@/page/catsAppraisalExamination/assessExtract/caseExtract.vue")
  }

  , {
    path: "/catsAppraisalSelf",
    name: "catsAppraisalSelf",
    meta: {
      title: "自查自评"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalSelf.vue")
  }
]
