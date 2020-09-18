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
                name: "inspection_writeInfoRecord",
                meta: {
                title: "记录详情",
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
                path: "/recordModleManage",
                name: "inspection_recordModleManage",
                meta: {
                title: "模板管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/recordModleManage.vue")
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
            // pdf
            {
                // 文书-列表
                path: "/inspectionMyPDF/id=:id&storagePath:storagePath",
                name: "inspection_myPDF",
                meta: {
                title: "责令改正违法行为通知书",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/file/xzjcPDF.vue")
            },
            // 文书属性配置-----start---------------------------------------------------------------------------------
            {
                path: "/inspection_fileTypeBind",
                name: "inspection_fileTypeBind",
                meta: {
                title: "属性配置",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/bindManage/fileTypeBind.vue")
            },
            {
                path: "/inspection_fileManage",
                name: "inspection_fileManage",
                meta: {
                title: "文书配置",
                oneTab:true,
                },
                component: () => import("@/page/inspection/record-manage/bindManage/fileManage.vue")
            },
            // 双随机-----start----------------------------------------------------------------------------------------------
            {
                // 信息维护
                path: "/infoMaintains",
                name: "inspection_infoMaintains",
                meta: {
                title: "信息维护",
                oneTab:true,
                },
                component: () => import("@/page/inspection/doubly-stochastic/info-maintains/infoMaintains.vue")
            },
            {
                // 任务管理
                path: "/taskManage",
                name: "inspection_taskManage",
                meta: {
                title: "任务管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/doubly-stochastic/task-manage/taskManage.vue")
            },
            {
                // 检查结果
                path: "/checkResult",
                name: "inspection_inspectionResults",
                meta: {
                title: "检查结果",
                oneTab:true,
                },
                component: () => import("@/page/inspection/doubly-stochastic/check-result/checkResult.vue")
            },
            {
                // 随机抽取
                path: "/randomExtract",
                name: "inspection_randomExtract",
                meta: {
                title: "随机抽取",
                oneTab:true,
                },
                component: () => import("@/page/inspection/doubly-stochastic/double-random/doubleRandom.vue")
            },
            // 路警联合----start----------------------------------------------------------------------------------------------
            {
                path: "/inspection_overWeightForm",
                name: "inspection_overWeightForm",
                meta: {
                title: "超限超载记录",
                oneTab:true,
                },
                component: () => import("@/page/inspection/roadAndPolice/overWeightForm.vue")
            },
            {
                path: "/inspection_overWeightList",
                name: "inspection_overWeightList",
                meta: {
                title: "超限记录列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/roadAndPolice/overWeightList.vue")
            },
            {
                path: "/inspection_imageMange",
                name: "inspection_imageMange",
                meta: {
                title: "照片证据列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/roadAndPolice/imageMange.vue")
            },
            {
                // 文书-列表
                path: "/inspectionRAPFiles/id=:id",
                name: "inspection_inspectionRAPFiles",
                meta: {
                title: "记录文书列表",
                oneTab:true,
                },
                component: () => import("@/page/inspection/roadAndPolice/compoment/fileList.vue")
            },
            // 路警联合----end----------------------------------------------------------------------------------------------
            // 勤务管理--排班管理
            {
                path: "/dutyScheduling",
                name: "duty_scheduling",
                meta: {
                title: "排班管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/dutyManage/dutyScheduling.vue")
            },
            // 勤务管理--记录管理
            {
                path: "/dutyRecord",
                name: "duty_record",
                meta: {
                title: "记录管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/dutyManage/dutyRecord.vue")
            },
            // 行政检查--记录描述配置
            {
                path: "/recordDescription",
                name: "record_description",
                meta: {
                title: "记录描述配置",
                oneTab:true,
                },
                component: () => import("@/page/inspection/dutyManage/recordDescription.vue")
            },
            // 行政检查--情况分类配置
            {
                path: "/conditionClassify",
                name: "condition_classify",
                meta: {
                title: "情况分类配置",
                oneTab:true,
                },
                component: () => import("@/page/inspection/dutyManage/conditionClassify.vue")
            },
            // 勤务管理--日志管理
            {
                path: "/dutyJournal",
                name: "duty_journal",
                meta: {
                title: "日志管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/dutyManage/dutyJournal.vue")
            },
            // 日志管理--添加日志
            {
                path: "/addDutyJournal/:type/:page",
                name: "add_duty_journal",
                meta: {
                title: "添加日志",
                oneTab: true,
                },
                component: () => import("@/page/inspection/dutyManage/components/addJournalPage.vue")
            },
            // 日志管理--交接班
            {
                path: "/journalHandover/:page",
                name: "journal_handover",
                meta: {
                title: "交接班",
                oneTab: true,
                },
                component: () => import("@/page/inspection/dutyManage/components/addJournalPage.vue")
            },
            // 日志管理--路政详情
            {
                path: "/journalRoadDetail/:page",
                name: "journal_road_detail",
                meta: {
                title: "路政详情",
                oneTab: true,
                },
                component: () => import("@/page/inspection/dutyManage/components/addJournalPage.vue")
            },
            // 记录管理--添加记录
            {
                path: "/recordDetail/:page",
                name: "record_detail",
                meta: {
                title: "现场记录",
                oneTab: true,
                },
                component: () => import("@/page/inspection/dutyManage/components/recordDetail.vue")
            },

            // 记录管理--添加记录
            {
                path: "/serialManage",
                name: "serial-manage",
                meta: {
                title: "流水号管理",
                oneTab:true,
                },
                component: () => import("@/page/inspection/serial-number/serialManage.vue")
            },
        ]
    }, 
]
