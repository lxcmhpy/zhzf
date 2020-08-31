import MainContent from '@/components/mainContent'//Layout 是架构组件，不在后台返回，在文件里单独引入
export default  [
     //数据分析研判系统
     {
        name: "cxtj",
        path: "/cxtj",
        component: MainContent,
        meta: {
          title: "查询统计"
        },
        children: [
          {
            name: "联合查询",
            path: "/zdycxtj-manage",
            meta: {
              title: "联合查询"
            },
            component: () => import("@/page/cxtj/zdycxtj-manage/zdycxtj.vue")
          },
          {
            name: "大屏",
            path: "/dp-manage",
            meta: {
              title: "大屏"
            },
            component: () => import("@/page/cxtj/dp-manage/dp.vue")
          }
        ]
      },
      {
        name: "报表统计",
        path: "/bbtj",
        meta: {
          title: "报表统计"
        },
        component: MainContent,
        children: [
          {
            name: "路政业务统计报表",
            path: "/lzywtjbb-manage",
            meta: {
              title: "路政业务统计报表"
            },
            component: () => import("@/page/cxtj/bbtj/lzywtjbb-manage/lzywtjbb.vue")
          },
          {
            name: "路政案件统计报表",
            path: "/lzajtjbb-manage",
            meta: {
              title: "路政案件统计报表"
            },
            component: () => import("@/page/cxtj/bbtj/lzajtjbb-manage/lzajtjbb.vue")
          }
        ],
      },
      {
        name: "要素关联分析",
        path: "/ysglfx",
        meta: {
          title: "要素关联分析"
        },
        component: MainContent,
        children: [
          {
            name: "发案原因分析",
            path: "/fayyfx-manage",
            meta: {
              title: "发案原因分析"
            },
            component: () => import("@/page/glfx/ysglfx/fayyfx-manage/fayyfx.vue")
          },
          {
            name: "案发地点分布",
            path: "/afddfb-manage",
            meta: {
              title: "案发地点分布"
            },
            component: () => import("@/page/glfx/ysglfx/afddfb-manage/afddfb.vue")
          }
        ],
      },
      {
        name: "年度业务分析",
        path: "/ndywfx",
        meta: {
          title: "年度业务分析"
        },
        component: MainContent,
        children: [
          {
            name: "年度案件类型数量比重统计",
            path: "/ndajlxslbzfx-manage",
            meta: {
              title: "年度案件类型数量比重统计"
            },
            component: () => import("@/page/cxtj/ztfx/ndywfx/ndajlxslbzfx-manage/ndajlxslbzfx.vue")
          },
          {
            name: "年度案件类型罚没款比重统计",
            path: "/ndajlxfmkbzfx-manage",
            meta: {
              title: "年度案件类型罚没款比重统计"
            },
            component: () => import("@/page/cxtj/ztfx/ndywfx/ndajlxfmkbzfx-manage/ndajlxfmkbzfx.vue")
          },
          {
            name: "年度案件数量同比统计",
            path: "/ndajsltbtj-manage",
            meta: {
              title: "年度案件数量同比统计"
            },
            component: () => import("@/page/cxtj/ztfx/ndywfx/ndajsltbtj-manage/ndajsltbtj.vue")
          },
          {
            name: "年度案件罚没款同比统计",
            path: "/ndajfmktbtj-manage",
            meta: {
              title: "年度案件罚没款同比统计"
            },
            component: () => import("@/page/cxtj/ztfx/ndywfx/ndajfmktbtj-manage/ndajfmktbtj.vue")
          }
        ],
      },
      {
        name: "案件分析",
        path: "/ajfx",
        meta: {
          title: "案件分析"
        },
        component: MainContent,
        children: [
          {
            name: "案件数量时间趋势分析",
            path: "/ajslsjqsfx-manage",
            meta: {
              title: "案件数量时间趋势分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/ajslsjqsfx-manage/ajslsjqsfx.vue")
          },
          {
            name: "案件数量对比分析",
            path: "/ajsldbfx-manage",
            meta: {
              title: "案件数量对比分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/ajsldbfx-manage/ajsldbfx.vue")
          },
          {
            name: "案件发案数量同比分析",
            path: "/ajfasltbfx-manage",
            meta: {
              title: "案件发案数量同比分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/ajfasltbfx-manage/ajfasltbfx.vue")
          },
          {
            name: "案件罚没款比重分析",
            path: "/ajfmkbzfx-manage",
            meta: {
              title: "案件罚没款比重分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/ajfmkbzfx-manage/ajfmkbzfx.vue")
          },
        ],
      },
      {
        name: "主题分析",
        path: "/ztfx",
        meta: {
          title: "主题分析"
        },
        component: MainContent,
        children: [
          {
            name: "电子化办案分析",
            path: "/dzhbafx-manage",
            meta: {
              title: "电子化办案分析"
            },
            component: () => import("@/page/cxtj/ztfx/dzhbafx-manage/dzhbafx.vue")
          },
          {
            name: "巡查里程分析",
            path: "/xclcfx-manage",
            meta: {
              title: "巡查里程分析"
            },
            component: () => import("@/page/cxtj/ztfx/xclcfx-manage/xclcfx.vue")
          },
        ],
      },
      {
        name: "glfx",
        path: "/glfx",
        component: MainContent,
        meta: {
          title: "关联分析"
        },
        children: [
          {
            name: "人员关联分析",
            path: "/yrglfx-manage",
            meta: {
              title: "人员关联分析"
            },
            component: () => import("@/page/glfx/yrglfx-manage/yrglfx.vue")
          },
          {
            name: "时间关联分析",
            path: "/sjglfx-manage",
            meta: {
              title: "时间关联分析"
            },
            component: () => import("@/page/glfx/sjglfx-manage/sjglfx.vue")
          },
          {
            name: "空间关联分析",
            path: "/kjglfx-manage",
            meta: {
              title: "空间关联分析"
            },
            component: () => import("@/page/glfx/kjglfx-manage/kjglfx.vue")
          },
          {
            name: "违法行为关联分析",
            path: "/wfxwglfx-manage",
            meta: {
              title: "违法行为关联分析"
            },
            component: () => import("@/page/glfx/wfxwglfx-manage/wfxwglfx.vue")
          },
          {
            name: "趋势关联分析",
            path: "/qsglfx-manage",
            meta: {
              title: "趋势关联分析"
            },
            component: () => import("@/page/glfx/qsglfx-manage/qsglfx.vue")
          }
        ]
      },
      {
        name: "专项行动分析研判",
        path: "/zxxdfxyp",
        meta: {
          title: "专项行动研判"
        },
        component: MainContent,
        children: [
          {
            name: "案件当事人特征分析",
            path: "/ajdsrtzfx-manage",
            meta: {
              title: "案件当事人特征分析"
            },
            component: () => import("@/page/fxyp/zxxdfxyp/ajdsrtzfx-manage/ajdsrtzfx.vue")
          },
          {
            name: "案件高发时段分析",
            path: "/ajgfsdfx-manage",
            meta: {
              title: "案件高发时段分析"
            },
            component: () => import("@/page/fxyp/zxxdfxyp/ajgfsdfx-manage/ajgfsdfx.vue")
          }
        ],
      },
      {
        name: "分析研判",
        path: "/fxyp",
        component: MainContent,
        meta: {
          title: "分析研判"
        },
        children: [
          {
            name: "法律法规分析研判",
            path: "/flfgfxyp-manage",
            meta: {
              title: "法律法规分析研判"
            },
            component: () => import("@/page/fxyp/flfgfxyp-manage/flfgfxyp.vue")
          },
          {
            name: "政策制定分析研判",
            path: "/zczdfxyp-manage",
            meta: {
              title: "政策制定分析研判"
            },
            component: () => import("@/page/fxyp/zczdfxyp-manage/zczdfxyp.vue")
          },
          
          {
            name: "监管治理分析研判",
            path: "/jgzlfxyp-manage",
            meta: {
              title: "监管治理分析研判"
            },
            component: () => import("@/page/fxyp/jgzlfxyp-manage/jgzlfxyp.vue")
          }
        ]
        
      },
      {
        name: "许可分析",
        path: "/xkfx",
        meta: {
          title: "许可分析"
        },
        component: MainContent,
        children: [
          {
            name: "许可类型比重分析",
            path: "/xklxbzfx-manage",
            meta: {
              title: "许可类型比重分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/xkfx/xklxbzfx-manage/xklxbzfx.vue")
          },
          {
            name: "许可数量对比分析",
            path: "/xksldbfx-manage",
            meta: {
              title: "许可数量对比分析"
            },
            component: () => import("@/page/cxtj/ztfx/ajfx/xkfx/xksldbfx-manage/xksldbfx.vue")
          }
        ],
      },
]