export default [
    {
        path: "/catsAppraisalExamPersonUpload",
        name: "catsAppraisalExamPersonUpload",
        meta: {
            title: "人员报送"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalExamUpload/catsAppraisalExamPersonUpload.vue"
            )
    },
    {
        path: "/catsAppraisalExamCaseUpload",
        name: "catsAppraisalExamCaseUpload",
        meta: {
            title: "案卷报送"
        },
        component: () =>
            import(
                "@/page/catsAppraisalExamination/catsAppraisalExamUpload/catsAppraisalExamCaseUpload.vue"
            )
    }
];
