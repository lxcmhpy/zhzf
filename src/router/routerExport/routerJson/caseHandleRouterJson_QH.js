export default [

    {
        path: "/paymentReceipt",
        name: "case_handle_paymentReceipt_QH",
        meta: {
            title: "收费凭据表"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/paymentReceipt.vue")
    },
    {
        path: "/wayPaymentCun_QH",
        name: "case_handle_WayPaymentCun_QH",
        meta: {
            title: "公路赔（补）偿通知书（存根）"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/wayPaymentCun_QH.vue")
    },
    {
        path: "/wayPayments_QH",
        name: "case_handle_WayPayment_QH",
        meta: {
            title: "公路赔（补）偿通知书"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/wayPayment_QH.vue")
    },
    {
        path: "/wayPaymentList_QH",
        name: "case_handle_WayPaymentList_QH",
        meta: {
            title: "公路路产损坏赔（补）偿清单"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/wayPaymentList_QH.vue")
    },
    {
        path: "/paymentReport_QH",
        name: "case_handle_paymentReport_QH",
        meta: {
            title: "公路赔（补）偿案件调查报告"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/paymentReport_QH.vue")
    },
    {
        path: "/compensationNoticeForm_QH",
        name: "case_handle_compensationNoticeForm_QH",
        meta: {
          title: "公路赔（补）偿通知书"
        },
        component: () => import("@/page/caseHandle/case/qingHai/form/compensationNoticeForm_QH.vue")
    },
    {
        path: "/finishCaseReport_QH",
        name: "case_handle_finishCaseReport_QH",
        meta: {
          title: "公路赔（补）偿案件结案报告"
        },
        component: () => import("@/page/caseHandle/case/qingHai/form/finishCaseReport_QH.vue")
    },
    {
        path: "/publishReport_QH",
        name: "case_handle_publishReport_QH",
        meta: {
          title: "公告"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/publishReport_QH.vue")
    },
]