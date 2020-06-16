
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
  }, {
    path: "/catsAppraisalExamination",
    name: "catsAppraisalExamination",
    meta: {
      title: "评议考核首页面"
    },
    component: () => import("@/page/catsAppraisalExamination/home.vue")

}, {
    path: "/assessExtract",
    name: "assessExtract",
    meta: {
      title: "抽取"
    },
    component: () => import("@/page/catsAppraisalExamination/assessExtract/assessExtract.vue")
  }, {
    path: "/catsAppraisalSelf",
    name: "catsAppraisalSelf",
    meta: {
      title: "自查自评"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalSelf.vue")
  }, {
    path: "/catsAppraisalOnLine",
    name: "catsAppraisalOnLine",
    meta: {
      title: "网上评查"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalOnLine.vue")
  }, {
    path: "/catsAppraisalOnLineAdd",
    name: "catsAppraisalOnLineAdd",
    meta: {
      title: "网上评查评分"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalOnLineAdd.vue")
  }, {
    path: "/catsAppraisalOffLine",
    name: "catsAppraisalOffLine",
    meta: {
      title: "现场检查"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalOffLine.vue")
  }, {
    path: "/catsAppraisalOffLineAdd",
    name: "catsAppraisalOffLineAdd",
    meta: {
      title: "现场检查评分"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalOffLine.vue")
  }, {
    path: "/catsAppraisalGrade",
    name: "catsAppraisalGrade",
    meta: {
      title: "案卷初评"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalGrade.vue")
  }, {
    path: "/catsAppraisalGradeAdd",
    name: "catsAppraisalGradeAdd",
    meta: {
      title: "案卷初评评分"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalGradeAdd.vue")
  }, {
    path: "/catsAppraisalReGrade",
    name: "catsAppraisalReGrade",
    meta: {
      title: "案卷复评"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalReGrade.vue")
  }, {
    path: "/catsAppraisalReGradeAdd",
    name: "catsAppraisalReGradeAdd",
    meta: {
      title: "案卷复评评分"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalReGradeAdd.vue")
  }, {
    path: "/catsAppraisalResult",
    name: "catsAppraisalResult",
    meta: {
      title: "本期考核结果"
    },
    component: () => import("@/page/catsAppraisalExamination/catsAppraisalResult.vue")
  }
]
