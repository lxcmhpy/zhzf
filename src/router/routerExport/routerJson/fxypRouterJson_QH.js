import MainContent from '@/components/mainContent'
export default [
       //青海数据分析研判系统
      {
        name: "ldjsc",
        path: "/ldjsc",
        component: MainContent,
        meta: {
          title: "领导驾驶舱"
        },
        children: [
          {
            name: "领导驾驶舱",
            path: "/ldjsc",
            meta: {
              title: "领导驾驶舱"
            },
            component: () => import("@/page/qhzf/ldjsc/ldjsc.vue")
          },
        ]
      },
      {
        name: "综合查询",
        path: "/zhcx",
        meta: {
          title: "综合查询"
        },
        component: MainContent,
        children: [
          {
            name: "综合查询",
            path: "/zhcx",
            meta: {
              title: "综合查询"
            },
            component: () => import("@/page/qhzf/zhcx/zhcx.vue")
          }
        ],
      },
      {
        name: "报表分析",
        path: "/bbfx",
        meta: {
          title: "报表分析"
        },
        component: MainContent,
        children: [
          {
            name: "案件统计报表",
            path: "/ajtjbb",
            meta: {
              title: "案件统计报表"
            },
            component: () => import("@/page/qhzf/bbfx/ajtjbb/ajtjbb.vue")
          }
        ],
      },
     
      {
        name: "执法案件主题",
        path: "/zfajzt",
        meta: {
          title: "执法案件主题"
        },
        component: MainContent,
        children: [
          {
            name: "ajslsjqsfx",
            path: "/ajslsjqsfx",
            meta: {
              title: "案件数量时间趋势分析"
            },
            component: () => import("@/page/qhzf/ztfx/zfajzt/ajslsjqsfx-manage/ajslsjqsfx.vue")
          },
          {
            name: "ajsldbfx",
            path: "/ajsldbfx",
            meta: {
              title: "案件数量对比分析"
            },
            component: () => import("@/page/qhzf/ztfx/zfajzt/ajsldbfx-manage/ajsldbfx.vue")
          },
          {
            name: "ajfasltbfx",
            path: "/ajfasltbfx",
            meta: {
              title: "案件案发数量同比分析"
            },
            component: () => import("@/page/qhzf/ztfx/zfajzt/ajfasltbfx-manage/ajfasltbfx.vue")
          },
          {
            name: "ajfmkbzfx",
            path: "/ajfmkbzfx",
            meta: {
              title: "案件罚没款比重分析"
            },
            component: () => import("@/page/qhzf/ztfx/zfajzt/ajfmkbzfx-manage/ajfmkbzfx.vue")
          },
        ],
      },
      {
        name: "执法人员主题",
        path: "/zfryzt",
        meta: {
          title: "执法人员主题"
        },
        component: MainContent,
        children: [
          {
            name: "zfryzt",
            path: "/zfryzt",
            meta: {
              title: "电子化办案分析"
            },
            component: () => import("@/page/qhzf/ztfx/zfryzt/zfryzt.vue")
          }
        ],
      },
      {
        name: "聚类分析",
        path: "/jlfx",
        component: MainContent,
        meta: {
          title: "聚类分析"
        },
        children: [
          {
            name: "高发时段分析",
            path: "/gfsdfx",
            meta: {
              title: "高发时段分析"
            },
            component: () => import("@/page/qhzf/jlfx/gfsdfx/gfsdfx.vue")
          },
          {
            name: "投诉举报高发时段分析",
            path: "/tsjbgfsdfx",
            meta: {
              title: "投诉举报高发时段分析"
            },
            component: () => import("@/page/qhzf/jlfx/tsjbgfsdfx/tsjbgfsdfx.vue")
          },
          
        ]
      },
      {
        name: "空间分析",
        path: "/kjfx",
        component: MainContent,
        meta: {
          title: "空间分析"
        },
        children: [
          {
            name: "数据预处理",
            path: "/sjycl",
            meta: {
              title: "数据预处理"
            },
            component: () => import("@/page/qhzf/kjfx/sjycl/sjycl.vue")
          },
          {
            name: "执法案件查询分析",
            path: "/zfajcxfx",
            meta: {
              title: "执法案件查询分析"
            },
            component: () => import("@/page/qhzf/kjfx/zfajcxfx/zfajcxfx.vue")
          },
          {
            name: "执法案件区域分布分析",
            path: "/zfajqyfbfx",
            meta: {
              title: "执法案件区域分布分析"
            },
            component: () => import("@/page/qhzf/kjfx/zfajqyfbfx/zfajqyfbfx.vue")
          },
          {
            name: "执法案件性质时空分布分析",
            path: "/zfajxzskfbfx",
            meta: {
              title: "执法案件性质时空分布分析"
            },
            component: () => import("@/page/qhzf/kjfx/zfajxzskfbfx/zfajxzskfbfx.vue")
          },
          {
            name: "执法案件来源时空分布分析",
            path: "/zfajlyskfbfx",
            meta: {
              title: "执法案件来源时空分布分析"
            },
            component: () => import("@/page/qhzf/kjfx/zfajlyskfbfx/zfajlyskfbfx.vue")
          }
        ]
        
      },
      {
        name: "专题报告",
        path: "/ztbg",
        meta: {
          title: "专题报告"
        },
        component: MainContent,
        children: [
          {
            name: "专题报告",
            path: "/ztbg",
            meta: {
              title: "专题报告"
            },
            component: () => import("@/page/qhzf/ztbg/ztbg.vue")
          }
        ],
      },
    
    ]


