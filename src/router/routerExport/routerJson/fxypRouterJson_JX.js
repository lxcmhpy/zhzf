import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
     //数据分析研判系统
     {
        name: "queryStatistics",
        path: "/queryStatistics",
        component: MainContent,
        meta: {
          title: "查询统计"
        },
        children: [
          {
            name: "lawCase_JX",
            path: "/lawCase_JX",
            meta: {
              title: "执法案件"
            },
            component: () => import("@/page/analyseManage/queryStatistics/lawCase.vue")
          },
          {
            name: "personEquip",
            path: "/personEquip",
            meta: {
              title: "人员装备"
            },
            component: () => import("@/page/analyseManage/queryStatistics/personEquip.vue")
          }
        ]
      },
      {
        name: "reportStatistics",
        path: "/reportStatistics",
        meta: {
          title: "报表统计"
        },
        component: MainContent,
        children: [
          {
            name: "transCase",
            path: "/transCase",
            meta: {
              title: "案件统计报表"
            },
            component: () => import("@/page/analyseManage/reportStatistics/transCase.vue")
          }
        ],
      },
      {
        name: "factorAnalysis",
        path: "/factorAnalysis",
        meta: {
          title: "要素关联分析"
        },
        component: MainContent,
        children: [
          {
            name: "caseReason",
            path: "/caseReason",
            meta: {
              title: "案发原因分析"
            },
            component: () => import("@/page/analyseManage/factorAnalysis/caseReason.vue")
          },
          {
            name: "caseAddress",
            path: "/caseAddress",
            meta: {
              title: "案发地点分布"
            },
            component: () => import("@/page/analyseManage/factorAnalysis/caseAddress.vue")
          }
        ],
      },
      {
        name: "caseAnalysis",
        path: "/caseAnalysis",
        meta: {
          title: "案件分析"
        },
        component: MainContent,
        children: [
          {
            name: "amountProportion",
            path: "/amountProportion",
            meta: {
              title: "案件类型数量比重统计"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/amountProportion.vue")
          },
          {
            name: "numberYTY",
            path: "/numberYTY",
            meta: {
              title: "案件类型数量同比分析"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/numberYTY.vue")
          },
          {
            name: "trend",
            path: "/trend",
            meta: {
              title: "案件数量时间趋势分析"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/trend.vue")
          },

          {
            name: "proportion",
            path: "/proportion",
            meta: {
              title: "案件罚没款比重分析"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/proportion.vue")
          },
          {
            name: "proportionYTY",
            path: "/proportionYTY",
            meta: {
              title: "案件罚没款同比统计"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/proportionYTY.vue")
          },
          {
            name: "feature",
            path: "/feature",
            meta: {
              title: "案件当事人特征分析"
            },
            component: () => import("@/page/analyseManage/caseAnalysis/feature.vue")
          },
        ],
      },
      {
        name: "themeAnalysis",
        path: "/themeAnalysis",
        meta: {
          title: "主题分析"
        },
        component: MainContent,
        children: [
          {
            name: "electronize",
            path: "/electronize",
            meta: {
              title: "电子化办案分析"
            },
            component: () => import("@/page/analyseManage/themeAnalysis/electronize.vue")
          }
        ],
      },
      {
        name: "relationAnalysis",
        path: "/relationAnalysis",
        component: MainContent,
        meta: {
          title: "关联分析"
        },
        children: [
          {
            name: "personAnalysis",
            path: "/personAnalysis",
            meta: {
              title: "人员关联分析"
            },
            component: () => import("@/page/analyseManage/relationAnalysis/personAnalysis.vue")
          },
          {
            name: "space",
            path: "/space",
            meta: {
              title: "空间关联分析"
            },
            component: () => import("@/page/analyseManage/relationAnalysis/space.vue")
          }
        ]
      },
      {
        name: "analyze",
        path: "/analyze",
        component: MainContent,
        meta: {
          title: "分析研判"
        },
        children: [
          {
            name: "laws",
            path: "/laws",
            meta: {
              title: "法律法规分析研判"
            },
            component: () => import("@/page/analyseManage/analyze/laws.vue")
          },
          {
            name: "supervision",
            path: "/supervision",
            meta: {
              title: "监管治理分析研判"
            },
            component: () => import("@/page/analyseManage/analyze/supervision.vue")
          },
          {
            name: "complaintStatistic",
            path: "/complaintStatistic",
            meta: {
              title: "网上投诉高发时段分析"
            },
            component: () => import("@/page/analyseManage/analyze/complaintStatistic.vue")
          }
        ]
      },
  {
    name: "report",
    path: "/report",
    meta: {
      title: "专题报告"
    },
    component: () => import("@/page/analyseManage/report/index.vue")
  },

]
