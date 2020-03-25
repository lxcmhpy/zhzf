<template>
  <div class="print_box">
    <div class="print_info" id="finishCase_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">结案报告</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <div class="doc_cause">
          案由：
          <!-- {{formData.caseName}} -->
          <el-form-item prop="caseName" class="width500">
            <el-input
              type="textarea"
              v-model="formData.caseName"
              v-bind:class="{ over_flow:formData.caseName.length>25?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxlength="40"
              placeholder="\"
              disabled
            ></el-input>
          </el-form-item>
        </div>

        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="5">
              <p>当事人</p>
              <p>基本情</p>
              <p class="center_similar">况</p>
            </td>
            <td>个人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>年龄</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyAge" style="width:110px">
                <el-input
                  type="textarea"
                  v-model="formData.partyAge"
                  v-bind:class="{ over_flow:formData.partyAge.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>性别</td>
            <td class="color_DBE4EF width20">
              <el-form-item prop="partySex">
                <!-- <el-input  v-model="formData.partySex" maxlength="2" :disabled="isParty ? false : true" placeholder="\"></el-input> -->
                <!-- 需要完善 -->
                <el-select
                  v-model="formData.partySex"
                  :disabled="isParty ? false : true"
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
            <td>所在单位</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyUnitPosition">
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitPosition"
                  v-bind:class="{ over_flow:formData.partyUnitPosition.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系地址</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  v-bind:class="{ over_flow:formData.partyTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>邮编</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyZipCode">
                <el-input
                  type="textarea"
                  v-model="formData.partyZipCode"
                  v-bind:class="{ over_flow:formData.partyZipCode && formData.partyZipCode.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>单位</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input
                  type="textarea"
                  v-model="formData.partyName"
                  v-bind:class="{ over_flow:formData.partyName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>地址</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input
                  type="textarea"
                  v-model="formData.partyUnitAddress"
                  v-bind:class="{ over_flow:formData.partyUnitAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? true : false"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input
                  type="textarea"
                  v-model="formData.partyManager"
                  v-bind:class="{ over_flow:formData.partyManager.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? true : false"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>职务</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="partyManagerPositions">
                <el-input
                  type="textarea"
                  v-model="formData.partyManagerPositions"
                  v-bind:class="{ over_flow:formData.partyManagerPositions.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="isParty ? true : false"
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
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="closeResult">
                <el-input
                  type="textarea"
                  v-model="formData.closeResult"
                  v-bind:class="{ over_flow:formData.closeResult && formData.closeResult.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>执行</p>
              <p>情况</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <!-- <el-form-item prop="closeSituation">
                <el-input type='textarea' v-model="formData.closeSituation"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder=""></el-input>
              </el-form-item>-->
              {{formData.closeSituation}}
              <div class="pdf_seal">
                <p>签名：{{formData.approvePeo}}</p>
                <p>
                  <span v-if="formData.approveTime">{{formData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>经办机</p>
              <p>构负责</p>
              <p>人意见</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              {{formData.approveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.approvePeo}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>负责人</p>
              <p>审批</p>
              <p>意见</p>
            </td>
            <td colspan="6" class="color_DBE4EF">
              <!-- <el-form-item prop="approvalOpinion">
                <el-input type='textarea' v-model="formData.approvalOpinion"  :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder=""></el-input>
              </el-form-item>-->
              {{formData.secondApproveOpinions}}
              <div class="pdf_seal">
                <p>签名：{{formData.secondApprovePeo}}</p>
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
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    <!-- 提交审批 -->
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <!-- 审批 -->
    <approvalDialog ref="approvalDialogRef" @getNewData="goToPfd"></approvalDialog>
  </div>
</template>
<script>
import showApprovePeople from "../../components/showApprovePeople";
import approvalDialog from "../../components/approvalDialog";
import overflowInput from "./overflowInput";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    overflowInput,
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
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
        test: "",
        note: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyManager: "",
        socialCreditCode: "",
        caseBasicInfo: "",
        caseReplay: "",
        partyUnitPosition: "",
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
        secondApproveTime: ""
      },
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: "2c9029ee6cac9281016cacaadf990006", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        closeResult: [
          { required: true, message: "处理结果不能为空", trigger: "blur" }
        ],
        closeSituation: [
          { required: true, message: "执行情况不能为空", trigger: "blur" }
        ]
        // partyIdNo: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyAddress: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyTel: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyName: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyUnitAddress: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyUnitTel: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // partyManager: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // punishLaw: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // socialCreditCode: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // illegalFactsEvidence: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
        // reconsiderationOrgan: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        // ],
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
      huanjieAndDocId: "2c9029d2695c03fd01695c278e7a0001", //结案报告的文书id
      approvalOver: false //审核完成
    };
  },
  methods: {
    // widthCheck(str, len, event) {
    //   console.log('event,', event)
    //   console.log('str,', str, '  len:', len)
    //   if (event.length > len) {
    //     this.isOverflow = true
    //   } else
    //     this.isOverflow = false
    //   if (event.length > 40) {
    //     this.isOverLine = true
    //     console.log('overline', this.isOverLine)
    //   }
    // },
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
        caseLinktypeId: "2c9029ee6cac9281016cacaadf990006"
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
        caseLinktypeId: "2c9029ee6cac9281016cacaadf990006",
        firstApproval: approvePeo,
        approvalNumber: 2 //2次审批
      };
      this.$refs.approvalDialogRef.showModal(caseData);
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        // caseId: this.caseId, //流程里的案件id
        caseId: "297708bcd8e80872febb61577329194f", //先写死
        docId: "5cad5b54eb97a15250672a4c397cee56"
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    // 盖章
    makeSeal() {
      console.log("盖章!");
    },
    // 打印
    print() {
      console.log("打印!");
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFactsEvidence = edit;
    },
    // 下划线版本
    changeLineStyle() {
      this.lineStyleFlag = true;
    },
    // 下划线版本
    edit() {
      this.lineStyleFlag = false;
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
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
.textindent0 {
  text-indent: 0 !important;
}
</style>
