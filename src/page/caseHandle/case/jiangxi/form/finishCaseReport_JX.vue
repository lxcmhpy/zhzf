<template>
  <div class="print_box">
    <div class="print_info" id="finishCase_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">结案报告</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <!-- <div class="doc_cause">案由：{{formData.caseName}}</div> -->

        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>案由</td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="caseName"
                :rules="fieldRules('caseName',propertyFeatures['caseName'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.caseName"
                  v-bind:class="{ over_flow:formData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="fieldDisabled(propertyFeatures['caseName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="5">
              <p>当事人</p>
              <p>基本情</p>
              <p class="center_similar">况</p>
            </td>
            <td>个人</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>年龄</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyAge"
                style="width:60px"
                :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAge"
                  v-bind:class="{ over_flow:formData.partyAge.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td class="color_DBE4EF width38" colspan="2">
              <el-form-item
                prop="partySex"
                :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)"
              >
                <!-- <el-input  v-model="formData.partySex" maxlength="2" :disabled="isParty ? false : true" placeholder="\"></el-input> -->
                <!-- 需要完善 -->
                <el-select
                  v-model="formData.partySex"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])"
                  placeholder="\"
                  class="select10"
                >
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td class="color_DBE4EF">
              <el-form-item
                prop="partyAddress"
                :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyIdNo"
                :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validatePhone,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  v-bind:class="{ over_flow:formData.partyTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>名称</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyName"
                :rules="fieldRules('partyName',propertyFeatures['partyName'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyName"
                  v-bind:class="{ over_flow:formData.partyName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="partyManager"
                :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyManager"
                  v-bind:class="{ over_flow:formData.partyManager && formData.partyManager.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td class="color_DBE4EF" colspan="2">
              <el-form-item
                prop="partyUnitAddress"
                :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitAddress"
                  v-bind:class="{ over_flow:formData.partyUnitAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="partyUnitTel"
                :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],'',!isParty)"
              >
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitTel"
                  v-bind:class="{ over_flow:formData.partyUnitTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input
                  v-model="formData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p class="center_similar">处</p>
              <p class="center_similar">理</p>
              <p class="center_similar">结</p>
              <p class="center_similar">果</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="closeResult"
                :rules="fieldRules('closeResult',propertyFeatures['closeResult'])"
              >
                <el-input
                  type="textarea"
                  v-model="formData.closeResult"
                  v-bind:class="{ over_flow:formData.closeResult && formData.closeResult.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['closeResult'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">
              <p class="center_similar">执</p>
              <p class="center_similar">行</p>
              <p class="center_similar">情</p>
              <p class="center_similar">况</p>
            </td>
            <td colspan="8" rowspan="4" class="color_DBE4EF">
              <el-form-item prop="closeSituation">
                <el-input
                  style="float:left;width:70%;margin-top:30px;"
                  type="textarea"
                  v-model="formData.closeSituation"
                  v-bind:class="{ over_flow:formData.closeSituation && formData.closeSituation.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                ></el-input>
                <div class="pdf_seal">
                  <p>签名：{{formData.staffSign}}</p>
                  <p>
                    <span>
                      <el-date-picker
                        v-model="formData.staffSignTime"
                        format=" yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="       年  月  日"
                        :clearable="false"
                      ></el-date-picker>
                    </span>
                  </p>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr>
            <td>
              <p>承办</p>
              <p>人意</p>
              <p>见</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              {{formData.approveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.approvePeo}}</p>
                <p>
                  <span v-if="formData.approveTime">{{formData.approveTime}}</span>
                  <span v-else>&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;月&nbsp;日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>承办</p>
              <p>机构</p>
              <p>意见</p>              
            </td>
            <td colspan="8" class="color_DBE4EF">
              {{formData.secondApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.secondApprovePeo}}</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.secondApproveTime}}</span>
                  <span v-else>&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;月&nbsp;日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>行政</p>
              <p>机关</p>
              <p>负责</p>
              <p>人意</p>
              <p>见</p>
            </td>
            <td colspan="8" class="color_DBE4EF">
              {{formData.thirdApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.thirdApprovePeo}}</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.thirdApproveTime}}</span>
                  <span v-else>&nbsp;&nbsp;&nbsp;&nbsp; 年&nbsp;月&nbsp;日</span>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'finishCase_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @showApprovePeopleList="showApprovePeopleList"
      @showApproval="showApproval"
    ></casePageFloatBtns>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      isOverflow: false,
      // isOverLine: false,
      formData: {
        caseName: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        punishLaw: "",
        illegalLaw: "",
        tempPunishAmount: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        partyUnitPosition: "",
        note: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyManager: "",
        socialCreditCode: "",
        caseBasicInfo: "",
        caseReplay: "",
        // partyUnitPosition: "",
        partyZipCode: "",
        partyManagerPositions: "",
        closeResult: "",
        leadOpinion: "",
        closeSituation: "",
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
         thirdApproveOpinions: "",
        thirdApprovePeo: "",
        thirdApproveTime: "",
      },
      isParty: false,
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_JX.finishCaseReport_JX_caseLinktypeId, //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        party: [
          { required: true, message: "当事人姓名不能为空", trigger: "blur" }
        ],
        partyAge: [
          { required: true, message: "当事人年龄不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "当时人性别不能为空", trigger: "blur" }
        ],
        partyUnitPosition: [
          { required: true, message: "当事人所在单位不能为空", trigger: "blur" }
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
        partyZipCode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
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
        partyManagerPositions: [
          { required: true, message: "职务不能为空", trigger: "blur" }
        ],
        closeResult: [
          { required: true, message: "处理结果不能为空", trigger: "blur" }
        ],
        closeSituation: [
          { required: true, message: "执行情况不能为空", trigger: "blur" }
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
        pageDomId: "finishCase_print"
      },
      huanjieAndDocId: this.BASIC_DATA_JX.finishCaseReport_JX_huanjieAndDocId, //结案报告的文书id
      approvalOver: false, //审核完成
      propertyFeatures: ""
    };
  },
  methods: {
    
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "docForm", true);
    },
    showApprovePeopleList() {
      let data = {
        caseId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId
      };
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval() {
      //二级审批(经办机构负责人审批、部门负责人审批)
      console.log(this.formData);
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : "";
      let caseData = {
        caseId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,
        firstApproval: approvePeo,
        approvalNumber: 2 //2次审批
      };
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    goToPfd() {
      //提交pdf 显示pdf页
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.approvalOver = true;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        true
      );
    },
    isApproval() {
      //只有审核按钮
      if (this.$route.params.isApproval) {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    }
  },
  created() {
    this.setFormData();
    this.isApproval();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
.textindent0 {
  text-indent: 0 !important;
}
.print_box #finishCase_print .doc_cause .caseNameBox span.el-textarea {
  top: -12px;
}
.print_box #finishCase_print .doc_cause .caseNameBox span.over_flow {
  top: -8px;
  text-overflow: initial;
  font-size: 12px;
  line-height: 14px;
}
</style>
