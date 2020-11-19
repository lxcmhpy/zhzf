export default [

    {
        path: "/caseDoc_SC",
        name: "case_handle_caseDoc_SC",
        meta: {
          title: "案件调查-四川"
        },
        component: () => import("@/page/caseHandle/case/siChuan/form/caseDoc_SC")
    },
    {
        path: "/caseInvestigReport_SC",
        name: "case_handle_caseInvestigReport_SC",
        meta: {
          title: "案件调查报告-四川"
        },
        component: () => import("@/page/caseHandle/case/siChuan/doc/caseInvestigReport_SC")
    },
    {
        path: "/transfer_SC",
        name: "case_handle_transfer_SC",
        meta: {
          title: "移交移送-四川"
        },
        component: () => import("@/page/caseHandle/case/siChuan/form/transfer_SC")
    },
    {
      path: "/evidenceRegApprovalForm_SC",
      name: "case_handle_evidenceRegApprovalForm_SC",
      meta: {
          title: "证据登记保存审批表-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/evidenceRegApprovalForm_SC")
    },
    {
      path: "/importantCaseTeamDissDoc_SC",
      name: "case_handle_importantCaseTeamDissDoc_SC",
      meta: {
          title: "重大案件集体讨论记录"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/importantCaseTeamDissDoc_SC")
    },
    {
      path: "/importantCaseCheckOpinion_SC",
      name: "case_handle_importantCaseCheckOpinion_SC",
      meta: {
          title: "重大行政处罚法制审核意见书"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/importantCaseCheckOpinion_SC")
    },
    {
      path: "/partyRightsForm_SC",
      name: "case_handle_partyRightsForm_SC",
      meta: {
        title: "当事人权利-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/partyRightsForm_SC")
    },
    {
      path: "/PenaltyExecutionForm_SC",
      name: "case_handle_PenaltyExecutionForm_SC",
      meta: {
        title: "决定执行-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/PenaltyExecutionForm_SC")
    },
    {
      path: "/remindLetterDoc_SC",
      name: "case_handle_remindLetterDoc_SC",
      meta: {
        title: "催告书-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/remindLetterDoc_SC")
    },
    {
      path: "/forceExecute_SC",
      name: "case_handle_forceExecute_SC",
      meta: {
        title: "强制执行-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/forceExecuteForm_SC")
    },
    {
      path: "/cancelCase_SC",
      name: "case_handle_cancelCase_SC",
      meta: {
        title: "撤销立案-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/cancelCase_SC")
    },
    {
      path: "/adminCoerciveMeasure_SC",
      name: "case_handle_adminCoerciveMeasure_SC",
      meta: {
        title: "行政强制措施-四川",
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/adminCoerciveMeasure_SC.vue")
    },
    {
      path: "/adminCoerciveMeasureApproval_SC",
      name: "case_handle_adminCoerciveMeasureApproval_SC",
      meta: {
        title: "行政强制措施审批表-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/adminCoerciveMeasureApproval_SC.vue")
    },
    {
      path: "/prolongAdminCoerciveMeasureApproval_SC",
      name: "case_handle_prolongAdminCoerciveMeasureApproval_SC",
      meta: {
        title: "延长行政强制措施审批表-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/prolongAdminCoerciveMeasureApproval_SC.vue")
    },
    {
      path: "/removeAdminCoerciveMeasureApproval_SC",
      name: "case_handle_removeAdminCoerciveMeasureApproval_SC",
      meta: {
        title: "解除行政强制措施审批表-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/removeAdminCoerciveMeasureApproval_SC.vue")
    },
    {
      path: "/enforceDecideApprovalForm_SC",
      name: "case_handle_enforceDecideApprovalForm_SC",
      meta: {
        title: "行政强制执行审批表-四川"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/enforceDecideApprovalForm_SC.vue")
    },
    {
      path: "/courtEnforceApplicationDoc_SC",
      name: "case_handle_courtEnforceApplicationDoc_SC",
      meta: {
        title: "申请法院强制执行申请书"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/courtEnforceApplicationDoc_SC.vue")
    },
    {
      path: "/noPenalty_SC",
      name: "case_handle_noPenalty_SC",
      meta: {
        title: "不予处罚-四川",
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/noPenalty_SC.vue")
    },
    {
      path: "/deliveryConfirmDoc_SC",
      name: "case_handle_deliveryConfirmDoc_SC",
      meta: {
        title: "送达地址确认书"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/deliveryConfirmDoc_SC.vue")
    },
    {
      path: "/sceneNotesDoc_SC",
      name: "case_handle_sceneNotesDoc_SC",
      meta: {
        title: "行政强制措施现场笔录"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/sceneNotesDoc_SC.vue")
    },
    //违法行为通知书
    {
      path: "/illegalActionForm_SC",
      name: "case_handle_illegalActionForm_SC",
      meta: {
        title: "违法行为通知书-四川",
      },
      component: () => import("@/page/caseHandle/case/siChuan/form/illegalActionForm_SC.vue")
    },

    
    
    
    
    
    
    
    
]
