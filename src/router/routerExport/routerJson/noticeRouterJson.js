import MainContent from '@/components/mainContent' //Layout 是架构组件，不在后台返回，在文件里单独引入
export default [{
    path: "/trendsManagement",
    name: "trendsManagement",
    meta: {
      title: "执法动态"
    },
    component: () => import("@/page/notice/trends/trendsManagement.vue")
  },
  {
    path: "/policyManagement",
    name: "policyManagement",
    meta: {
      title: "政策公告"
    },
    component: () => import("@/page/notice/policy/policyManagement.vue")
  },
  {
    path: "/discretionManagement",
    name: "discretionManagement",
    meta: {
      title: "自由裁量"
    },
    component: () => import("@/page/notice/policy/discretionManagement.vue")
  },
  {
    path: "/powerManagement",
    name: "powerManagement",
    meta: {
      title: "权责清单"
    },
    component: () => import("@/page/notice/event-before/powerManagement.vue")
  },
  {
    path: "/agencyManagement",
    name: "agencyManagement",
    meta: {
      title: "执法主体"
    },
    component: () => import("@/page/notice/event-before/agencyManagement.vue")
  },
  {
    path: "/checkResultManagement",
    name: "checkResultManagement",
    meta: {
      title: "检查结果"
    },
    component: () => import("@/page/notice/event-after/checkResultManagement.vue")
  },
  {
    path: "/complaintManagment",
    name: "complaintManagment",
    meta: {
      title: "投诉举报管理"
    },
    component: () => import("@/page/notice/complaint/complaintManagement.vue")
  },
  {
    path: "/websiteManagement",
    name: "websiteManagement",
    meta: {
      title: "网站设置"
    },
    component: () => import("@/page/notice/website/websiteManagement.vue")
  },
  {
    path: "/imagesManagement",
    name: "imagesManagement",
    meta: {
      title: "轮播图设置"
    },
    component: () => import("@/page/notice/trends/imagesManagement.vue")
  },
  {
    path: "/lawsManagement",
    name: "lawsManagement",
    meta: {
      title: "法律法规"
    },
    component: () => import("@/page/notice/policy/lawsManagement.vue")
  },
  {
    path: "/personManagement",
    name: "personManagement",
    meta: {
      title: "执法人员"
    },
    component: () => import("@/page/notice/event-before/personManagement.vue")
  },
  {
    path: "/caseManagement",
    name: "caseManagement",
    meta: {
      title: "执法案件"
    },
    component: () => import("@/page/notice/event-after/caseManagement.vue")
  },
]
