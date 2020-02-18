export default  [
//   {
//   path: "/side",
//   name: "side",
//   meta: {
//     title: "侧边条"
//   },
//   component: () => import("@/page/caseHandle/case/side.vue")
// },
{
  path: "/modle",
  name: "modle",
  meta: {
    title: "标准文书模板"
  },
  component: () => import("@/page/caseHandle/case/modle/modle.vue")
},
{
  path: "/establishDoc",
  name: "establishDoc",
  meta: {
    title: "立案登记表",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/modle/establishDoc.vue")
},
{
  path: "/othermodle",
  name: "othermodle",
  meta: {
    title: "询问笔录",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/modle/otherModle.vue")
},
{
  path: "/finishCaseReport",
  name: "finishCaseReport",
  meta: {
    title: "结案报告",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/modle/finishCaseReport.vue")
},
{
  path: "/liveReport",
  name: "liveReport",
  meta: {
    title: "现场笔录",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/liveReport.vue")
},
{
  path: "/dentail",
  name: "dentail",
  meta: {
    title: "侧边条"
  },
  component: () => import("@/page/caseHandle/case/dentail.vue")
},
{
  path: "/inquestNotes",
  name: "inquestNotes",
  meta: {
    title: "勘验笔录",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/inquestNotes.vue")
},
{
  path: "/enforceForm",
  name: "enforceForm",
  meta: {
    title: "中止（终结、恢复）行政强制执行通知书-表单",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/enforceForm.vue")
},

{
  path: "/sendReportForm",
  name: "sendReportForm",
  meta: {
    title: "送达回证-表单",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/sendReportForm.vue")
},
{
  path: "/caseInvestig",
  name: "caseInvestig",
  meta: {
    title: "案件调查报告",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseInvestigReport.vue")
},
{
  path: "/caseDoc",
  name: "caseDoc",
  meta: {
    title: "调查类文书",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDoc.vue")
},
//违法行为通知书
// {
//   path: "/illegalAction",
//   name: "illegalAction",
//   meta: {
//     title: "违法行为通知书"
//   },
//   component: () => import("@/page/caseHandle/case/form/illegalActionForm.vue")
// },
{
  path: "/inquirieForm",
  name: "inquirieForm",
  meta: {
    title: "询问笔录",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/inquirieRecordForm.vue")
},
{
  path: "/evidenceListForm",
  name: "evidenceListForm",
  meta: {
    title: "证据保存清单",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/evidenceListForm.vue")
},
{
  path: "/obtaineEvidenceForm",
  name: "obtaineEvidenceForm",
  meta: {
    title: "抽样取样凭证",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/obtaineEvidenceForm.vue")
},
{
  path: "/obtaineEvidenceFormReport",
  name: "obtaineEvidenceFormReport",
  meta: {
    title: "抽样取样凭证",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/obtaineEvidenceFormReport.vue")
},
{
  path: "/establish",
  name: "establish",
  meta: {
    title: "立案登记表-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/unRecordCase/establish.vue")
},
{
  path: "/payStage",
  name: "payStage",
  meta: {
    title: "分期（延期）缴纳罚款通知书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/payStage.vue")
},
{
  path: "/executAnnounce",
  name: "executAnnounce",
  meta: {
    title: "执行公告-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/executAnnounce.vue")
},
{
  path: "/remindLetter",
  name: "remindLetter",
  meta: {
    title: "催告书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/remindLetter.vue")
},
{
  path: "/enforceInstead",
  name: "enforceInstead",
  meta: {
    title: "代履行决定书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/enforceInstead.vue")
},
{
  path: "/enforceDecide",
  name: "enforceDecide",
  meta: {
    title: "行政强制执行决定书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/enforceDecide.vue")
},
{
  path: "/enforce",
  name: "enforce",
  meta: {
    title: "中止（终结、恢复）行政强制执行通知书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/enforce.vue")
},
{
  path: "/sendReport",
  name: "sendReport",
  meta: {
    title: "送达回证-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/sendReport.vue")
},
{

  path: "/filingApproval",
  name: "filingApproval",
  meta: {
    title: "立案登记表",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/unRecordCase/filingApprovalForm.vue")
},
{

  path: "/caseDetail",
  name: "caseDetail",
  meta: {
    title: "案件详情",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/caseDetail.vue")
},
//处罚执行
{
  path: "/penaltyExecution",
  name: "penaltyExecution",
  meta: {
    title: "处罚执行",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/PenaltyExecutionForm.vue")
},
//行政处罚决定书
{
  path: "/adminPunishe",
  name: "adminPunishe",
  meta: {
    title: "行政处罚决定书",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/adminPunisheDecisionForm.vue")
},
//责令改正违法行为通知书
{
  path: "/order",
  name: "order",
  meta: {
    title: "责令改正违法行为通知书",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/orderCorrectIllegalAct.vue")
},
//当事人权利
{
  path: "/partyRights",
  name: "partyRights",
  meta: {
    title: "当事人权利",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/partyRightsForm.vue")
},
//违法行为通知书
{
  path: "/illegalActionForm",
  name: "illegalActionForm",
  meta: {
    title: "违法行为通知书",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/form/illegalActionForm.vue")
},
//违法行为通知书PDF
{
  path: "/illegalActionPdf",
  name: "illegalActionPdf",
  meta: {
    title: "违法行为通知书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/illegalActionPdf.vue")
},
//听证通知书PDF
{
  path: "/hearingNoticePdf",
  name: "hearingNoticePdf",
  meta: {
    title: "听证通知书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/hearingNoticePdf.vue")
},
//听证笔录PDF
{
  path: "/hearingRecordePdf",
  name: "hearingRecordePdf",
  meta: {
    title: "听证笔录-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/hearingRecordPdf.vue")
},
//当场行政处罚决定书PDF
{
  path: "/spotAdmPunishDecisionPdf",
  name: "spotAdmPunishDecisionPdf",
  meta: {
    title: "当场行政处罚决定书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/spotAdmPunishDecisionPdf.vue")
},
//行政处罚决定书PDF
{
  path: "/admPunishDecisionPdf",
  name: "admPunishDecisionPdf",
  meta: {
    title: "行政处罚决定书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/admPunishDecisionPdf.vue")
},
//责令改正违法行为通知书pdf
{
  path: "/orderCorrectIllegalActPdf",
  name: "orderCorrectIllegalActPdf",
  meta: {
    title: "责令改正违法行为通知书-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/orderCorrectIllegalActPdf.vue")
},
//勘验笔录pdf
{
  path: "/inquestNotesPdf",
  name: "inquestNotesPdf",
  meta: {
    title: "勘验笔录-pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/pdf/inquestNotesPdf.vue")
},
//案件总览
{
  path: "/caseInfo",
  name: "caseInfo",
  meta: {
    title: "案件总览",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/waitDeal/caseInfo.vue")
},
{
  // path: '/flowChart/:id',
  path: '/flowChart',
  name: 'flowChart',
  meta: {
    title: '流程图',
    oneTab:true,
  },
  component: () => import("@/components/flowChart/flowChart.vue")
},
//行政处罚决定书
{
  path: "/punishDecisionDoc",
  name: "punishDecisionDoc",
  meta: {
    title: "行政处罚决定书-doc",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/punishDecisionDoc.vue")
},
//勘验笔录-doc
{
  path: "/inquestNotesDoc",
  name: "inquestNotesDoc",
  meta: {
    title: "勘验笔录-doc",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/inquestNotesDoc.vue")
},
//抽样取样凭证-doc
{
  path: "/sampleEvidenceDoc",
  name: "sampleEvidenceDoc",
  meta: {
    title: "抽样取样凭证-doc",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/sampleEvidenceDoc.vue")
},
//现场笔录-doc
{
  path: "/sceneNotesDoc",
  name: "sceneNotesDoc",
  meta: {
    title: "现场笔录-doc",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/sceneNotesDoc.vue")
},
//询问笔录-doc
{
  path: "/inquiryNotesDoc",
  name: "inquiryNotesDoc",
  meta: {
    title: "询问笔录-doc",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/inquiryNotesDoc.vue")
},
{
  path: "/inforCollect",
  name: "inforCollect",
  meta: {
    title: "信息采集",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/unRecordCase/inforCollection.vue")
},
{
  path: "/myPDF",
  name: "myPDF",
  meta: {
    title: "pdf",
    oneTab:true,
  },
  component: () => import("@/page/caseHandle/case/caseDocument/myPDF.vue")
},
{
  path: "/viewPDF",
  name: "viewPDF",
  meta: {
    title: "pdf展示"
  },
  component: () => import("@/components/htmlExportPDF/viewPDF.vue")
},
{
  path: "/archiveCover",
  name: "archiveCover",
  meta: {
    title: "归档"
  },
  component: () => import("@/page/caseHandle/waitArchive/archiveCover.vue")
}
]
