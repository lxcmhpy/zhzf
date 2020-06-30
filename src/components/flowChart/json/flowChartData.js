import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
import {BASIC_DATA_JX} from '@/common/js/BASIC_DATA_JX.js';

let flowGraphData = {
    //标准案件流程
    commonGraphData : {
        nodes:[
          {id:"1",source: '1',target:"2_1",linkID: BASIC_DATA_SYS.establish_caseLinktypeId,name:"立案登记",linkName:'case_handle_establish',docId:BASIC_DATA_SYS.establish_huanjieAndDocId,position:{x: 1, y: 1}, itemStyleColor: "", attributes:{modularity_class:'lct_01'}},
          {id:"temp1_1",source: '1',target:"temp1_1",linkID: 'temp1_1',name:"",position:{x: 1, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp1_2",source: 'temp1_1',target:"temp1_2",linkID: 'temp1_2',name:"",position:{x: 2, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp1_2_1",source: 'temp1_2',target:"2_2",linkID: 'temp1_2_1',name:"",position:{x: 1, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"2_1",source: "2_1",target:"3",linkID: BASIC_DATA_SYS.caseDoc_caseLinktypeId,name:"调查类\n文书",linkName:'case_handle_caseDoc',position:{x: 1, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
          {id:"2_2",source: "2_2",target:"2_1",linkID: BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId,name:"行政强制\n措施",linkName:'case_handle_adminCoerciveMeasure',docId:BASIC_DATA_SYS.adminCoerciveMeasure_huanjieAndDocId,position:{x: 2, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_02'}},
          {id:"3",source: "3",target:"4_1",linkID: BASIC_DATA_SYS.caseInvestig_caseLinktypeId,name:"调查报告",linkName:'case_handle_caseInvestig',docId:BASIC_DATA_SYS.caseInvestig_huanjieAndDocId,position:{x: 1, y: 3},itemStyleColor: "",attributes:{modularity_class:'lct_04'}},
          {id:"temp3_1",source: '3',target:"temp3_1",linkID: 'temp3_1',name:"",position:{x: 1, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp3_2",source: 'temp3_1',target:"temp3_2",linkID: 'temp3_2',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp3_2_1",source: 'temp3_2',target:"4_2",linkID: 'temp3_2_1',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp3_3",source: 'temp3_2',target:"temp3_3",linkID: 'temp3_3',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp3_3_1",source: 'temp3_3',target:"4_3",linkID: 'temp3_3_1',name:"",position:{x: 1, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"4_1",source: "4_1",target:"5",linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId,name:"违法行为\n通知",linkName:'case_handle_illegalActionForm',docId:BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId,position:{x: 1, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_06'}},
          {id:"4_2",source: "4_2",target:"temp4_2_1",linkID: BASIC_DATA_SYS.forceCorrect_caseLinktypeId,name:"责令改正",linkName:'case_handle_forceCorrect',docId:BASIC_DATA_SYS.forceCorrect_huanjieAndDocId,position:{x: 2, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_07'}},
          {id:"temp4_2_1",source: 'temp4_2_1',target:"temp4_2_2",linkID: 'temp4_2_1',name:"",position:{x: 2, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp4_2_2",source: 'temp4_2_2',target:"7_1",linkID: 'temp4_2_2',name:"",position:{x: 1, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"4_3",source: "4_3",target:"temp4_3_1",linkID: BASIC_DATA_SYS.noPenalty_caseLinktypeId,name:"不予处罚",linkName:'case_handle_noPenalty',position:{x: 3, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_09'}},
          {id:"temp4_3_1",source: 'temp4_3_1',target:"temp7_2_1",linkID: 'temp4_3_1',name:"",position:{x: 3, y: 7},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"5",source: '5',target:"6",linkID: BASIC_DATA_SYS.partyRights_caseLinktypeId,name:"当事人\n权利",linkName:'case_handle_partyRights',position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class:'lct_10'}},
          {id:"6",source: '6',target:"7_1",linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId,name:"处罚决定",linkName:'case_handle_punishDecisionDoc',docId:BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId,position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_11'}},
          {id:"7_1",source: '7_1',target:"7_2",linkID: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId,name:"决定执行",linkName:'case_handle_penaltyExecution',position:{x: 1, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_12'}},
          {id:"temp7_1_1",source: '7_1',target:"temp7_1_1",linkID: 'temp7_1_1',name:"",position:{x: 1, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"temp7_1_2",source: 'temp7_1_1',target:"temp7_1_2",linkID: 'temp7_1_2',name:"",position:{x: 2, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"7_2",source: '7_2',target:"temp7_1_2",linkID: BASIC_DATA_SYS.forceExecute_caseLinktypeId,name:"强制执行",linkName:'case_handle_forceExecute',position:{x: 2, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_13'}},
          {id:"temp7_2_1",source: 'temp7_1_2',target:"temp7_2_1",linkID: 'temp7_2_1',name:"",position:{x: 3, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
          {id:"8",source: "temp7_2_1",target:"8",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"结案登记",linkName:'case_handle_finishCaseReport',docId:BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId,position:{x: 4, y: 8},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}
        ],
        links:[]
    },
    //赔补偿流程
    compensationGraphData : {
        nodes:[
          {id:"1",source: '1',target:"2",linkID: BASIC_DATA_SYS.establish_caseLinktypeId,name:"立案登记",linkName:'case_handle_establish',docId:BASIC_DATA_SYS.establish_huanjieAndDocId,position:{x: 1, y: 1}, itemStyleColor: "", attributes:{modularity_class:'lct_01'}},
          {id:"2",source: "2",target:"3",linkID: BASIC_DATA_SYS.compensationCaseDoc_caseLinktypeId,name:"调查类\n文书",linkName:'case_handle_caseDoc',position:{x: 1, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
          {id:"3",source: "3",target:"4",linkID: BASIC_DATA_SYS.compensationNote_caseDoctypeId,name:"赔补偿\n通知",linkName:'case_handle_compensationNotice',docId:BASIC_DATA_SYS.compensationNote_huanjieAndDocId,position:{x: 1, y: 3},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
          {id:"4",source: '4',target:"5",linkID: BASIC_DATA_SYS.compensationPartyRights_caseLinktypeId,name:"当事人\n权利",linkName:'case_handle_compensationPartyRights',position:{x: 1, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_10'}},
          {id:"5",source: '5',target:"6",linkID: BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId,name:"收缴赔\n补偿款",linkName:'case_handle_payCompensation',position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class:'lct_11'}},
          {id:"6",source: "6",target:"6",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"结案登记",linkName:'case_handle_finishCaseReport',docId:BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId,position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}
        ],
        links:[]
    },
    //江西案件流程
    commonGraphData_JX :{
        nodes:[
            {id:"1",source: '1',target:"2_1",linkID: BASIC_DATA_JX.establish_JX_caseLinktypeId,name:"立案登记",linkName:'case_handle_establish_JX',docId:BASIC_DATA_JX.establish_JX_huanjieAndDocId,position:{x: 2, y: 1}, itemStyleColor: "", attributes:{modularity_class:'lct_01'}},
            {id:"temp1_1",source: '1',target:"temp1_1",linkID: 'temp1_1',name:"",position:{x: 2, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp1_2",source: 'temp1_1',target:"temp1_2",linkID: 'temp1_2',name:"",position:{x: 3, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp1_2_1",source: 'temp1_2',target:"2_2",linkID: 'temp1_2_1',name:"",position:{x: 2, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"2_1",source: "2_1",target:"3",linkID: BASIC_DATA_JX.caseDoc_JX_caseLinktypeId,name:"案件调查",linkName:'case_handle_caseDoc_JX',position:{x: 2, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
            {id:"2_2",source: "2_2",target:"2_1",linkID: BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId,name:"行政强制\n措施",linkName:'case_handle_adminCoerciveMeasure',position:{x: 3, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_02'}},
            
            {id:"temp2_3",source: "2_1",target:"temp2_3",linkID: 'temp2_3',name:"",position:{x: 2, y: 2.5},itemStyleColor: "",attributes:{modularity_class:'hide'}},
            {id:"temp2_4",source: "temp2_3",target:"temp2_4",linkID: 'temp2_4',name:"",position:{x: 4, y: 2.5},itemStyleColor: "",attributes:{modularity_class:'hide'}},
            {id:"2_5",source: "temp2_4",target:"10",linkID: '2_5',name:"",position:{x: 4, y: 2.5},itemStyleColor: "",attributes:{modularity_class:'hide'}},
            

            {id:"3",source: "3",target:"4_1",linkID: BASIC_DATA_JX.caseInvestig_JX_caseLinktypeId,name:"调查报告",linkName:'case_handle_caseInvestigReport_JX',docId:BASIC_DATA_JX.caseInvestig_JX_huanjieAndDocId,position:{x: 2, y: 3},itemStyleColor: "",attributes:{modularity_class:'lct_04'}},
            {id:"temp3_1",source: '3',target:"temp3_1",linkID: 'temp3_1',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp3_2",source: 'temp3_1',target:"temp3_2",linkID: 'temp3_2',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp3_3",source: 'temp3_2',target:"4_2",linkID: 'temp3_3',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            {id:"temp3_4",source: 'temp3_1',target:"temp3_4",linkID: 'temp3_4',name:"",position:{x: 4, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp3_5",source: 'temp3_4',target:"10",linkID: 'temp3_5',name:"",position:{x: 4, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},

            // {id:"temp3_3",source: '3',target:"10",linkID: 'temp3_2',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp3_4",source: 'temp3_3',target:"10",linkID: 'temp3_2',name:"",position:{x: 4, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            // {id:"temp3_2",source: 'temp3_1',target:"temp3_2",linkID: 'temp3_2',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp3_2_1",source: 'temp3_2',target:"4_2",linkID: 'temp3_2_1',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp3_3",source: 'temp3_2',target:"temp3_3",linkID: 'temp3_3',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp3_3_1",source: 'temp3_3',target:"4_3",linkID: 'temp3_3_1',name:"",position:{x: 1, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"4_1",source: "4_1",target:"5",linkID: BASIC_DATA_JX.illegalActionForm_JX_caseLinktypeId,name:"违法行为\n通知",linkName:'case_handle_illegalActionForm_JX',docId:BASIC_DATA_JX.illegalActionForm_JX_huanjieAndDocId,position:{x: 2, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_06'}},
            {id:"4_2",source: "4_2",target:"4_3",linkID: BASIC_DATA_JX.forceCorrect_JX_caseLinktypeId,name:"责令改正",linkName:'case_handle_forceCorrect_JX',docId:BASIC_DATA_JX.forceCorrect_JX_huanjieAndDocId,position:{x: 3, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_07'}},
            // {id:"temp4_2_1",source: 'temp4_2_1',target:"temp4_2_2",linkID: 'temp4_2_1',name:"",position:{x: 2, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp4_2_2",source: 'temp4_2_2',target:"7_1",linkID: 'temp4_2_2',name:"",position:{x: 1, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"4_3",source: "4_3",target:"temp4_3_1",linkID: BASIC_DATA_JX.noPenalty_JX_caseLinktypeId,name:"不予处罚",linkName:'case_handle_noPenalty',position:{x: 3, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_09'}},
            {id:"temp4_3_1",source: '4_3',target:"temp4_3_1",linkID: 'temp4_3_1',name:"",position:{x: 4, y: 6},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            // {id:"temp4_3_1",source: 'temp4_3_1',target:"temp7_2_1",linkID: 'temp4_3_1',name:"",position:{x: 3, y: 7},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp4_4",source: '4_2',target:"temp4_4",linkID: 'temp4_4',name:"",position:{x: 3, y: 5.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"temp4_5",source: 'temp4_4',target:"temp4_5",linkID: 'temp4_5',name:"",position:{x: 2, y: 5.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            
            {id:"5",source: '5',target:"6",linkID: BASIC_DATA_JX.partyRights_JX_caseLinktypeId,name:"当事人\n权利",linkName:'case_handle_partyRights_JX',position:{x: 2, y: 5},itemStyleColor: "",attributes:{modularity_class:'lct_10'}},
            {id:"temp5_1",source: '5',target:"temp5_1",linkID: 'temp5_1',name:"",position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"5_2",source: 'temp5_1',target:"9",linkID: '5_2',name:"",position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"5_",source: '5',target:"5_1",linkID: '5_1',name:"",position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            
            {id:"6",source: '6',target:"7_1",linkID: BASIC_DATA_JX.punishDecisionDoc_JX_caseLinktypeId,name:"处罚决定",linkName:'case_handle_punishDecisionForm_JX',position:{x: 2, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_11'}},
            {id:"7_1",source: '7_1',target:"7_2",linkID: BASIC_DATA_JX.punishExecute_JX_caseLinktypeId,name:"处罚执行",linkName:'case_handle_penaltyExecution',position:{x: 2, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_12'}},
            {id:"temp7_1_1",source: '7_1',target:"temp7_1_1",linkID: 'temp7_1_1',name:"",position:{x: 2, y: 9},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            // {id:"temp7_1_2",source: 'temp7_1_1',target:"temp7_1_2",linkID: 'temp7_1_2',name:"",position:{x: 2, y: 9},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"7_2",source: '7_2',target:"11",linkID: BASIC_DATA_JX.forceExecute_JX_caseLinktypeId,name:"强制执行",linkName:'case_handle_forceExecute',position:{x: 3, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_13'}},
            {id:"temp7_2_1",source: 'temp7_1_1',target:"temp7_2_1",linkID: 'temp7_2_1',name:"",position:{x: 3, y: 9},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"8",source: "temp7_2_1",target:"8",linkID: BASIC_DATA_JX.finishCaseReport_JX_caseLinktypeId,name:"结案登记",linkName:'case_handle_finishCaseReport_JX',docId:BASIC_DATA_JX.finishCaseReport_JX_huanjieAndDocId,position:{x: 4, y: 9},itemStyleColor: "",attributes:{modularity_class:'lct_14'}},
            {id:"9",source: "temp7_2_1",target:"8",linkID: BASIC_DATA_JX.importCaseDiss_JX_caseLinktypeId,name:"重大案件\n环节",linkName:'case_handle_importantCaseTeamDissDoc_JX',docId:BASIC_DATA_JX.importCaseDiss_JX_huanjieAndDocId,position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_14'}},
            {id:"9_1",source: '9_1',target:"6",linkID: '9_1',name:"",position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            {id:"10",source: "2_5",target:"8",linkID: BASIC_DATA_JX.transfei_JX_caseLinktypeId,name:"移交移送",linkName:'',position:{x: 4, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_14'}},
            // {id:"10_1",source: '10',target:"8",linkID: '10_1',name:"",position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            {id:"11",source: "11",target:"temp11_1",linkID: BASIC_DATA_JX.courtPunishExecute_JX_caseLinktypeId,name:"申请法院\n强制执行",linkName:'case_handle_enforceApplicationDoc',docId:BASIC_DATA_JX.courtPunishExecute_JX_huanjieAndDocId,position:{x: 3, y: 8},itemStyleColor: "",attributes:{modularity_class:'lct_14'}},
            {id:"temp11_1",source: '11',target:"temp11_1",linkID: 'temp11_1',name:"",position:{x: 3, y: 9},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            {id:"11_2",source: 'temp11_1',target:"8",linkID: 'temp11_2',name:"",position:{x: 3, y: 9},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
            
            // {id:"temp11_1",source: "11",target:"8",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"申请法院\n强制执行",linkName:'case_handle_finishCaseReport',docId:BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId,position:{x: 3, y: 8},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}

          ],
          links:[]
    }
}
export {flowGraphData};