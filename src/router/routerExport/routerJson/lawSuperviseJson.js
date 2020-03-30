import Layout from '@/page/lagout/mainLagout'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        //可视化监管
        path: '/lawSupervise',
        name: 'lawSupervise1',
        component: Layout,
        children: [{
             //执法监管
                path: '/lawSupervise',
                name: 'lawSupervise',
                meta: {
                    title: "执法监管首页",
                    oneTab:true,
                },
                component: () => import("@/page/lawSupervise/lawSupervise.vue"),
            },

            {
                path: "/offSiteDetectionOverload",
                name: "offSiteDetectionOverload",
                meta: {
                title: "非现场治超检测",
                oneTab:true,
                },
                component: () => import("@/page/lawSupervise/offSiteDetectionOverload.vue")
            },
            {
                path: "/teamStrength",
                name: "teamStrength",
                meta: {
                title: "队伍力量",
                oneTab:true,
                },
                component: () => import("@/page/lawSupervise/teamStrength.vue")
            }
        ]
    }, {
        //线索中心
        path: '/clueManage',
        name: 'clueManage',
        component: Layout,
        children: [{
               path: '/offSiteManage',
               name: 'offSiteManage',
               meta: {
                   title: '非现场治超',
                   oneTab:true,
               },
               component: () => import("@/page/lawSupervise/offSiteManage.vue"),
           }, {
               path: '/offSiteDetail',
               name: 'offSiteDetail',
               meta: {
                   title: '线索详情'
               },
               component: () => import("@/page/lawSupervise/offSiteDetail.vue")
           }, {
                path: '/evidenceDetail',
                name: 'evidenceDetail',
                meta: {
                    title: '证据详情'
                },
                component: () => import("@/page/lawSupervise/evidenceDetail.vue")
           }]
    }
]
