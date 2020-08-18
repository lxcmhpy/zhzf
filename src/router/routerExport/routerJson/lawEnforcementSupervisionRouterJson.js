import MainContent from '@/components/mainContent'

export default [
    {
        //可视化监管
        path: '/lawEnforcementSupervision',
        name: 'lawEnforcementSupervision',
        meta: {
          title: "执法监督",
          oneTab:true,
        },
        component: MainContent,
        children: [
            {
                //案件监督
                path: '/caseSupervision',
                name: 'caseSupervision',
                meta: {
                  title: "案件监督",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/caseSupervision/caseSupervision.vue"),
              },
              {
                //重大案件监督
                path: '/majorCaseSupervision',
                name: 'majorCaseSupervision',
                meta: {
                  title: "重大案件监督",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/majorCaseSupervision/majorCaseSupervision.vue"),
              },
              {
                //行政复议案件监督
                path: '/adminReviewCaseSupervision',
                name: 'adminReviewCaseSupervision',
                meta: {
                  title: "行政复议案件监督",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/adminReviewCaseSupervision/adminReviewCaseSupervision.vue"),
              },
              {
                //案卷评查
                path: '/archivesReview',
                name: 'archivesReview',
                meta: {
                  title: "案卷评查",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/archivesReview/archivesReview.vue"),
              },
              {
                //pdf
                path: '/lawEnforcementSupervision_casePDF',
                name: 'lawEnforcementSupervision_casePDF',
                meta: {
                  title: "pdf",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/components/casePDF.vue"),
              },
              {
                //督办记录
                path: '/lawEnforcementSupervision_supervisionRecord',
                name: 'lawEnforcementSupervision_supervisionRecord',
                meta: {
                  title: "督办记录",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/caseSupervision/supervisionRecord.vue"),
              },
              {
                //督办记录
                path: '/lawEnforcementSupervision_caseFileList',
                name: 'lawEnforcementSupervision_caseFileList',
                meta: {
                  title: "案件材料",
                  oneTab:true,
                },
                component: () => import("@/page/lawEnforcementSupervision/majorCaseSupervision/caseFileList.vue"),
              },
              {
                //案卷评查后台管理
                path: '/archivesReviewManage',
                name: 'archivesReviewManage',
                meta: {
                  title: "案卷评查",
                },
                component: () => import("@/page/sys/archivesReviewManage/archivesReviewManage.vue"),
              },
              {
                //案卷评查
                path: '/lawEnforcementSupervision_archivesReviewResult',
                name: 'lawEnforcementSupervision_archivesReviewResult',
                meta: {
                  title: "案卷评查",
                },
                component: () => import("@/page/lawEnforcementSupervision/archivesReview/archivesReviewResult.vue"),
              },
        ]
    }
]