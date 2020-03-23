import Layout from '@/page/lagout/mainLagout'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        //执法监管
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
    }
]
