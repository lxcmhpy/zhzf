export default [
    {
        path: "/catsAppraisalSet",
        name: "catsAppraisalSet",
        meta: {
            title: "考核参数设置"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalSet.vue")
    },
    {
        path: "/catsAppraisalStartUp",
        name: "catsAppraisalStartUp",
        meta: {
            title: "评议考核发起"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalStartUp.vue")
    },
    {
        path: "/catsAppraisalStartUpAdd",
        name: "catsAppraisalStartUpAdd",
        meta: {
            title: "评议考核发起信息"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalStartUpAdd.vue"
            )
    },
    {
        path: "/noticeManage",
        name: "noticeManage",
        meta: {
            title: "公告信息"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/noticeManage/noticeManage.vue"
            )
    },
    {
        path: "/catsAppraisalExamination",
        name: "catsAppraisalExamination",
        meta: {
            title: "评议考核首页面", 
        },
        component: () => import("@/page/catsAppraisalExamination/assessExtract/assessExtract.vue")
        //component: () => import("@/page/catsAppraisalExamination/home.vue")
    },
    {
        path: "/personExtract",
        name: "personExtract",
        meta: {
            title: "人员抽取"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/assessExtract/personExtract.vue"
            )
    },
    {
        path: "/caseExtract",
        name: "caseExtract",
        meta: {
            title: "案卷抽取"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/assessExtract/caseExtract.vue"
            )
    },

    {
        path: "/catsAppraisalSelf",
        name: "catsAppraisalSelf",
        meta: {
            title: "自查推优"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalSelf.vue")
    },
    {
        path: "/catsAppraisalOnLine",
        name: "catsAppraisalOnLine",
        meta: {
            title: "网上评查"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalOnLine.vue")
    },
    {
        path: "/catsAppraisalOnLineAdd",
        name: "catsAppraisalOnLineAdd",
        meta: {
            title: "网上评查评分"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalOnLineAdd.vue")
    },
    {
        path: "/catsAppraisalOffLine",
        name: "catsAppraisalOffLine",
        meta: {
            title: "现场检查"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalOffLine.vue")
    },
    {
        path: "/catsAppraisalOffLineAdd",
        name: "catsAppraisalOffLineAdd",
        meta: {
            title: "现场检查评分"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalOffLineAdd.vue"
            )
    },
    {
        path: "/catsAppraisalGrade",
        name: "catsAppraisalGrade",
        meta: {
            title: "案卷初评"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalGrade.vue")
    },
    {
        path: "/catsAppraisalGradeAdd",
        name: "catsAppraisalGradeAdd",
        meta: {
            title: "案卷初评评分"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalGradeAdd.vue")
    },
    {
        path: "/catsAppraisalReGrade",
        name: "catsAppraisalReGrade",
        meta: {
            title: "案卷复评"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalReGrade.vue")
    },
    {
        path: "/catsAppraisalReGradeAdd",
        name: "catsAppraisalReGradeAdd",
        meta: {
            title: "案卷复评评分"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalReGradeAdd.vue"
            )
    },
    {
        path: "/catsAppraisalResult",
        name: "catsAppraisalResult",
        meta: {
            title: "本期考核结果"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalResult.vue")
    },
    {
        path: "/catsAppraisalPDF",
        name: "catsAppraisalPDF",
        meta: {
            title: "查看PDF"
        },
        component: () => import("@/page/catsAppraisalExamination/viewPDF.vue")
    },
    {
        path: "/catsAppraisalExperts",
        name: "catsAppraisalExperts",
        meta: {
            title: "推荐评查专家"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalExperts.vue")
    },
    {
        path: "/catsAppraisalExamResult",
        name: "catsAppraisalExamResult",
        meta: {
            title: "检查结果"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalExamResult.vue"
            )
    },
    {
        path: "/pykhBatchConfigManage",
        name: "pykhBatchConfigManage",
        meta: {
            title: "特殊设置"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/pykhBatchConfigManage.vue")
    },
    {
        path: "/catsAppraisalWorkProgress",
        name: "catsAppraisalWorkProgress",
        meta: {
            title: "检查工作进度"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalWorkProgress.vue"
            )
    },
    {
        path: "/caseAssign",
        name: "caseAssign",
        meta: {
            title: "评查案卷分配"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/caseAssign.vue")
    },
    {
        path: "/catsAppraisalExpertGrade",
        name: "catsAppraisalExpertGrade",
        meta: {
            title: "案件评查专家"
        },
        component: () =>
            import("@/page/catsAppraisalExamination/catsAppraisalExpertGrade.vue")
    }
];
