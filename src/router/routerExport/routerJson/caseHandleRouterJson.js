import store from '@/store/index.js';

export default [
  {
    path: "/deleteEvidence",
    name: "case_handle_deleteEvidence",
    meta: {
      title: "解除证据登记保存决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/deleteEvidence.vue")
  },
  {
    path: "/forceCorrect",
    name: "case_handle_forceCorrect",
    meta: {
      title: "责令改正违法行为通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/forceCorrect.vue")
  },
  {
    path: "/modle",
    name: "case_handle_modle",
    meta: {
      title: "标准文书模板"
    },
    component: () => import("@/page/caseHandle/case/modle/modle.vue")
  },
  {
    path: "/othermodle",
    name: "case_handle_othermodle",
    meta: {
      title: "询问笔录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/otherModle.vue")
  },
  {
    path: "/finishCaseReport",
    name: "case_handle_finishCaseReport",
    meta: {
      title: "结案报告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/finishCaseReport.vue")
  },
  {
    path: "/caseInvestig",
    name: "case_handle_caseInvestig",
    meta: {
      title: "案件调查报告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseInvestigReport.vue")
  },
  {
    path: "/caseDoc",
    name: "case_handle_caseDoc",
    meta: {
      title: "调查类文书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDoc.vue")
  },
  {
    path: "/obtaineEvidenceForm",
    name: "case_handle_obtaineEvidenceForm",
    meta: {
      title: "抽样取样凭证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/obtaineEvidenceFormReport.vue")
  },
  {
    path: "/deliveryCertificate",
    name: "case_handle_deliveryCertificate",
    meta: {
      title: "送达回证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/deliveryCertificate.vue")
  },
  {
    path: "/establish",
    name: "case_handle_establish",
    meta: {
      title: "立案登记表-pdf",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/unRecordCase/establish.vue")
  },
  {
    path: "/payStage",
    name: "case_handle_payStage",
    meta: {
      title: "分期（延期）缴纳罚款通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/payStageDoc.vue")
  },
  {
    path: "/executAnnounce",
    name: "case_handle_executAnnounce",
    meta: {
      title: "执行公告",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/executAnnounceDoc.vue")
  },
  //处罚执行
  {
    path: "/penaltyExecution",
    name: "case_handle_penaltyExecution",
    meta: {
      title: "处罚执行",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/PenaltyExecutionForm.vue")
  },
  //行政处罚决定书
  {
    path: "/adminPunishe",
    name: "case_handle_adminPunishe",
    meta: {
      title: "行政处罚决定书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/adminPunisheDecisionForm.vue")
  },
  //行政强制措施决定书
  {
    path: "/adminCoerciveMeasure",
    name: "case_handle_adminCoerciveMeasure",
    meta: {
      title: "行政强制措施决定书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/adminCoerciveMeasureForm.vue")
  },
  //不予处罚
  {
    path: "/noPenalty",
    name: "case_handle_noPenalty",
    meta: {
      title: "不予处罚",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/noPenalty.vue")
  },
  //当事人权利
  {
    path: "/partyRights",
    name: "case_handle_partyRights",
    meta: {
      title: "当事人权利",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/partyRightsForm.vue")
  },
  //强制执行
  {
    path: "/forceExecute",
    name: "case_handle_forceExecute",
    meta: {
      title: "强制执行",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/forceExecuteForm.vue")
  },
  //违法行为通知书
  {
    path: "/illegalActionForm",
    name: "case_handle_illegalActionForm",
    meta: {
      title: "违法行为通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/illegalActionForm.vue")
  },
  //听证通知书(流程中)
  {
    path: "/hearingNoticePdf",
    name: "case_handle_hearingNoticePdf",
    meta: {
      title: "听证通知书",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/hearingNoticeDoc.vue")
  },
  //听证笔录(流程中)
  {
    path: "/hearingRecordePdf",
    name: "case_handle_hearingRecordePdf",
    meta: {
      title: "听证笔录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/modle/hearingRecordDoc.vue")
  },
  //案件总览
  {
    path: "/caseInfo",
    name: "case_handle_caseInfo",
    meta: {
      title: "案件总览",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/waitDeal/caseInfo.vue")
  },
  {
    // path: '/flowChart/:id',
    path: '/flowChart',
    name: 'case_handle_flowChart',
    meta: {
      title: '流程图',
      oneTab: true,
    },
    component: () => import("@/components/flowChart/flowChart.vue")
  },
  //行政处罚决定书
  {
    path: "/punishDecisionDoc",
    name: "case_handle_punishDecisionDoc",
    meta: {
      title: "行政处罚决定书-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/punishDecisionDoc.vue")
  },
  //勘验笔录-doc
  {
    path: "/inquestNotesDoc",
    name: "case_handle_inquestNotesDoc",
    meta: {
      title: "勘验笔录-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/inquestNotesDoc.vue")
  },
  //现场笔录-doc
  {
    path: "/sceneNotesDoc",
    name: "case_handle_sceneNotesDoc",
    meta: {
      title: "现场笔录-doc",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/sceneNotesDoc.vue")
  },
  {
    path: "/inforCollect",
    name: "case_handle_inforCollect",
    meta: {
      title: "信息采集",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/unRecordCase/inforCollection.vue")
  },
  {
    path: "/myPDF",
    name: "case_handle_myPDF",
    meta: {
      title: "pdf" ,
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/caseDocument/myPDF.vue")
  },
  {
    path: "/viewPDF",
    name: "case_handle_viewPDF",
    meta: {
      title: "pdf展示"
    },
    component: () => import("@/components/htmlExportPDF/viewPDF.vue")
  },
  // -----------------信息查验start----------------
  {
    path: "/checkHome",
    name: "case_handle_checkHome",
    meta: {
      title: "信息查验首页"
    },
    component: () => import("@/page/checkInfo/checkHome.vue")
  },
  {
    path: "/transportWorker",
    name: "case_handle_transportWorker",
    meta: {
      // title: "道路运输从业人员"
      title: "信息查验"
    },
    component: () => import("@/page/checkInfo/transportWorker.vue")
  },
  {
    path: "/commercialVehicle",
    name: "case_handle_commercialVehicle",
    meta: {
      // title: "营运车辆"
      title: "信息查验"

    },
    component: () => import("@/page/checkInfo/commercialVehicle.vue")
  },
  {
    path: "/industry",
    name: "case_handle_industry",
    meta: {
      // title: "经营业户"
      title: "信息查验"

    },
    component: () => import("@/page/checkInfo/industry.vue")
  },
  {
    path: "/vehicleLine",
    name: "case_handle_vehicleLine",
    meta: {
      // title: "客运线路标志牌"
      title: "信息查验"

    },
    component: () => import("@/page/checkInfo/vehicleLine.vue")
  },
  {
    path: "/crewCertificates",
    name: "case_handle_crewCertificates",
    meta: {
      // title: "船员适任证查验"
      title: "信息查验"

    },
    component: () => import("@/page/checkInfo/crewCertificates.vue")
  },

  {
    path: "/shipCertificates",
    name: "case_handle_shipCertificates",
    meta: {
      // title: "国内（国际）船舶查询"
      title: "信息查验"

    },
    component: () => import("@/page/checkInfo/shipCertificates.vue")
  },
  // -----------------信息查验end----------------
  {
    path: "/archiveCover",
    name: "case_handle_archiveCover",
    meta: {
      title: "归档"
    },
    component: () => import("@/page/caseHandle/waitArchive/archiveCover.vue")
  },
  {
    path: "/archiveCatalogueDetail",
    name: "case_handle_archiveCatalogueDetail",
    meta: {
      title: "卷宗目录详情"
    },
    component: () => import("@/page/caseHandle/waitArchive/archiveCatalogueDetail.vue")
  },
  {
    path: "/addTransfer",
    name: "case_handle_addTransfer",
    meta: {
      title: "新增移送"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addPage.vue")
  },
  {
    path: "/addSelect",
    name: "case_handle_addSelect",
    meta: {
      title: "新增移送"
    },
    component: () => import("@/page/caseHandle/cooperateCases/selectPage.vue")
  },
  {
    path: "/cooperateDentails",
    name: "case_handle_cooperateDentails",
    meta: {
      title: "移送：案号"
    },
    component: () => import("@/page/caseHandle/cooperateCases/cooperateDentails.vue")
  },
  {
    path: "/addCopyTwo",
    name: "case_handle_addCopyTwo",
    meta: {
      title: "新增抄告"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addCopyTwo.vue")
  },
  {
    path: "/addCopyOne",
    name: "case_handle_addCopyOne",
    meta: {
      title: "新增抄告"
    },
    component: () => import("@/page/caseHandle/cooperateCases/addCopyOne.vue")
  },
  {
    path: "/caseCopyDentails",
    name: "case_handle_caseCopyDentails",
    meta: {
      title: "抄告：案号"
    },
    component: () => import("@/page/caseHandle/cooperateCases/caseCopyDentails.vue")
  },
  // -----------------长软start----------------
  {
    path: "/evidenceListDoc",
    name: "case_handle_evidenceListDoc",
    meta: {
      title: "证据登记保存清单"
    },
    component: () => import("@/page/caseHandle/case/modle/evidenceListDoc.vue")
  },
  {
    path: "/prolongAdminCompulsoryDoc",
    name: "case_handle_prolongAdminCompulsoryDoc",
    meta: {
      title: "延长行政强制措施期限通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/prolongAdminCompulsoryDoc.vue")
  },
  {
    path: "/removeAdminCoerciveMeasureDoc",
    name: "case_handle_removeAdminCoerciveMeasureDoc",
    meta: {
      title: "解除行政强制措施决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/removeAdminCoerciveMeasureDoc.vue")
  },
  //解除（延长）行政强制措施
  {
    path: "/removeOrPrelong",
    name: "case_handle_removeOrPrelong",
    meta: {
      title: "解除（延长）行政强制措施决定"
    },
    component: () => import("@/page/caseHandle/case/coerciveMeasureDoc.vue")
  },
  {
    path: "/importantCaseTeamDissDoc",
    name: "case_handle_importantCaseTeamDissDoc",
    meta: {
      title: "重大案件集体讨论记录"
    },
    component: () => import("@/page/caseHandle/case/modle/importantCaseTeamDissDoc.vue")
  },
  {
    path: "/hearingNoticeDoc",
    name: "case_handle_hearingNoticeDoc",
    meta: {
      title: "听证通知书"
    },
    component: () => import("@/page/caseHandle/case/modle/hearingNoticeDoc.vue")
  },
  {
    path: "/hearingRecordeDoc",
    name: "case_handle_hearingRecordeDoc",
    meta: {
      title: "听证笔录"
    },
    component: () => import("@/page/caseHandle/case/modle/hearingRecordDoc.vue")
  },
  {
    path: "/spotAdmPunishDecisionDoc",
    name: "case_handle_spotAdmPunishDecisionDoc",
    meta: {
      title: "当场行政处罚决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/spotAdmPunishDecisionDoc.vue")
  },
  {
    path: "/remindLetterDoc",
    name: "case_handle_remindLetterDoc",
    meta: {
      title: "催告书"
    },
    component: () => import("@/page/caseHandle/case/modle/remindLetterDoc.vue")
  },
  {
    path: "/enforceInsteadDoc",
    name: "case_handle_enforceInsteadDoc",
    meta: {
      title: "代履行决定书-pdf"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceInsteadDoc.vue")
  },
  {
    path: "/enforceDecideDoc",
    name: "case_handle_enforceDecideDoc",
    meta: {
      title: "行政强制执行决定书"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceDecideDoc.vue")
  },
  {
    path: "/enforceDoc",
    name: "case_handle_enforceDoc",
    meta: {
      title: "中止（终结、恢复）行政强制执行通知书-pdf"
    },
    component: () => import("@/page/caseHandle/case/modle/enforceDoc.vue")
  },
  {
    path: "/importantCaseTeamDissDoc",
    name: "case_handle_importantCaseTeamDissDoc",
    meta: {
      title: "重大案件集体讨论记录"
    },
    component: () => import("@/page/caseHandle/case/modle/importantCaseTeamDissDoc.vue")
  },
  //lv:start
  {
    path: "/handleRecordForm",
    name: "case_handle_handleRecordForm",
    meta: {
      title: "操作记录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/handleRecordForm.vue")
  },
  {
    path: "/evidenceForm",
    name: "case_handle_evidenceForm",
    meta: {
      title: "证据目录",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/evidenceForm.vue")
  },
  {
    path: "/documentForm",
    name: "case_handle_documentForm",
    meta: {
      title: "文书列表",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/documentForm.vue")
  },
  {
    path: "/deliverReceiptForm",
    name: "case_handle_deliverReceiptForm",
    meta: {
      title: "送达回证",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/deliverReceiptForm.vue")
  },
  {
    path: "/testPdf",
    name: "case_handle_testPdf",
    meta: {
      title: "测试pdf",
      oneTab: true,
    },
    component: () => import("@/page/caseHandle/case/form/testPdf.vue")
  },

  //---------------长软end------------
  {
    path: "/electronicFileDetail",
    name: "case_handle_electronicFileDetail",
    meta: {
      title: "卷宗详情",
    },
    component: () => import("@/page/caseHandle/electronicCaseFile/electronicFileDetail.vue")
  },
  {
    path: "/caseCenter-overWeightCase",
    name: "case_handle_caseCenter-overWeightCase",
    meta: {
      title: "超限案件列表",
    },
    component: () => import("@/page/caseCenter/myWaitDeal/overWeightCase.vue")
  },
  {
    path: "/caseCenter-transferAndRegisterCase",
    name: "case_handle_caseCenter-transferAndRegisterCase",
    meta: {
      title: "转立案列表",
    },
    component: () => import("@/page/caseCenter/partyWaitDeal/transferAndRegisterCase.vue")
  },
  {
    path: "/caseCenter-dealNotes",
    name: "case_handle_caseCenter-dealNotes",
    meta: {
      title: "处置说明组件",
    },
    component: () => import("@/components/caseCenter/dealNotes.vue")
  },
  {
    path: "/caseCenter-dealProgress",
    name: "case_handle_caseCenter-dealProgress",
    meta: {
      title: "执行情况组件",
    },
    component: () => import("@/components/caseCenter/dealProgress.vue")
  },
  {
    path: "/caseCenter-evidencePackage",
    name: "case_handle_caseCenter-evidencePackage",
    meta: {
      title: "证据包组件",
    },
    component: () => import("@/components/caseCenter/evidencePackage.vue")
  },
  {
    path: "/caseCenter-evidenceTransfer",
    name: "case_handle_caseCenter-evidenceTransfer",
    meta: {
      title: "转办证据组件",
    },
    component: () => import("@/components/caseCenter/evidenceTransfer.vue")
  },
  {
    path: "/caseCenter-otherEnclosure",
    name: "case_handle_caseCenter-otherEnclosure",
    meta: {
      title: "其他附件组件",
    },
    component: () => import("@/components/caseCenter/otherEnclosure.vue")
  }
]
