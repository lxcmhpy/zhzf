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
        title: "行政强制执行审批表"
      },
      component: () => import("@/page/caseHandle/case/siChuan/doc/enforceDecideApprovalForm_SC.vue")
    },
   
    
    
    
    
    
    
    
    
]
