<template>
  <div class="case">
    <div>
      <p>ly(2、4、5、6、7、8、9、10文书表单及pdf打印版)</p>
      <ul>
        <li @click="goDiao">调查文书</li>
        <li @click="goWen">询问文书</li>
      </ul>
    </div>
    <div>
      <p>hwj(3、11、12、13、14、15、16文书表单及pdf打印版)</p>
      <br><br>
      <ul>
        文书：
        <li @click="goInquestNotes">勘验笔录</li>        
        <li class="text-red" >听证通知书</li>
        <li class="text-red" >听证笔录</li>
        <li class="text-red" >当场行政处罚决定书</li>  
        
        <br><br>

        表单：
        <li @click="goFilingApprovalForm">立案审批表</li>
        <li @click="goIllegalAction">违法行为通知书</li>
        <li @click="goOrderCorrectIllegalAct">责令改正违法行为通知书</li>
        <li @click="goAdminPunisheDecision">行政处罚决定书</li>
        <li @click="goImportantCaseDissForm">重大案件集体讨论</li>
        <li @click="goArchivesForm">归档</li>
        <li @click="goPenaltyExecution">处罚执行</li>
        <li @click="goPartyRights">当事人权利</li>
        <br><br>
        PDF打印：
        <li @click="goIllegalActionPdf">违法行为通知书PDF</li>
        <li @click="goIHearingNoticePdf">听证通知书pdf</li>
      </ul>
    </div>
    <div>
      <p>zmh(17、18、19、20、21、22、23、24文书表单及pdf打印版)</p>
      <ul>
        <br><br>
        <li @click="goCaseInvestig">案件调查报告</li>
        <li @click="goCaseDoc">调查类文书(上级表单)</li>
        <br><br>

        表单：
        <!-- <li @click="goInquestReprot">交通运输行政执法文书式样之三 ： 勘验笔录</li> -->
        <li @click="goInquirieRecordForm">询问笔录</li>
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
    goDiao() {
      this.makeRoute(
        "/diao",
        "/diao2",
        "/diao3",
        "diao",
        "diao2",
        "diao3",
        "调查类文书",
        "caseHandle/case/diao.vue"
      );
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
    // 案件调查报告
    goCaseInvestig() {
      this.$router.push({ name: 'caseInvestig' });
    },
    // 调查类文书
    goCaseDoc() {
      this.$router.push({ name: 'caseDoc' });
    },
    // 询问笔录
    goInquirieRecordForm() {
      this.$router.push({ name: 'inquirieForm' });
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
      this.$router.push({ name: 'sendReportForm' });
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
      this.makeRoute(
        "/inquest",
        "/inquest2",
        "/inquest3",
        "inquest",
        "inquest2",
        "inquest3",
        "勘验笔录",
        "caseHandle/case/inquestNotes.vue"
      );
    },
    //责令改正违法行为通知书
    goOrderCorrectIllegalAct() {
      this.$router.push({ name: 'order' });
    },
    //违法行为通知书
    goIllegalAction() {
      this.makeRoute(
        "/illegalAction",
        "/illegalAction2",
        "/illegalAction3",
        "illegalAction",
        "illegalAction2",
        "illegalAction3",
        "违法行为通知书",
        "caseHandle/case/form/illegalActionForm.vue"
      );
    },
    goIllegalActionPdf() {
      this.makeRoute(
        "/illegalActionPdf",
        "/illegalActionPdf2",
        "/illegalActionPdf3",
        "illegalActionPdf",
        "illegalActionPdf2",
        "illegalActionPdf3",
        "违法行为通知书PDF",
        "caseHandle/case/illegalActionPdf.vue"
      );
    },
    goIHearingNoticePdf() {
      this.makeRoute(
        "/hearingNoticePdf",
        "/hearingNoticePdf2",
        "/hearingNoticePdf3",
        "hearingNoticePdf",
        "hearingNoticePdf2",
        "hearingNoticePdf3",
        "违法行为通知书PDF",
        "caseHandle/case/hearingNoticePdf.vue"
      );
    },
    // 结案报告-表单
    goFilingApprovalForm() {
      this.$router.push({ name: 'filingApproval' });
    },
    // goFilingApprovalForm(){
    //   this.makeRoute(
    //       "/filingApproval",
    //       "/filingApproval2",
    //       "/filingApproval3",
    //       "filingApproval",
    //       "filingApproval2",
    //       "filingApproval3",
    //       "立案审批表",
    //       "caseHandle/case/form/filingApprovalForm.vue"
    //     );
    // },
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
<style lang="less">
.case {
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
  .text-red{
    color: red;
  }
  }
}
</style>
