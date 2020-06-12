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
    component: () => import("@/page/caseHandle/case/jiangxi/doc/stageDelayApprovalForm.vue")
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
    path: "/caseTransNoticeDoc",
    name: "case_handle_caseTransNoticeDoc",
    meta: {
      title: "案件移送告知书"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/caseTransNoticeDoc_JX.vue")
  },
  {
    path: "/caseTransLetter",
    name: "case_handle_caseTransLetter",
    meta: {
      title: "案件移送函"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/caseTransLetter_JX.vue")
  },
  {
    path: "/adminEnforceAgreeDoc",
    name: "case_handle_adminEnforceAgreeDoc",
    meta: {
      title: "行政强制执行协议书"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/adminEnforceAgreeDoc_JX.vue")
  },
  {
    path: "/executAnnounceDoc_JX",
    name: "case_handle_executAnnounceDoc_JX",
    meta: {
      title: "执行公告——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/executAnnounceDoc_JX.vue")
  },
  {
    path: "/remindLetterDoc_JX",
    name: "case_handle_remindLetterDoc_JX",
    meta: {
      title: "催告书——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/remindLetterDoc_JX.vue")
  },
  {
    path: "/importantCaseTeamDissDoc_JX",
    name: "case_handle_importantCaseTeamDissDoc_JX",
    meta: {
      title: "重大案件集体讨论记录——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/importantCaseTeamDissDoc_JX.vue")
  },
  {
    path: "/illegalActionForm_JX",
    name: "case_handle_illegalActionForm_JX",
    meta: {
      title: "违法行为通知书——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/illegalActionForm_JX.vue")
  },
  {
    path: "/hearingNotice_JX",
    name: "case_handle_hearingNotice_JX",
    meta: {
      title: "听证通知书——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/hearingNoticeDoc_JX.vue")
  },
  {
    path: "/enforceApplicationDoc",
    name: "case_handle_enforceApplicationDoc",
    meta: {
      title: "强制执行申请书——江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/enforceApplicationDoc.vue")
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
]