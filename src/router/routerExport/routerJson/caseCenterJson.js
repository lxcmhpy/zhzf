import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        //可视化监管
        path: '/caseCenter',
        name: 'law_center_caseCenter1',
        component: MainContent,
        children: [
            {
                 // 事务中心
                   path: '/caseCenter',
                   name: 'law_center_caseCenter',
                   meta: {
                       title: "事务中心",
                       oneTab:true,
                   },
                   component: () => import("@/page/caseCenter/caseCenter.vue"),
               },

            {
                path: "/transferAndRegisterCase",
                name: "law_center_transferAndRegisterCase",
                meta: {
                    title: "转立案列表",
                    oneTab:true,
                },
                component: () => import("@/page/caseCenter/partyWaitDeal/transferAndRegisterCase.vue")
            },
            {
                path: "/overWeightCase",
                name: "law_center_overWeightCase",
                meta: {
                title: "超限案件列表",
                oneTab:true,
                },
                component: () => import("@/page/caseCenter/myWaitDeal/overWeightCase.vue")
            },
            {
                path: "/dentails-index/:path/:value",
                name: "law_center_dentails-index",
                meta: {
                title: "列表详情",
                oneTab:true,
                },
                component: () => import("@/page/caseCenter/dentails/dentails-index.vue")
            },
        ]
    }
]
