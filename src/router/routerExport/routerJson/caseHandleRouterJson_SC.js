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
   
    
    
    
    
    
    
    
    
]
