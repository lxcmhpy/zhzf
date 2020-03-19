<template>
  <div class="case">
    <div>
      <p>ly(2、4、5、6、7、8、9、10文书表单及pdf打印版)</p>
      <ul>

        文书：
        <li @click="goPunishDecisionDoc">行政处罚决定书</li>
        <li @click="goInquestNotesDoc">勘验笔录</li>
        <li @click="goSampleEvidenceDoc">抽样取样凭证</li>
        <li @click="goSceneNotesDoc">现场笔录</li>
        <li @click="goInquiryNotesDoc">询问笔录</li>

        <!----------长软start --------------->
        <li @click="goEvidenceListDoc" style="color:blue">证据登记保存清单（已集成）</li>
        <li @click="goAdminCoerciveMeasureDoc" style="color:blue">行政强制措施决定书</li>
        <li @click="goProlongAdminCompulsoryDoc" style="color:blue">延长行政强制措施期限通知书</li>
        <li @click="goRemoveAdminCoerciveMeasureDoc" style="color:blue">解除行政强制措施决定书</li>

        <li @click="goHearingNoticeDoc" style="color:blue">听证通知书（已集成）</li>
        <li @click="goHearingRecordDoc" style="color:blue">听证笔录（已集成）</li>
        <li @click="goPunishDecisionDoc2" style="color:blue">当场行政处罚决定书</li>

        <li @click="goPayStageReprotDoc" style="color:blue">分期（延期）缴纳罚款通知书（已集成）</li>
        <li @click="goExecutAnnounceReprotDoc" style="color:blue">执行公告（已集成）</li>
        <li @click="goRemindLetterReprotDoc" style="color:blue">催告书</li>
        <li @click="goEnforceDecideReprotDoc" style="color:blue">行政强制执行决定书</li>
        <li @click="goEnforceInsteadReprotDoc" style="color:blue">代履行决定书</li>
        <li @click="goEnforceReprotDoc" style="color:blue">中止（终结、恢复）行政强制执行通知书</li>
        <li @click="goImportantCaseTeamDissDoc" style="color:blue">重大案件集体讨论记录（已集成）</li>

        <br>
        <li @click="goHandleRecordForm"  style="color:blue">操作记录</li>
        <li @click="goEvidenceForm"  style="color:blue">证据目录</li>
        <li @click="goDocumentForm"  style="color:blue">文书列表</li>
        <li @click="goDeliverReceiptForm" style="color:blue">送达回证</li>
        <!----------长软end --------------->
      </ul>
    </div>
    <div>
      <p>hwj(3、11、12、13、14、15、16文书表单及pdf打印版)</p>
      <br><br>
      <ul>
        文书：
        <li @click="goInquestNotes">勘验笔录</li>
        <li class="text-red">听证通知书</li>
        <li class="text-red">听证笔录</li>
        <li class="text-red">当场行政处罚决定书</li>
        
        <br><br>

        表单：
        <li @click="goFilingApprovalForm">立案审批表</li>
        <li @click="goRemoveOrPrelong">解除（延长）强制行政措施</li>
        <li @click="goIllegalAction">违法行为通知书</li>
        <li @click="goOrderCorrectIllegalAct">责令改正违法行为通知书</li>
        <li @click="goAdminPunisheDecision">行政处罚决定书</li>
        <li @click="goImportantCaseDissForm">重大案件集体讨论</li>
        <li @click="goArchivesForm">归档</li>
        <li @click="goPenaltyExecution">决定执行</li>
        <li @click="goPartyRights">当事人权利</li>
        <br><br>
        PDF打印：
        <li @click="goInquestNotesPdf">勘验笔录PDF</li>
        <li @click="goIllegalActionPdf">违法行为通知书PDF</li>
        <li @click="goHearingNoticePdf">听证通知书pdf</li>
        <li @click="goHearingRecordPdf">听证笔录PDF</li>
        <li @click="goSpotAdmPunishDecisionPdf">当场行政处罚决定书PDF</li>
        <li @click="goAdmPunishDecisionPdf">行政处罚决定书PDF</li>
        <li @click="goOrderCorrectIllegalActPdf">责令改正违法行为通知书PDF</li>
      </ul>
    </div>
    <div>
      <p>zmh(17、18、19、20、21、22、23、24文书表单及pdf打印版)</p>
      <ul>
        <br><br>
        <!--  -->
        <li @click="goFirstPage">归档首页</li>
        <li @click="goDeleteEvidence">解除证据登记保存决定书</li>
        <li @click="goForceCorrect">责令改正违法行为通知书</li>
        <li @click="goModle">标准文书模板-当场行政处罚决定书</li>
        <li @click="goEstablishDoc">-立案登记表</li>
        <li @click="goQAreport">-询问笔录</li>
        <li @click="goFinishCaseReport">-结案报告</li>
        <li @click="goObtaineEvidenceReport" style="color:pink">抽样取样凭证</li>
        <li @click="goDeliveryCertificate" style="color:pink">送达回证</li>
        <li @click="goside">侧边栏</li>
        <li @click="goDentail">案件总览</li>
        <li @click="goCaseInvestig">案件调查报告</li>
        <li @click="goCaseDoc">调查类文书(上级表单)</li>
        <br><br>

        表单：
        <!-- <li @click="goInquestReprot">交通运输行政执法文书式样之三 ： 勘验笔录</li> -->
       
        <li @click="goEvidenceListForm">证据保存清单</li>
        <li @click="goObtaineEvidenceForm">抽样取样凭证</li>
        <li class="text-red">表单十七 ： 分期（延期）缴纳罚款通知书(未做-无样式图)</li>
        <li class="text-red">表单十八 ： 执行公告(未做-无样式图)</li>
        <li class="text-red">表单十九 ： 催告书(未做-无样式图)</li>
        <li class="text-red">表单二十 ： 行政强制执行决定书(未做-无样式图)</li>
        <li class="text-red">表单二十一 ： 代履行决定书(未做-无样式图)</li>
        <li class="text-red" @click="goEnforceReprotForm">表单二十二：中止（终结、恢复）行政强制执行通知书(未完成-无样式图)</li>
        <li></li>
        <li @click="goSendReprotForm">表单二十三：送达回证</li>
        <li @click="goFinishReprotForm">表单二十四： 结案报告</li>
        <br><br>

        打印：
        <!-- 打印版 -->
        <li @click="goEstablish">打印一 ： 立案登记表</li>
        <li @click="goInquirieRecord">打印：询问笔录</li>
        <li @click="goEvidenceList">打印：证据保存清单</li>
        <li @click="goObtaineEvidence">打印：抽样取样凭证</li>
        <li @click="goPayStageReprot">打印十七 ： 分期（延期）缴纳罚款通知书</li>
        <li @click="goExecutAnnounceReprot">打印十八 ： 执行公告</li>
        <li @click="goRemindLetterReprot">打印十九 ： 催告书</li>
        <li @click="goEnforceDecideReprot">打印二十： 行政强制执行决定书</li>
        <li @click="goEnforceInsteadReprot">打印二十一 ： 代履行决定书</li>
        <li @click="goEnforceReprot">打印二十二 ：中止（终结、恢复）行政强制执行通知书</li>
        <li @click="goSendReprot">打印二十三 ：送达回证</li>
        <li @click="goFinishReprot">打印二十四 ： 结案报告</li>
      </ul>
    </div>

  </div>
</template>
<script>
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export default {
  data() {
    return {};
  },

  methods: {
    // 归档首页
    goFirstPage(){
      this.$router.push({ name: 'firstPdfPage' });
    },
    // 解除证据登记保存决定书
    goDeleteEvidence(){
      this.$router.push({ name: 'deleteEvidence' });
    },
    // 责令改正违法行为通知书
    goForceCorrect(){
      this.$router.push({ name: 'forceCorrect' });
    },
    // 立案登记表
    goEstablishDoc() {
      this.$router.push({ name: 'establishDoc' });
    },
    // 询问笔录
    goQAreport() {
      this.$router.push({ name: 'othermodle' });
    },
    // 结案报告
    goFinishCaseReport() {
      this.$router.push({ name: 'finishCaseReport' });
    },
    //现场笔录
    goDiao() {
      this.$router.push({ name: 'liveReport' });
    },
    goWen() {
      this.makeRoute(
        "/la",
        "/la2",
        "/la3",
        "la",
        "la2",
        "la3",
        "问询",
        "caseHandle/case/wen.vue"
      );
    },
    goInquestNotesDoc() {
      this.$router.push({ name: 'inquestNotesDoc' });
    },
    goPunishDecisionDoc() {
      this.$router.push({ name: 'punishDecisionDoc' });
    },
    //抽样取样凭证Doc
    goSampleEvidenceDoc() {
      this.$router.push({ name: 'sampleEvidenceDoc' });
    },
    goSceneNotesDoc() {
      this.$router.push({ name: 'sceneNotesDoc' });
    },
    goInquiryNotesDoc() {
      this.$router.push({ name: 'inquiryNotesDoc' });
    },
    // 案件调查报告
    goCaseInvestig() {
      this.$router.push({ name: 'caseInvestig' });
    },
    // 调查类文书
    goCaseDoc() {
      this.$router.push({ name: 'caseDoc' });
    },
    // 询问笔录
  
    // 证据保存清单
    goEvidenceListForm() {
      this.$router.push({ name: 'evidenceListForm' });
    },
   
    // 抽样取样凭证
    goObtaineEvidenceReport() {
      this.$router.push({ name: 'obtaineEvidenceForm' });
    },
    // 送达回证
    goDeliveryCertificate() {
      this.$router.push({ name: 'deliveryCertificate' });
    },
    // 立案登记表-打印
    goEstablish() {
      this.$router.push({ name: 'establish' });

    },

    //  分期（延期）缴纳罚款通知书-打印
    goPayStageReprot() {
      this.$router.push({ name: 'payStage' });

    },
    //  执行公告-打印
    goDentail() {
      this.$router.push({ name: 'dentail' });

    },
    //  执行公告-打印
    goside() {
      this.$router.push({ name: 'side' });

    },
    //  执行公告-打印
    goExecutAnnounceReprot() {
      this.$router.push({ name: 'executAnnounce' });

    },
    //  催告书-打印
    goRemindLetterReprot() {
      this.$router.push({ name: 'remindLetter' });

    },
    //  代履行决定书-表单
    goEnforceInsteadForm() {
      this.makeRoute(
        "/enforceInsteadForm",
        "/enforceInsteadForm2",
        "/enforceInsteadForm3",
        "/enforceInsteadForm",
        "/enforceInsteadForm2",
        "/enforceInsteadForm3",
        " 代履行决定书-表单",
        "caseHandle/case/form/enforceInsteadForm.vue"
      );
    },
    //  行政强制执行决定书-打印
    goEnforceDecideReprot() {
      this.$router.push({ name: 'enforceDecide' });

    },
    //  代履行决定书-打印
    goEnforceInsteadReprot() {
      this.$router.push({ name: 'enforceInstead' });
    },
    // 中止（终结、恢复）行政强制执行通知书-表单
    goEnforceReprotForm() {
      this.$router.push({ name: 'enforceForm' });
    },
    // 中止（终结、恢复）行政强制执行通知书-打印
    goEnforceReprot() {
      this.$router.push({ name: 'enforce' });
    },
    // 送达回证-表单
    goSendReprotForm() {

    },
    // 送达回证-打印
    goSendReprot() {
      this.$router.push({ name: 'sendReport' });
    },
    // 结案报告-表单
    goFinishReprotForm() {
      this.$router.push({ name: 'finishForm' });
    },
    // 结案报告-打印
    goFinishReprot() {
      this.$router.push({ name: 'finishReport' });

    },
    //行政处罚决定书
    goAdminPunisheDecision() {
      this.$router.push({ name: 'adminPunishe' });

    },
    //勘验笔录
    goInquestNotes() {
      this.$router.push({ name: 'inquestNotes' });

    },
    //责令改正违法行为通知书
    goOrderCorrectIllegalAct() {
      this.$router.push({ name: 'order' });
    },
    //违法行为通知书
    goIllegalAction() {
      this.$router.push({ name: 'illegalAction' });
    },
    //违法行为通知书PDF
    goIllegalActionPdf() {
      this.$router.push({ name: 'illegalActionPdf' });
    },
    //听证通知书pdf
    goHearingNoticePdf() {
      this.$router.push({ name: 'hearingNoticePdf' });
    },
    //听证笔录pdf
    goHearingRecordPdf() {
      this.$router.push({ name: 'hearingRecordePdf' });
    },
    //当场行政处罚决定书pdf
    goSpotAdmPunishDecisionPdf() {
      this.$router.push({ name: 'spotAdmPunishDecisionPdf' });
    },
    //行政处罚决定书pdf
    goAdmPunishDecisionPdf() {
      this.$router.push({ name: 'admPunishDecisionPdf' });
    },
    //责令改正违法行为通知书pdf
    goOrderCorrectIllegalActPdf() {
      this.$router.push({ name: 'orderCorrectIllegalActPdf' });
    },
    //勘验笔录PDF
    goInquestNotesPdf() {
      this.$router.push({ name: 'inquestNotesPdf' });
    },
    // 结案报告-表单
    goFilingApprovalForm() {
      this.$router.push({ name: 'filingApproval' });
    },
    // 解除（延长）行政强制措施
    goRemoveOrPrelong(){
      this.$router.push({ name: 'removeOrPrelong' });
    },
    goImportantCaseDissForm() {
      this.makeRoute(
        "/important",
        "/important2",
        "/important3",
        "important",
        "important2",
        "important3",
        "重大案件集体讨论",
        "caseHandle/case/form/importantCaseDissForm.vue"
      );
    },
    goArchivesForm() {
      this.makeRoute(
        "/archives",
        "/archives2",
        "/archives3",
        "archives",
        "archives2",
        "archives3",
        "归档",
        "caseHandle/case/form/archivesForm.vue"
      );
    },
    //处罚执行
    goPenaltyExecution() {
      this.$router.push({ name: 'penaltyExecution' });
    },
    //当事人权利
    goPartyRights() {
      this.$router.push({ name: 'partyRights' });
    },
    //当事人权利
    goModle() {
      this.$router.push({ name: 'modle' });
    },
    //-------------------长软start--------------
    goPunishDecisionDoc2(){
      this.$router.push({ name: 'spotAdmPunishDecisionDoc' });
    },
    // 证据保存清单
    goEvidenceListDoc() {
      this.$router.push({ name: 'evidenceListDoc' });
    },
    //行政强制措施决定书
    goAdminCoerciveMeasureDoc() {
      this.$router.push({ name: 'adminCoerciveMeasureDoc' });
    },
    //延长行政强制措施期限通知书
    goProlongAdminCompulsoryDoc() {
      this.$router.push({ name: 'prolongAdminCompulsoryDoc' });
    },
    //解除行政强制措施决定书
    goRemoveAdminCoerciveMeasureDoc() {
      this.$router.push({ name: 'removeAdminCoerciveMeasureDoc' });
    },
     //听证通知书pdf
    goHearingNoticeDoc() {
      this.$router.push({ name: 'hearingNoticeDoc' });
    },
    //听证笔录pdf
    goHearingRecordDoc(){
      this.$router.push({ name: 'hearingRecordeDoc' });
    },
    //当场行政处罚决定书pdf
    goSpotAdmPunishDecisionDoc(){
      this.$router.push({ name: 'spotAdmPunishDecisionDoc' });
    },
    //  分期（延期）缴纳罚款通知书-打印
    goPayStageReprotDoc() {
      this.$router.push({ name: 'payStageDoc' });
    },
    //  执行公告-打印
    goExecutAnnounceReprotDoc() {
      this.$router.push({ name: 'executAnnounceDoc' });
    },
    //  催告书-打印
    goRemindLetterReprotDoc() {
      this.$router.push({ name: 'remindLetterDoc' });
    },
      //  行政强制执行决定书-打印
    goEnforceDecideReprotDoc() {
      this.$router.push({ name: 'enforceDecideDoc' });
    },
     //  代履行决定书-打印
    goEnforceInsteadReprotDoc() {
      this.$router.push({ name: 'enforceInsteadDoc' });
    },
     // 中止（终结、恢复）行政强制执行通知书-打印
    goEnforceReprotDoc() {
      this.$router.push({ name: 'enforceDoc' });
    },
     //重大案件集体讨论记录
    goImportantCaseTeamDissDoc() {
      this.$router.push({ name: 'importantCaseTeamDissDoc' });
    },
    //长软aaa start
    // 操作记录
    goHandleRecordForm() {
        this.$router.push({ name: 'handleRecordForm' });
    },
    // 证据目录
    goEvidenceForm() {
        this.$router.push({ name: 'evidenceForm' });
    },
    // 文书列表
    goDocumentForm() {
        this.$router.push({ name: 'documentForm' });
    },
    // 送达回证
    goDeliverReceiptForm() {
        this.$router.push({ name: 'deliverReceiptForm' });
    },
    //--------------长软end-------------------
    makeRoute(path1, path2, path3, name1, name2, name3, title, componentName) {
      //path不可以重复  name也不可以重复
      this.$router.addRoutes([
        {
          path: path1,
          name: name1,
          component: Layout,
          children: [
            {
              path: path2,
              name: name2,
              component: MainContent,
              children: [
                {
                  path: path3,
                  name: name3,
                  meta: {
                    title: title
                  },
                  component: () => import("@/page/" + componentName)
                }
              ]
            }
          ]
        }
      ]);
      this.$router.push({ name: name3 });
    },

  }
};
</script>
<style lang="scss">
.case {
  overflow: hidden;
  position: absolute;
  & > div {
    width: 30%;
    float: left;
    border-right: 1px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
    p {
      font-size: 20px;
    }
    li {
      cursor: pointer;
      line-height: 30px;
    }
    .text-red {
      color: red;
    }
  }
}
</style>
