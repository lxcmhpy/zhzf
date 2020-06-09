import store from '@/store/index.js';

export default [

{
    path: "/assistInvestgation",
    name: "case_handle_assistInvestgation",
    meta: {
      title: "协助调查函"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/assistInvestigation_JX.vue")
  },
  {
    path: "/inspectionRecord",
    name: "case_handle_inspectionRecord",
    meta: {
      title: "检查记录"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/inspectionRecord_JX.vue")
  },
  {
    path: "/establish_JX",
    name: "case_handle_establish_JX",
    meta: {
      title: "立案登记表——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/establish_JX.vue")
  },
]