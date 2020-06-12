<template>
  <div class="print_box">
    <div class="print_info" id="removeAdminCoerciveMeasureApproval_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">重大行政执法决定法制审核表</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <!-- <div class="doc_cause">案由：{{formData.caseName}}</div> -->
        <table
          class="print_table"
          style="table-layout: fixed;"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td>
              <p>案由</p>
            </td>
            <td colspan="9" class="color_DBE4EF">
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
            <td rowspan="2" colspan="2">
              <p>基本违法事实</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
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
          <tr></tr>
          <tr>
            <td colspan="2">
              <p>承办人</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
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
            <td colspan="2">
              <p>联系电话</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
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
            <td colspan="2">
              <p>承办机构拟处理意见</p>
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
            <td rowspan="2" colspan="2">
              <p>承办机构提请法制审核</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <p>&nbsp;&nbsp;该案件拟处理意见属重大行政执法决定，特提请法制机构进行法制审核。</p>
              <div class="pdf_seal">
                <p>承办机构负责人（签章）：{{formData.secondApprovePeo}}</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.secondApproveTime}}</span>
                  <span v-else>年&nbsp;月&nbsp;日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="12" colspan="2">
              <p>法制审核机构意见</p>
            </td>
            <td colspan="6"  class="color_DBE4EF">
              <p>行政执法机关主体是否合法；</p>
            </td>
            <td colspan="2"  class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法人员是否具备执法资格；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法程序是否合法；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>案件事实是否清楚，证据是否合法、确凿、充分；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>适用法律、法规、规章是否准确，裁量基准运用是否适当；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>是否超越法定权限；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法文书填制是否完备、规范；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>当事人的知情权、申辩权和听证权是否得到保障；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>违法行为是否涉嫌犯罪、需要移送司法机关等。</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="checkBox"
                :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
              >
                <el-checkbox-group
                  v-model="formData.checkBox"
                  :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                >
                  <p>
                    <el-checkbox label="是">是</el-checkbox>
                    <el-checkbox label="否">否</el-checkbox>
                  </p>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3" colspan="8" class="color_DBE4EF">
              <p>有关事项说明及审核结论：</p>
              <div class="pdf_seal">
                <p>法制审核机构负责人（签章）：{{formData.secondApprovePeo}}</p>
                <p>
                  <span v-if="formData.secondApproveTime">{{formData.secondApproveTime}}</span>
                  <span v-else>年&nbsp;&nbsp;日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td colspan="10">
              <p>备注：审核意见在相应选项打√，需要说明的事项较多可另附纸说明。</p>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="notice clear">
        <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
      </div>
    </div>
    <casePageFloatBtns
      :pageDomId="'removeAdminCoerciveMeasureApproval_print'"
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
        checkBox: [],
        test: "",
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
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: ""
      },
      isParty: false,
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, //表单类型IDer
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
        pageDomId: "removeAdminCoerciveMeasureApproval_print"
      },
      huanjieAndDocId: this.BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId, //结案报告的文书id
      approvalOver: false, //审核完成
      propertyFeatures: ""
    };
  },
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        "",
        "",
        //this.caseLinkDataForm.caseBasicinfoId,
        //this.caseLinkDataForm.caseLinktypeId,
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
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        //caseId: this.caseId, //流程里的案件id
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
    // 下划线版本
    changeLineStyle() {
      this.lineStyleFlag = true;
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
.print_box
  #removeAdminCoerciveMeasureApproval_print
  .doc_cause
  .caseNameBox
  span.el-textarea {
  top: -12px;
}
.print_box
  #removeAdminCoerciveMeasureApproval_print
  .doc_cause
  .caseNameBox
  span.over_flow {
  top: -8px;
  text-overflow: initial;
  font-size: 12px;
  line-height: 14px;
}
// .print_box .print_info .pdf_seal {
//   margin-top: 20px;
//   margin-bottom: 10px;
//   width: 240px;
//   text-align: center;
//   font-size: 16px;
//   font-family: SimSun;
//   float: right;
// }
</style>
