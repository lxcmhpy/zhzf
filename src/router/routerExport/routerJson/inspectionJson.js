import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
    {
        //行政检查
        path: '/inspection',
        name: 'inspection_inspection',
        meta: {
            title: "行政检查",
            oneTab:true,
        },
        component: MainContent,
        children: [
            {
                // 写记录
                path: "/writeRecord",
                name: "inspection_writeRecord",
                meta: {
                title: "写记录",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/writeRecordHome.vue")
            },
            {
                // 写记录
                path: "/writeRecordInfo/id=:id&addOrEiditFlag=:addOrEiditFlag",
                name: "inspection_writeRecordInfo",
                meta: {
                title: "写记录",
                // oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/writeRecord.vue"),
                // props: (route) => ({ query: route.query.q })
            },
            // {
            //     // 写记录
            //     path: "/writeRecordInfos",
            //     name: "inspection_writeRecordInfos",
            //     meta: {
            //     title: "写记录",
            //     oneTab:true,
            //     },
            //     component: () => import("@/page/inspection/record-manage/writeRecord.vue"),
            //     props: (route) => ({ query: route.query.q })
            // },
            {
                path: "/recordList",
                name: "inspection_recordList",
                meta: {
                title: "记录列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/recordList.vue")
            },
            {
                // 历史检查列表
                path: "/viewRecord",
                name: "inspection_viewRecord",
                meta: {
                title: "历史检查列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/viewRecord.vue")
            },
            {
                // 历史检查列表
                path: "/test",
                name: "inspection_test",
                meta: {
                title: "历史检查列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/test.vue")
            },
            {
                // 文书-责令改正违法行为通知书
                path: "/correctNotice",
                name: "inspection_correctNotice",
                meta: {
                title: "责令改正违法行为通知书",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/file/correctNotice.vue")
            },
            {
                // 文书-列表
                path: "/inspectionFiles/id=:id",
                name: "inspection_inspectionFiles",
                meta: {
                title: "文书列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/file/fileList.vue")
            },
            // 文书
            {
                // 文书-列表
                path: "/xzjcForceCorrect",
                name: "inspection_forceCorrect",
                meta: {
                title: "责令改正违法行为通知书",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/file/correctNotice.vue")
            },
        ]
    }, 
]
