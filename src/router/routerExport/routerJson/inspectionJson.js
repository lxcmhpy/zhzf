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
                path: "/writeRecordInfo",
                name: "inspection_writeRecordInfo",
                meta: {
                title: "写记录",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/writeRecord.vue")
            },
            {
                // 写记录
                path: "/writeRecordInfos",
                name: "inspection_writeRecordInfos",
                meta: {
                title: "写记录",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/writeRecord.vue")
            },
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
        ]
    }, 
]
