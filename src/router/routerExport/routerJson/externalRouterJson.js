// 外部链接 证据系统
export default [
    {
        path: "/archivingEvidence",
        name: "archivingEvidence",
        meta: {
          title: "归档证据管理"
        },
        component: () => import("@/page/sys/externalSys/myIframe.vue")
    },
    {
        path: "/originalEvidence",
        name: "originalEvidence",
        meta: {
          title: "原始证据管理"
        },
        component: () => import("@/page/sys/externalSys/myIframe.vue")
    }
]