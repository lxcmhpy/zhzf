import { BASIC_DATA_SYS } from '@/common/js/BASIC_DATA.js';
import { BASIC_DATA_JX } from '@/common/js/BASIC_DATA_JX.js';
import { BASIC_DATA_QH } from '@/common/js/BASIC_DATA_QH.js';
import { BASIC_DATA_SC } from '@/common/js/BASIC_DATA_SC.js';

// 规则  连线 target=source    target不是本身的话会有箭头
let flowGraphData = {
  //标准案件流程
  commonGraphData: {
    nodes: [
      { id: "1", source: '1', target: "2_1", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "temp1_1", source: '1', target: "temp1_1", linkID: 'temp1_1', name: "", position: { x: 1, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp1_2", source: 'temp1_1', target: "temp1_2", linkID: 'temp1_2', name: "", position: { x: 2, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp1_2_1", source: 'temp1_2', target: "2_2", linkID: 'temp1_2_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "2_1", source: "2_1", target: "3", linkID: BASIC_DATA_SYS.caseDoc_caseLinktypeId, name: "调查类\n文书", linkName: 'case_handle_caseDoc', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "2_2", source: "2_2", target: "2_1", linkID: BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId, name: "行政强制\n措施", linkName: 'case_handle_adminCoerciveMeasure', docId: BASIC_DATA_SYS.adminCoerciveMeasure_huanjieAndDocId, position: { x: 2, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_02' } },
      { id: "3", source: "3", target: "4_1", linkID: BASIC_DATA_SYS.caseInvestig_caseLinktypeId, name: "调查报告", linkName: 'case_handle_caseInvestig', docId: BASIC_DATA_SYS.caseInvestig_huanjieAndDocId, position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_04' } },
      { id: "temp3_1", source: '3', target: "temp3_1", linkID: 'temp3_1', name: "", position: { x: 1, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_2", source: 'temp3_1', target: "temp3_2", linkID: 'temp3_2', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_2_1", source: 'temp3_2', target: "4_2", linkID: 'temp3_2_1', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_3", source: 'temp3_2', target: "temp3_3", linkID: 'temp3_3', name: "", position: { x: 3, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_3_1", source: 'temp3_3', target: "4_3", linkID: 'temp3_3_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_1", source: "4_1", target: "5", linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId, name: "违法行为\n通知", linkName: 'case_handle_illegalActionForm', docId: BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId, position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_06' } },
      { id: "4_2", source: "4_2", target: "temp4_2_1", linkID: BASIC_DATA_SYS.forceCorrect_caseLinktypeId, name: "责令改正", linkName: 'case_handle_forceCorrect', docId: BASIC_DATA_SYS.forceCorrect_huanjieAndDocId, position: { x: 2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_07' } },
      { id: "temp4_2_1", source: 'temp4_2_1', target: "temp4_2_2", linkID: 'temp4_2_1', name: "", position: { x: 2, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_2_2", source: 'temp4_2_2', target: "7_1", linkID: 'temp4_2_2', name: "", position: { x: 1, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_3", source: "4_3", target: "temp4_3_1", linkID: BASIC_DATA_SYS.noPenalty_caseLinktypeId, name: "不予处罚", linkName: 'case_handle_noPenalty', position: { x: 3, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_09' } },
      { id: "temp4_3_1", source: 'temp4_3_1', target: "temp7_2_1", linkID: 'temp4_3_1', name: "", position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "5", source: '5', target: "6", linkID: BASIC_DATA_SYS.partyRights_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_partyRights', position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      { id: "6", source: '6', target: "7_1", linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId, name: "处罚决定", linkName: 'case_handle_punishDecisionDoc', docId: BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "7_1", source: '7_1', target: "temp7_1_1", linkID: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId, name: "决定执行", linkName: 'case_handle_penaltyExecution', position: { x: 1, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_12' } },
      { id: "temp7_1_1", source: '7_1', target: "temp7_1_1", linkID: 'temp7_1_1', name: "", position: { x: 1, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7_1_2", source: 'temp7_1_1', target: "temp7_1_2", linkID: 'temp7_1_2', name: "", position: { x: 2, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "11", source: '7_1', target: "7_2", linkID: '11', name: "", position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "7_2", source: '7_2', target: "temp7_1_2", linkID: BASIC_DATA_SYS.forceExecute_caseLinktypeId, name: "强制执行", linkName: 'case_handle_forceExecute', position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_13' } },
      { id: "temp7_2_1", source: 'temp7_1_2', target: "temp7_2_1", linkID: 'temp7_2_1', name: "", position: { x: 3, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "8", source: "temp7_2_1", target: "8", linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport', docId: BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, position: { x: 4, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
    ],
    links: []
  },

  //赔补偿流程
  compensationGraphData: {
    nodes: [
      { id: "1", source: '1', target: "2", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "2", source: "2", target: "3", linkID: BASIC_DATA_SYS.compensationCaseDoc_caseLinktypeId, name: "调查类\n文书", linkName: 'case_handle_caseDoc', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "3", source: "3", target: "4", linkID: BASIC_DATA_SYS.compensationNote_caseDoctypeId, name: "赔补偿\n通知", linkName: 'case_handle_compensationNotice', docId: BASIC_DATA_SYS.compensationNote_huanjieAndDocId, position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "4", source: '4', target: "5", linkID: BASIC_DATA_SYS.compensationPartyRights_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_compensationPartyRights', position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      { id: "5", source: '5', target: "6", linkID: BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId, name: "收缴赔\n补偿款", linkName: 'case_handle_payCompensation', position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "6", source: "6", target: "6", linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport', docId: BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
    ],
    links: []
  },



  //江西案件流程
  commonGraphData_JX: {
    nodes: [
      { id: "1", source: '1', target: "2_1", linkID: BASIC_DATA_JX.establish_JX_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish_JX', docId: BASIC_DATA_JX.establish_JX_huanjieAndDocId, position: { x: 2, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "temp1_2", source: 'temp1_1', target: "temp1_2", linkID: 'temp1_2', name: "", position: { x: 3, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "2_1", source: "2_1", target: "3", linkID: BASIC_DATA_JX.caseDoc_JX_caseLinktypeId, name: "案件调查", linkName: 'case_handle_caseDoc_JX', position: { x: 2, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "temp2_3", source: "2_1", target: "temp2_3", linkID: 'temp2_3', name: "", position: { x: 2, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp2_4", source: "temp2_3", target: "temp2_4", linkID: 'temp2_4', name: "", position: { x: 4, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "2_5", source: "temp2_4", target: "10", linkID: '2_5', name: "", position: { x: 4, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "3", source: "3", target: "4_1", linkID: BASIC_DATA_JX.caseInvestig_JX_caseLinktypeId, name: "调查报告", linkName: 'case_handle_caseInvestigReport_JX', docId: BASIC_DATA_JX.caseInvestig_JX_huanjieAndDocId, position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_04' } },
      //调查报告->责令改正
      { id: "temp3_1", source: '3', target: "temp3_1", linkID: 'temp3_1', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_2", source: 'temp3_1', target: "temp3_2", linkID: 'temp3_2', name: "", position: { x: 3, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_3", source: 'temp3_2', target: "4_2", linkID: 'temp3_3', name: "", position: { x: 3, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_1", source: "4_1", target: "5", linkID: BASIC_DATA_JX.illegalActionForm_JX_caseLinktypeId, name: "违法行为\n通知", linkName: 'case_handle_illegalActionForm_JX', docId: BASIC_DATA_JX.illegalActionForm_JX_huanjieAndDocId, position: { x: 2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_06' } },
      { id: "4_2", source: "4_2", target: "4_3", linkID: BASIC_DATA_JX.forceCorrect_JX_caseLinktypeId, name: "责令改正", linkName: 'case_handle_forceCorrect_JX', docId: BASIC_DATA_JX.forceCorrect_JX_huanjieAndDocId, position: { x: 3, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_07' } },

      { id: "4_3", source: "4_3", target: "temp4_3_1", linkID: BASIC_DATA_JX.noPenalty_JX_caseLinktypeId, name: "不予处罚", linkName: 'case_handle_noPenalty', position: { x: 3, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_09' } },
      //不予处罚->结案登记
      { id: "temp4_3_1", source: '4_3', target: "temp4_3_1", linkID: 'temp4_3_1', name: "", position: { x: 4, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_3_2", source: 'temp4_3_1', target: "8", linkID: 'temp4_3_2', name: "", position: { x: 4, y: 8.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      //当事人权利->不予处罚
      { id: "temp4_4", source: '5', target: "temp4_4", linkID: 'temp4_4', name: "", position: { x: 2, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_5", source: 'temp4_4', target: "temp4_5", linkID: 'temp4_5', name: "", position: { x: 3, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_6", source: 'temp4_5', target: "4_3", linkID: 'temp4_6', name: "", position: { x: 3, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // 责令改正->处罚决定
      { id: "temp4_7", source: '4_2', target: "temp4_7", linkID: 'temp4_7', name: "", position: { x: 3, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_8", source: 'temp4_7', target: "temp4_8", linkID: 'temp4_8', name: "", position: { x: 2, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_9", source: 'temp4_8', target: "6", linkID: 'temp4_9', name: "", position: { x: 2, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },


      { id: "5", source: '5', target: "6", linkID: BASIC_DATA_JX.partyRights_JX_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_partyRightsForm_JX', position: { x: 2, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      { id: "temp5_1", source: '5', target: "temp5_1", linkID: 'temp5_1', name: "", position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp5_2", source: 'temp5_1', target: "9", linkID: 'temp5_2', name: "", position: { x: 1, y: 5.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },


      { id: "6", source: '6', target: "7_1", linkID: BASIC_DATA_JX.punishDecisionDoc_JX_caseLinktypeId, name: "处罚决定", linkName: 'case_handle_punishDecisionForm_JX', position: { x: 2, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "7_1", source: '7_1', target: "temp7_3", linkID: BASIC_DATA_JX.punishExecute_JX_caseLinktypeId, name: "处罚执行", linkName: 'case_handle_penaltyExecution_JX', position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_12' } },
      { id: "7_2", source: '7_2', target: "11", linkID: BASIC_DATA_JX.forceExecute_JX_caseLinktypeId, name: "强制执行", linkName: 'case_handle_forceExecute_JX', position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_13' } },
      { id: "temp7_3", source: '7_1', target: "temp7_3", linkID: 'temp7_3', name: "", position: { x: 2, y: 9 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7_4", source: 'temp7_3', target: "8", linkID: 'temp7_4', name: "", position: { x: 3.5, y: 9 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7_5", source: '7_1', target: "7_2", linkID: 'temp7_5', name: "", position: { x: 2.5, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },

      { id: "8", source: "8", target: "12", linkID: BASIC_DATA_JX.finishCaseReport_JX_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport_JX', docId: BASIC_DATA_JX.finishCaseReport_JX_huanjieAndDocId, position: { x: 4, y: 9 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } },
      { id: "9", source: "9", target: "6", linkID: BASIC_DATA_JX.importCaseDiss_JX_caseLinktypeId, name: "重大案件\n环节", linkName: 'case_handle_importantCaseTeamDissDoc_JX', docId: BASIC_DATA_JX.importCaseDiss_JX_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } },
      { id: "9_1", source: '9_1', target: "6", linkID: '9_1', name: "", position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },

      { id: "10", source: "10", target: "8", linkID: BASIC_DATA_JX.transfei_JX_caseLinktypeId, name: "移交移送", linkName: 'case_handle_transfer_JX', position: { x: 4, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } },

      { id: "11", source: "11", target: "temp11_1", linkID: BASIC_DATA_JX.courtPunishExecute_JX_caseLinktypeId, name: "申请法院\n强制执行", linkName: 'case_handle_enforceApplicationDoc', docId: BASIC_DATA_JX.courtPunishExecute_JX_huanjieAndDocId, position: { x: 3, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } },
      //申请法院强制执行->结案登记
      { id: "temp11_1", source: '11', target: "temp11_1", linkID: 'temp11_1', name: "", position: { x: 3, y: 9 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp11_2", source: 'temp11_1', target: "8", linkID: 'temp11_2', name: "", position: { x: 3, y: 9 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },

      // {id:"temp11_1",source: "11",target:"8",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"申请法院\n强制执行",linkName:'case_handle_finishCaseReport',docId:BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId,position:{x: 3, y: 8},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}

    ],
    links: []
  },
  //青海赔补偿流程
  compensationGraphData_QH: {
    nodes: [
      { id: "1", source: '1', target: "2", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "2", source: "2", target: "3", linkID: BASIC_DATA_SYS.compensationCaseDoc_caseLinktypeId, name: "调查类\n文书", linkName: 'case_handle_caseDoc', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "3", source: "3", target: "4", linkID: BASIC_DATA_SYS.compensationNote_caseDoctypeId, name: "赔补偿\n通知", linkName: 'case_handle_compensationNoticeForm_QH', position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "4", source: '4', target: "5", linkID: BASIC_DATA_SYS.compensationPartyRights_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_compensationPartyRights', position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      { id: "5", source: '5', target: "6", linkID: BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId, name: "收缴赔\n补偿款", linkName: 'case_handle_payCompensation', position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "6", source: "6", target: "6", linkID: BASIC_DATA_QH.finishCaseReport_QH_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport_QH', docId: BASIC_DATA_QH.finishCaseReport_QH_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
    ],
    links: []
  },
  //青海处罚案件流程
  commonGraphData_QH: { 
    nodes: [
      { id: "1", source: '1', target: "2_1", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "temp1_1", source: '1', target: "temp1_1", linkID: 'temp1_1', name: "", position: { x: 1, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp1_2", source: 'temp1_1', target: "temp1_2", linkID: 'temp1_2', name: "", position: { x: 2, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp1_2_1", source: 'temp1_2', target: "2_2", linkID: 'temp1_2_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "2_1", source: "2_1", target: "3", linkID: BASIC_DATA_SYS.caseDoc_caseLinktypeId, name: "调查类\n文书", linkName: 'case_handle_caseDoc', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "2_2", source: "2_2", target: "2_1", linkID: BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId, name: "行政强制\n措施", linkName: 'case_handle_adminCoerciveMeasure', docId: BASIC_DATA_SYS.adminCoerciveMeasure_huanjieAndDocId, position: { x: 2, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_02' } },
      { id: "3", source: "3", target: "4_1", linkID: BASIC_DATA_SYS.caseInvestig_caseLinktypeId, name: "调查报告", linkName: 'case_handle_caseInvestig', docId: BASIC_DATA_SYS.caseInvestig_huanjieAndDocId, position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_04' } },
      { id: "temp3_1", source: '3', target: "temp3_1", linkID: 'temp3_1', name: "", position: { x: 1, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_2", source: 'temp3_1', target: "temp3_2", linkID: 'temp3_2', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_2_1", source: 'temp3_2', target: "4_2", linkID: 'temp3_2_1', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_3", source: 'temp3_2', target: "temp3_3", linkID: 'temp3_3', name: "", position: { x: 3, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3_3_1", source: 'temp3_3', target: "4_3", linkID: 'temp3_3_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_1", source: "4_1", target: "5", linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId, name: "违法行为\n通知", linkName: 'case_handle_illegalActionForm', docId: BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId, position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_06' } },
      { id: "4_2", source: "4_2", target: "4_1", linkID: BASIC_DATA_SYS.forceCorrect_caseLinktypeId, name: "责令改正", linkName: 'case_handle_forceCorrect', docId: BASIC_DATA_SYS.forceCorrect_huanjieAndDocId, position: { x: 2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_07' } },
      //责令改正->违法行为通知
      // { id: "9", source: '4_2', target: "4_1", linkID: '9', name: "", position: { x: 2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_2_1", source: '4_2', target: "temp4_2_1", linkID: 'temp4_2_1', name: "", position: { x: 2, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_2_2", source: 'temp4_2_1', target: "temp4_2_2", linkID: 'temp4_2_2', name: "", position: { x: 1, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4_2_3", source: 'temp4_2_2', target: "7_1", linkID: 'temp4_2_3', name: "", position: { x: 1, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_3", source: "4_3", target: "temp4_3_1", linkID: BASIC_DATA_SYS.noPenalty_caseLinktypeId, name: "不予处罚", linkName: 'case_handle_noPenalty', position: { x: 3, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_09' } },
      { id: "temp4_3_1", source: 'temp4_3_1', target: "temp7_2_1", linkID: 'temp4_3_1', name: "", position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "5", source: '5', target: "6", linkID: BASIC_DATA_SYS.partyRights_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_partyRights', position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      { id: "6", source: '6', target: "7_1", linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId, name: "处罚决定", linkName: 'case_handle_punishDecisionDoc', docId: BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "7_1", source: '7_1', target: "temp7_1_1", linkID: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId, name: "决定执行", linkName: 'case_handle_penaltyExecution', position: { x: 1, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_12' } },
      { id: "temp7_1_1", source: '7_1', target: "temp7_1_1", linkID: 'temp7_1_1', name: "", position: { x: 1, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7_1_2", source: 'temp7_1_1', target: "temp7_1_2", linkID: 'temp7_1_2', name: "", position: { x: 2, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "11", source: '7_1', target: "7_2", linkID: '11', name: "", position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "7_2", source: '7_2', target: "temp7_1_2", linkID: BASIC_DATA_SYS.forceExecute_caseLinktypeId, name: "强制执行", linkName: 'case_handle_forceExecute', position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_13' } },
      { id: "temp7_2_1", source: 'temp7_1_2', target: "temp7_2_1", linkID: 'temp7_2_1', name: "", position: { x: 3, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "8", source: "temp7_2_1", target: "8", linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport', docId: BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, position: { x: 4, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
    ],
    links: []
  },

  //四川案件流程
  commonGraphData_SC: {
    nodes: [
      { id: "1", source: '1', target: "2_1", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
      { id: "2_1", source: "2_1", target: "4_1", linkID: BASIC_DATA_SC.caseDoc_SC_caseLinktypeId, name: "调查取证", linkName: 'case_handle_caseDoc_SC', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
      { id: "4_1", source: "4_1", target: "5", linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId, name: "违法行为\n通知", linkName: 'case_handle_illegalActionForm', docId: BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId, position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_06' } },
      { id: "temp1", source: "2_1", target: "temp1", linkID: 'temp1', name: "", position: { x: 1, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp2", source: "temp1", target: "temp2", linkID: 'temp2', name: "", position: { x: 2, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp3", source: "temp1", target: "temp3", linkID: 'temp3', name: "", position: { x: 3, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp4", source: "temp1", target: "temp4", linkID: 'temp4', name: "", position: { x: 4, y: 2.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp5", source: "temp4", target: "4_2", linkID: 'temp5', name: "", position: { x: 4, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp6", source: "temp2", target: "4_3", linkID: 'temp6', name: "", position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7", source: "temp3", target: "10", linkID: 'temp7', name: "", position: { x: 3, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp17", source: "temp6", target: "4_3", linkID: 'temp17', name: "", position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "4_2", source: "4_2", target: "8", linkID: BASIC_DATA_SC.cancelCase_SC_caseLinktypeId, name: "撤销立案", linkName: 'case_handle_cancelCase_SC', docId: BASIC_DATA_SYS.forceCorrect_huanjieAndDocId, position: { x: 4, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_07' } },
      // { id: "temp4_2_1", source: 'temp4_2_1', target: "temp4_2_2", linkID: 'temp4_2_1', name: "", position: { x: 2, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp4_2_2", source: 'temp4_2_2', target: "7_1", linkID: 'temp4_2_2', name: "", position: { x: 1, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp66", source: "temp66", target: "4_3", linkID: 'temp66', name: "", position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "4_3", source: "4_3", target: "temp9", linkID: BASIC_DATA_SC.noPenalty_SC_caseLinktypeId, name: "不予处罚", linkName: 'case_handle_noPenalty_SC', position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_09' } },
      { id: "temp9", source: 'temp9', target: "temp8", linkID: 'temp9', name: "", position: { x: 2.2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "temp8", source: 'temp8', target: "temp10", linkID: 'temp8', name: "", position: { x: 2.2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp9", source: 'temp8', target: "5", linkID: 'temp9', name: "", position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp10", source: 'temp10', target: "8", linkID: 'temp10', name: "", position: { x: 4, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp11", source: 'temp10', target: "8", linkID: 'temp11', name: "", position: { x: 4, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      
      
      // { id: "temp4_3_1", source: 'temp4_3_1', target: "temp7_2_1", linkID: 'temp4_3_1', name: "", position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "10", source: "10", target: "temp12", linkID: BASIC_DATA_SC.transfei_SC_caseLinktypeId, name: "移交移送", linkName: 'case_handle_transfer_SC', position: { x: 3, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } },
      { id: "temp12", source: 'temp12', target: "temp10", linkID: 'temp12', name: "", position: { x: 3, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp13", source: 'temp13', target: "8", linkID: 'temp13', name: "", position: { x: 4, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      

      { id: "5", source: '5', target: "4_3", linkID: BASIC_DATA_SC.partyRights_SC_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_partyRightsForm_SC', position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
      // { id: "temp14", source: 'temp14', target: "4_3", linkID: 'temp14', name: "", position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      // { id: "temp15", source: 'temp14', target: "4_3", linkID: 'temp15', name: "", position: { x: 2, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp16", source: '5', target: "6", linkID: 'temp16', name: "", position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      
      
      { id: "6", source: '6', target: "7_1", linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId, name: "处罚决定", linkName: 'case_handle_punishDecisionDoc', docId: BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId, position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
      { id: "7_1", source: '7_1', target: "temp7_1_1", linkID: BASIC_DATA_SC.penaltyExecution_SC_caseLinktypeId, name: "决定执行", linkName: 'case_handle_PenaltyExecutionForm_SC', position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_12' } },
      { id: "temp7_1_1", source: 'temp7_1_1', target: "8", linkID: 'temp7_1_1', name: "", position: { x: 1, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "temp7_1_2", source: 'temp7_1_2', target: "8", linkID: 'temp7_1_2', name: "", position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "11", source: '7_1', target: "7_2", linkID: '11', name: "", position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      
      { id: "7_2", source: '7_2', target: "temp7_1_2", linkID: BASIC_DATA_SC.forceExecute_SC_caseLinktypeId, name: "强制执行", linkName: 'case_handle_forceExecute_SC', position: { x: 2, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_13' } },
      // { id: "temp7_2_1", source: 'temp7_1_2', target: "temp7_2_1", linkID: 'temp7_2_1', name: "", position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
      { id: "8", source: "8", target: "12", linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport', docId: BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, position: { x: 4, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
    ],
    links: []
  },
}
export { flowGraphData };



// commonGraphData: {
//   nodes: [
//     { id: "1", source: '1', target: "2_1", linkID: BASIC_DATA_SYS.establish_caseLinktypeId, name: "立案登记", linkName: 'case_handle_establish', docId: BASIC_DATA_SYS.establish_huanjieAndDocId, position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'lct_01' } },
//     { id: "temp1_1", source: '1', target: "temp1_1", linkID: 'temp1_1', name: "", position: { x: 1, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp1_2", source: 'temp1_1', target: "temp1_2", linkID: 'temp1_2', name: "", position: { x: 2, y: 1.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp1_2_1", source: 'temp1_2', target: "2_2", linkID: 'temp1_2_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "2_1", source: "2_1", target: "3", linkID: BASIC_DATA_SYS.caseDoc_caseLinktypeId, name: "调查类\n文书", linkName: 'case_handle_caseDoc', position: { x: 1, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_03' } },
//     { id: "2_2", source: "2_2", target: "2_1", linkID: BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId, name: "行政强制\n措施", linkName: 'case_handle_adminCoerciveMeasure', docId: BASIC_DATA_SYS.adminCoerciveMeasure_huanjieAndDocId, position: { x: 2, y: 2 }, itemStyleColor: "", attributes: { modularity_class: 'lct_02' } },
//     { id: "3", source: "3", target: "4_1", linkID: BASIC_DATA_SYS.caseInvestig_caseLinktypeId, name: "调查报告", linkName: 'case_handle_caseInvestig', docId: BASIC_DATA_SYS.caseInvestig_huanjieAndDocId, position: { x: 1, y: 3 }, itemStyleColor: "", attributes: { modularity_class: 'lct_04' } },
//     { id: "temp3_1", source: '3', target: "temp3_1", linkID: 'temp3_1', name: "", position: { x: 1, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp3_2", source: 'temp3_1', target: "temp3_2", linkID: 'temp3_2', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp3_2_1", source: 'temp3_2', target: "4_2", linkID: 'temp3_2_1', name: "", position: { x: 2, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp3_3", source: 'temp3_2', target: "temp3_3", linkID: 'temp3_3', name: "", position: { x: 3, y: 3.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp3_3_1", source: 'temp3_3', target: "4_3", linkID: 'temp3_3_1', name: "", position: { x: 1, y: 1 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "4_1", source: "4_1", target: "5", linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId, name: "违法行为\n通知", linkName: 'case_handle_illegalActionForm', docId: BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId, position: { x: 1, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_06' } },
//     { id: "4_2", source: "4_2", target: "temp4_2_1", linkID: BASIC_DATA_SYS.forceCorrect_caseLinktypeId, name: "责令改正", linkName: 'case_handle_forceCorrect', docId: BASIC_DATA_SYS.forceCorrect_huanjieAndDocId, position: { x: 2, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_07' } },
//     { id: "temp4_2_1", source: 'temp4_2_1', target: "temp4_2_2", linkID: 'temp4_2_1', name: "", position: { x: 2, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp4_2_2", source: 'temp4_2_2', target: "7_1", linkID: 'temp4_2_2', name: "", position: { x: 1, y: 6.5 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "4_3", source: "4_3", target: "temp4_3_1", linkID: BASIC_DATA_SYS.noPenalty_caseLinktypeId, name: "不予处罚", linkName: 'case_handle_noPenalty', position: { x: 3, y: 4 }, itemStyleColor: "", attributes: { modularity_class: 'lct_09' } },
//     { id: "temp4_3_1", source: 'temp4_3_1', target: "temp7_2_1", linkID: 'temp4_3_1', name: "", position: { x: 3, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "5", source: '5', target: "6", linkID: BASIC_DATA_SYS.partyRights_caseLinktypeId, name: "当事人\n权利", linkName: 'case_handle_partyRights', position: { x: 1, y: 5 }, itemStyleColor: "", attributes: { modularity_class: 'lct_10' } },
//     { id: "6", source: '6', target: "7_1", linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId, name: "处罚决定", linkName: 'case_handle_punishDecisionDoc', docId: BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId, position: { x: 1, y: 6 }, itemStyleColor: "", attributes: { modularity_class: 'lct_11' } },
//     { id: "7_1", source: '7_1', target: "temp7_1_1", linkID: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId, name: "决定执行", linkName: 'case_handle_penaltyExecution', position: { x: 1, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_12' } },
//     { id: "temp7_1_1", source: 'temp7_1_1', target: "8", linkID: 'temp7_1_1', name: "", position: { x: 1, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "temp7_1_2", source: 'temp7_1_1', target: "temp7_1_2", linkID: 'temp7_1_2', name: "", position: { x: 2, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
    
//     { id: "11", source: '7_1', target: "7_2", linkID: '11', name: "", position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
    
//     { id: "7_2", source: '7_2', target: "temp9", linkID: BASIC_DATA_SYS.forceExecute_caseLinktypeId, name: "强制执行", linkName: 'case_handle_forceExecute', position: { x: 2, y: 7 }, itemStyleColor: "", attributes: { modularity_class: 'lct_13' } },
    
//     { id: "temp9", source: 'temp9', target: "8", linkID: 'temp9', name: "", position: { x: 2, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
    
//     { id: "temp7_2_1", source: 'temp7_1_2', target: "temp7_2_1", linkID: 'temp7_2_1', name: "", position: { x: 3, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'hide' } },
//     { id: "8", source: "8", target: "12", linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, name: "结案登记", linkName: 'case_handle_finishCaseReport', docId: BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, position: { x: 4, y: 8 }, itemStyleColor: "", attributes: { modularity_class: 'lct_14' } }
//   ],
//   links: []
// },