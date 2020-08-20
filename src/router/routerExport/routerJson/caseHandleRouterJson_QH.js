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
        path: "/paymentReceipt",
        name: "case_handle_paymentReceipt_QH",
        meta: {
            title: "公路赔（补）偿通知书（存根）"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/paymentReceipt.vue")
    },
    {
        path: "/paymentReceipt",
        name: "case_handle_paymentReceipt_QH",
        meta: {
            title: "公路赔（补）偿通知书"
        },
        component: () => import("@/page/caseHandle/case/qingHai/doc/paymentReceipt.vue")
    },
]