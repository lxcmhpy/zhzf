<template>
  <div class="print_box">
    <div class="print_info" id="stageDelayApprovalForm_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">分期（延期）缴纳罚款审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table
          class="print_table prolong_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td colspan="2">姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="/"
                ></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="/"></el-input> -->
              </el-form-item>
            </td>
            <td colspan="2">身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyIdNo"
                  :maxLength="18"
                  placeholder="/"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="docData.partyAddress"
                  v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  maxlength="30"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <el-input
                  v-model="docData.partyTel"
                  maxlength="11"
                  placeholder="/"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td colspan="2">名称</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">地址</td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)"
              >
                <el-input
                  v-model="docData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">法定代表人</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)"
              >
                <el-input
                  v-model="docData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="socialCreditCode"
                :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)"
              >
                <el-input
                  v-model="docData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="/"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>案件基本情况</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="basicSituation"
                :rules="fieldRules('basicSituation',propertyFeatures['basicSituation'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.basicSituation"
                  v-bind:class="{ over_flow:docData.basicSituation && docData.basicSituation.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['basicSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>分期（延期）缴纳罚款理由</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item prop="reason" :rules="fieldRules('reason',propertyFeatures['reason'])">
                <el-input
                  type="textarea"
                  v-model="docData.reason"
                  v-bind:class="{ over_flow:docData.reason && docData.reason.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['reason'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>承办人意见</p>
            </td>
            <td
              rowspan="2"
              colspan="8"
              class="color_DBE4EF"
              style="white-space: normal;word-wrap: break-word;word-break: break-all;"
            >
              <p>&nbsp;&nbsp;根据《中华人民共和国行政处罚法》第五十二条的规定，拟提出以下处理意见：</p>
              <p>
                <input
                  type="checkbox"
                  name="checkLaw"
                  value="1"
                  v-model="docData.checknames"
                  @change="checkBox"
                />同意延期缴纳罚款。
                <span>
                  延长至
                  <el-form-item
                    :prop="one?'':'delayDate'"
                    class="pdf_datapick"
                    :rules="fieldRules('delayDate',propertyFeatures['delayDate'])"
                  >
                  <el-date-picker
                    v-model="docData.delayDate"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder=" 年  月  日"
                    v-bind:disabled="one"
                  ></el-date-picker>
                  </el-form-item>。
                </span>
              </p>
              <p>
                <input
                  type="checkbox"
                  name="checkLaw"
                  value="2"
                  v-model="docData.checknames"
                  @change="checkBox"
                />同意分期缴纳罚款。
                <span>
                  第
                  <el-form-item
                    :prop="one?'':'stageNum'"
                    class="pdf_datapick"
                    :rules="fieldRules('stageNum',propertyFeatures['stageNum'])"
                  >
                  <el-input
                    v-model="docData.stageNum"
                    :autosize="true"
                    v-bind:class="{ over_flow:docData.stageNum.length>2?true:false }"
                    style="width: 45px"
                    v-bind:disabled="two"
                  ></el-input>
                  </el-form-item>期至
                  <el-form-item
                    :prop="one?'':'stageDate'"
                    class="pdf_datapick"
                    :rules="fieldRules('stageDate',propertyFeatures['stageDate'])"
                  >
                  <el-date-picker
                    v-model="docData.stageDate"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder=" 年  月  日  "
                    v-bind:disabled="two"
                  ></el-date-picker>
                  </el-form-item>
                  前，缴纳罚款
                  <el-form-item
                    :prop="one?'':'payFine'"
                    class="pdf_datapick"
                    :rules="fieldRules('payFine',propertyFeatures['payFine'])"
                  >
                  <el-input
                    v-model="docData.payFine"
                    :autosize="true"
                    v-bind:class="{ over_flow:docData.payFine.length>6?true:false }"
                    style="width: 100px"
                    v-bind:disabled="two"
                  ></el-input>
                  </el-form-item>
                  元（大写）。尚有未缴纳的罚款
                  <el-form-item
                    :prop="one?'':'debtFine'"
                    class="pdf_datapick"
                    :rules="fieldRules('debtFine',propertyFeatures['debtFine'])"
                  >
                  <el-input
                    v-model="docData.debtFine"
                    rows="1"
                    :autosize="true"
                    v-bind:class="{ over_flow:docData.debtFine.length>6?true:false }"
                    style="width: 100px"
                    v-bind:disabled="two"
                  ></el-input>
                  </el-form-item>
                  元（大写）。
                </span>
              </p>
              <p>
                <input
                  type="checkbox"
                  name="checkLaw"
                  value="3"
                  v-model="docData.checknames"
                  @change="checkBox"
                />由于当事人的申请不符合《中华人民共和国行政处罚法》第五十二条的规定，不同意分期（延期）缴纳罚款。
              </p>
              {{docData.approveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.approvePeo}}</p>
                <p>
                  <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>承办机构意见</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              {{docData.secondApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>行政机关负责人意见</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              {{docData.threeApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{docData.threeApprovePeo}}</p>
                <p>
                  <span v-if="docData.threeApproveTime">{{docData.threeApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td colspan="2">
              <p>备注</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <span>
                <el-form-item prop="notes">
                  <el-input
                    type="textarea"
                    v-model="docData.notes"
                    v-bind:class="{ over_flow:docData.notes.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    :maxlength="200"
                    placeholder="/"
                  ></el-input>
                </el-form-item>
              </span>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'stageDelayApprovalForm_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId","currentFileData"]) },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      // isOverLine: false,
      docData: {
        caseNumber: "",
        caseName: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        basicSituation: "",
        reason: "",
        delayDate: "",
        payFine: "",
        debtFine: "",
        stageNum: "",
        stageDate: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: "",
        notes: "",
        checknames: []
      },
      one: true,
      two: true,
      isParty: false,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        note: "分期（延期）缴纳罚款审批表", //文书名字
        docDataId: "", //多份文书的id
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        partyIdNo: [
          {
            required: true,
            message: "当事人身份证件号不能为空",
            trigger: "blur"
          }
        ],
        partyAddress: [
          { required: true, message: "当事人联系地址不能为空", trigger: "blur" }
        ],
        partyTel: [
          {
            required: true,
            message: "当事人联系电话不能为空",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "单位联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法人不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          {
            required: true,
            message: "单位统一社会信用代码不能为空",
            trigger: "blur"
          }
        ],
        basicSituation: [
          { required: true, message: "基本情况不能为空", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "分期延期理由不能为空", trigger: "blur" }
        ],
        delayDate: [
          { required: true, message: "延长日期不能为空", trigger: "blur" }
        ],
        stageNum: [
          { required: true, message: "分期数不能为空", trigger: "blur" }
        ],
        stageDate: [
          { required: true, message: "分期日期不能为空", trigger: "blur" }
        ],
        payFine: [
          { required: true, message: "已缴罚款不能为空", trigger: "blur" }
        ],
        debtFine: [
          { required: true, message: "未缴罚款不能为空", trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      lineStyleFlag: false,
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "stageDelayApprovalForm_print"
      },
      approvalOver: false, //审核完成
      propertyFeatures: "",
      checknames: []
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      //        console.log("this.caseId,this.caseId", this.caseId)
      //        console.log("this.caseId,this.caseId", this.caseDocDataForm.caseBasicinfoId)
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      // this.com_getDocDataByCaseIdAndDocId(data)

      //有多份询问笔录时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      let addMoreData = JSON.parse(this.$route.params.addMoreData);

      if (
        addMoreData.handelType == "isAddMore" &&iLocalStroage.get("currentDocDataId")
      ) {
        //设置询问笔录名称
        console.log("添加",addMoreData.approvalForm.executeHandle);
        // this.caseDocDataForm.note = "询问笔录（" + addMoreData.askData.peopleType + ")(第" + addMoreData.askData.askNum + "次)";
        this.com_getCaseBasicInfo(data.caseId, data.docId);
        if (addMoreData.approvalForm.executeHandle === 0) {
          this.docData.checknames.push("3");
          this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（拒绝）";
        } else {
          if (addMoreData.approvalForm.executeType === 1) {
            // 分期
            this.docData.checknames.push("2");
            this.two = false;
            this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（分期）";
          }
          if (addMoreData.approvalForm.executeType === 0) {
            // 延期
            this.docData.checknames.push("1");
            this.one = false;
            this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（延期）";
          }
        }
      } else {
        console.log("修改");
        let currentDocDataId = this.currentFileData.docDataId;
        if (currentDocDataId) {
          this.getDocDetailById(currentDocDataId);
        } else {
          this.getDocDetailById(this.$route.params.docDataId);
        }
      }
    },
    //保存文书信息
    saveData(handleType) {
      this.docData.checknames = this.docData.checknames;
      this.com_addDocData(handleType, "docForm");
    },
    checkBox(){
      this.docData.delayDate = "";
      this.docData.stageNum = "";
      this.docData.stageDate = "";
      this.docData.payFine = "";
      this.docData.debtFine = "";
      if ( this.docData.checknames.length > 1) {
         this.docData.checknames.shift();
      }
      if ( this.docData.checknames == "1") {
        this.one = false;
        this.two = true;
      } else if ( this.docData.checknames == "2") {
        this.one = true;
        this.two = false;
      } else {
        this.one = true;
        this.two = true;
      }
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#stageDelayApprovalForm_print{
  .pdf_datapick{  
    .el-input__inner,
    .el-textarea__inner {
        text-align     : center;
        text-align-last: center;
    }
  }
}
.prolong_table {
  table-layout: fixed;
  td,
  p,
  span,
  .el-checkbox {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
  td {
    max-width: 63px;
  }
}
</style>
