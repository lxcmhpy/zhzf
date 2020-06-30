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
      title: "现场笔录——江西"
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
      title: "重大行政执法决定法制审核表"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/majorAdminLawEnforceAudit.vue")
  },
  {
    path: "/hearingReportDoc",
    name: "case_handle_hearingReportDoc",
    meta: {
      title: "听证报告书"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/hearingReportDoc.vue")
  },
  {
    path: "/forceCorrect_JX",
    name: "case_handle_forceCorrect_JX",
    meta: {
      title: "责令改正违法行为通知书-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/forceCorrect_JX.vue")
  },
  {
    path: "/deliveryConfirmDoc",
    name: "case_handle_deliveryConfirmDoc",
    meta: {
      title: "执法文书送达地址确认书"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/deliveryConfirmDoc.vue")
  },
  {
    path: "/enforceDecideDoc_JX",
    name: "case_handle_enforceDecideDoc_JX",
    meta: {
      title: "行政强制执行决定书-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/enforceDecideDoc_JX.vue")
  },
  {
    path: "/finishCaseReport_JX",
    name: "case_handle_finishCaseReport_JX",
    meta: {
      title: "结案报告-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/finishCaseReport_JX.vue")
  },
  {
    path: "/spotAdmPunishDecisionDoc_JX",
    name: "case_handle_spotAdmPunishDecisionDoc_JX",
    meta: {
      title: "当场行政处罚决定书-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/spotAdmPunishDecisionDoc_JX.vue")
  },
  {
    path: "/punishDecisionDoc_JX",
    name: "case_handle_punishDecisionDoc_JX",
    meta: {
      title: "行政处罚决定书-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/punishDecisionDoc_JX.vue")
  },
  {
    path: "/caseInvestigReport_JX",
    name: "case_handle_caseInvestigReport_JX",
    meta: {
      title: "案件调查报告-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/caseInvestigReport_JX.vue")
  },
  {
    path: "/payStageDoc_JX",
    name: "case_handle_payStageDoc_JX",
    meta: {
      title: "分期（延期）缴纳罚款通知书-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/doc/payStageDoc_JX.vue")
  },
  {
    path: "/caseDoc_JX",
    name: "case_handle_caseDoc_JX",
    meta: {
      title: "案件调查-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/caseDoc_JX")
  },
  {
    path: "/punishDecisionForm_JX",
    name: "case_handle_punishDecisionForm_JX",
    meta: {
      title: "处罚决定-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/punishDecisionForm_JX")
  },
  {
    path: "/partyRightsForm_JX",
    name: "case_handle_partyRightsForm_JX",
    meta: {
      title: "当事人权利-江西"
    },
    component: () => import("@/page/caseHandle/case/jiangxi/form/partyRightsForm_JX")
  },
]

