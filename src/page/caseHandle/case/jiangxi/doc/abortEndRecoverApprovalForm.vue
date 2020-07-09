<template>
  <div class="print_box">
    <div class="print_info" id="abortEndRecoverApprovalForm_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">中止（终结、恢复）行政强制执行审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <div class="doc_cause">案由：{{docData.caseName}}</div> -->
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
                  placeholder="\"
                ></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
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
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2">
              <p>案件基本情况</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="closeResult"
                :rules="fieldRules('closeResult',propertyFeatures['closeResult'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.closeResult"
                  v-bind:class="{ over_flow:docData.closeResult && docData.closeResult.length>14?true:false }"
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
            <td colspan="2" rowspan="2">
              <p>承办人意见</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <p>
                &nbsp;&nbsp;因
                <span>
                  <el-form-item
                    prop="reason"
                    :rules="fieldRules('reason',propertyFeatures['reason'])"
                    style="width: 70%;"
                  >
                    <el-input
                      v-model="docData.reason"
                      :maxLength="maxLength"
                      :disabled="fieldDisabled(propertyFeatures['reason'])"
                      placeholder="\"
                    ></el-input>
                  </el-form-item>
                </span>，拟作出如下处理决定：
              </p>
              <div class="text-left">
                <el-form-item
                  prop="checkBox"
                  :rules="fieldRules('checkBox',propertyFeatures['checkBox'])"
                >
                  <el-checkbox-group
                    v-model="docData.checkBox"
                    :disabled="fieldDisabled(propertyFeatures['checkBox'])"
                  >
                    <el-checkbox label="1">根据《中华人民共和国行政强制法》第三十九条，中止执行</el-checkbox>
                    <el-checkbox label="2">根据《中华人民共和国行政强制法》第四十条，终结执行</el-checkbox>
                    <el-checkbox label="3">根据《中华人民共和国行政强制法》第三十九条第二款，恢复执行</el-checkbox>
                    <el-checkbox label="4">根据《中华人民共和国行政强制法》第四十二条条第二款，恢复执行</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
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
            <td colspan="2" rowspan="2">
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
            <td colspan="2" rowspan="2">
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
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </span>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'abortEndRecoverApprovalForm_print'"
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
export default {
  components: {
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
      docData: {
        caseNumber: "",
        caseName: "",
        decisionNumber: "",
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
        checkBox: [],
        approveOpinions: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: "",
        notes: ""
      },
      isParty: false,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
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
          {
            required: true,
            message: "中止/终结/恢复原因不能为空",
            trigger: "blur"
          }
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
        pageDomId: "abortEndRecoverApprovalForm_print"
      },
      approvalOver: false, //审核完成
      propertyFeatures: ""
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      // this.printContent()
      this.com_addDocData(handleType, "docForm");
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
}
</style>
