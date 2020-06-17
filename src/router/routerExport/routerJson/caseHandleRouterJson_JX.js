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
  {
    path: "/evidenceRegApprovalForm",
    name: "case_handle_evidenceRegApprovalForm",
    meta: {
      title: "证据登记保存审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/evidenceRegApprovalForm.vue")
  },
  {
    path: "/audioEvidenceRecord",
    name: "case_handle_audioEvidenceRecord",
    meta: {
      title: "视听资料（电子数据）证据记录单"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/audioEvidenceRecord.vue")
  },
  {
    path: "/removeEvidenceRegApprovalForm",
    name: "case_handle_removeEvidenceRegApprovalForm",
    meta: {
      title: "解除证据登记保存审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/removeEvidenceRegApprovalForm.vue")
  },
  {
    path: "/adminCoerciveMeasureApproval",
    name: "case_handle_adminCoerciveMeasureApproval",
    meta: {
      title: "行政强制措施审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/adminCoerciveMeasureApproval.vue")
  },
  {
    path: "/prolongAdminCoerciveMeasureApproval",
    name: "case_handle_prolongAdminCoerciveMeasureApproval",
    meta: {
      title: "延长行政强制措施审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/prolongAdminCoerciveMeasureApproval.vue")
  },
  {
    path: "/removeAdminCoerciveMeasureApproval",
    name: "case_handle_removeAdminCoerciveMeasureApproval",
    meta: {
      title: "行政强制措施解除审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/removeAdminCoerciveMeasureApproval.vue")
  },
  {
    path: "/sceneNotesDoc_JX",
    name: "case_handle_sceneNotesDoc_JX",
    meta: {
      title: "立案登记表——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/sceneNotesDoc_JX.vue")
  },
  {
    path: "/adminCoerciveMeasureNote_JX",
    name: "case_handle_adminCoerciveMeasureNote_JX",
    meta: {
      title: "行政强制措施现场笔录"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/adminCoerciveMeasureNote_JX.vue")
  },
  {
    path: "/adminPenaltyApprovalForm",
    name: "case_handle_adminPenaltyApprovalForm",
    meta: {
      title: "行政处罚审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/adminPenaltyApprovalForm.vue")
  },
  {
    path: "/stageDelayApprovalForm",
    name: "case_handle_stageDelayApprovalForm",
    meta: {
      title: "分期（延期）缴纳罚款审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/stageDelayApprovalForm.vue")
  },
  {
    path: "/enforceDecideApprovalForm",
    name: "case_handle_enforceDecideApprovalForm",
    meta: {
      title: "行政强制执行审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/enforceDecideApprovalForm.vue")
  },
  {
    path: "/abortEndRecoverApprovalForm",
    name: "case_handle_abortEndRecoverApprovalForm",
    meta: {
      title: "中止（终结、恢复）行政强制执行审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/abortEndRecoverApprovalForm.vue")
  },
  {
    path: "/majorAdminLawEnforceAudit",
    name: "case_handle_majorAdminLawEnforceAudit",
    meta: {
      title: "中止（终结、恢复）行政强制执行审批表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/majorAdminLawEnforceAudit.vue")
  },
]

