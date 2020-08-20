import MainContent from '@/components/mainContent' //Layout 是架构组件，不在后台返回，在文件里单独引入
export default [{
    path: "/trendsManagment",
    name: "trendsManagment",
    meta: {
      title: "执法动态"
    },
    component: () => import("@/page/notice/trends/trendsManagment.vue")
  },
  {
    path: "/policyManagment",
    name: "policyManagment",
    meta: {
      title: "政策公告"
    },
    component: () => import("@/page/notice/policy/policyManagment.vue")
  },
  {
    path: "/discretionManagment",
    name: "discretionManagment",
    meta: {
      title: "自由裁量"
    },
    component: () => import("@/page/notice/policy/discretionManagment.vue")
  },
  {
    path: "/powerManagment",
    name: "powerManagment",
    meta: {
      title: "权责清单"
    },
    component: () => import("@/page/notice/event-before/powerManagment.vue")
  },
  {
    path: "/agencyManagment",
    name: "agencyManagment",
    meta: {
      title: "执法主体"
    },
    component: () => import("@/page/notice/event-before/agencyManagment.vue")
  },
  {
    path: "/checkResultManagment",
    name: "checkResultManagment",
    meta: {
      title: "检查结果"
    },
    component: () => import("@/page/notice/event-after/checkResultManagment.vue")
  },
  {
    path: "/complaintManagment",
    name: "complaintManagment",
    meta: {
      title: "投诉举报"
    },
    component: () => import("@/page/notice/complaint/complaintManagment.vue")
  },
  {
    path: "/websiteManagment",
    name: "websiteManagment",
    meta: {
      title: "网站设置"
    },
    component: () => import("@/page/notice/website/websiteManagment.vue")
  },

]
