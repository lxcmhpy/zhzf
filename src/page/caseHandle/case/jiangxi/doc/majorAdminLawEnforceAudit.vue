<template>
  <div class="print_box">
    <div class="print_info" style="height: 1200px" id="majorAdminLawEnforceAudit_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">重大行政执法决定法制审核表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table
          class="print_table prolong_table"
          border="1"
          bordercolor="black"
          width="100%"
          cellspacing="0"
        >
          <tr>
            <td colspan="2">
              <p>案由</p>
            </td>
            <td colspan="8" class="color_DBE4EF">{{docData.caseName}}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan="2">
              <p>基本违法事实</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <el-form-item
                prop="illegalFacts"
                :rules="fieldRules('illegalFacts',propertyFeatures['illegalFacts'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.illegalFacts"
                  v-bind:class="{ over_flow:docData.illegalFacts && docData.illegalFacts.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['illegalFacts'])"
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
                prop="transactor"
                :rules="fieldRules('transactor',propertyFeatures['transactor'])"
              >
                <el-input
                  v-model="docData.transactor"
                  v-bind:class="{ over_flow:docData.transactor && docData.transactor.length>14?true:false }"
                  :maxlength="nameLength"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['transactor'])"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">
              <p>联系电话</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item
                prop="telephone"
                :rules="fieldRules('telephone',propertyFeatures['telephone'],validatePhone)"
              >
                <el-input
                  v-model="docData.telephone"
                  maxlength="11"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['telephone'])"
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
          <tr>
            <td rowspan="2" colspan="2">
              <p>承办机构提请法制审核</p>
            </td>
            <td rowspan="2" colspan="8" class="color_DBE4EF">
              <p>&nbsp;&nbsp;该案件拟处理意见属重大行政执法决定，特提请法制机构进行法制审核。</p>
              <div class="pdf_seal" style="width:280px">
                <p>承办机构负责人（签章）：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
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
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法机关主体是否合法；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="legalAgency"
                :rules="fieldRules('legalAgency',propertyFeatures['legalAgency'])"
              >
                <!-- <el-checkbox-group
                  v-model="docData.legalAgency"
                  :max="1"
                 
                  :disabled="fieldDisabled(propertyFeatures['legalAgency'])"
                >
                  <el-checkbox label="是">是</el-checkbox>
                  <el-checkbox label="否">否</el-checkbox>
                </el-checkbox-group>-->
                <el-radio-group v-model="docData.legalAgency">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法人员是否具备执法资格；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="enforcePeople"
                :rules="fieldRules('enforcePeople',propertyFeatures['enforcePeople'])"
              >
                <el-radio-group v-model="docData.enforcePeople">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法程序是否合法；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="lawProcedure"
                :rules="fieldRules('lawProcedure',propertyFeatures['lawProcedure'])"
              >
                <el-radio-group v-model="docData.lawProcedure">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>案件事实是否清楚，证据是否合法、确凿、充分；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="caseFacts"
                :rules="fieldRules('caseFacts',propertyFeatures['caseFacts'])"
              >
                <el-radio-group v-model="docData.caseFacts">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>适用法律、法规、规章是否准确，裁量基准运用是否适当；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="lawRegulations"
                :rules="fieldRules('lawRegulations',propertyFeatures['lawRegulations'])"
              >
                <el-radio-group v-model="docData.lawRegulations">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>是否超越法定权限；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="StatutoryAuth"
                :rules="fieldRules('StatutoryAuth',propertyFeatures['StatutoryAuth'])"
              >
                <el-radio-group v-model="docData.StatutoryAuth">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>行政执法文书填制是否完备、规范；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="docSpecification"
                :rules="fieldRules('docSpecification',propertyFeatures['docSpecification'])"
              >
                <el-radio-group v-model="docData.docSpecification">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>当事人的知情权、申辩权和听证权是否得到保障；</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="selfRights"
                :rules="fieldRules('selfRights',propertyFeatures['selfRights'])"
              >
                <el-radio-group v-model="docData.selfRights">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF">
              <p>违法行为是否涉嫌犯罪、需要移送司法机关等。</p>
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item
                prop="suspicionCrime"
                :rules="fieldRules('suspicionCrime',propertyFeatures['suspicionCrime'])"
              >
                <el-radio-group v-model="docData.suspicionCrime">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3" colspan="8" class="color_DBE4EF">
              <div class="overflow_lins_style" id="noteDesCon">
                <div class="overflow_lins">
                  <el-form-item
                    prop="auditConclusion"
                    :rules="fieldRules('auditConclusion',propertyFeatures['auditConclusion'])"
                  >
                    <el-input
                      class="text_indent11 overflow_lins_textarea"
                      type="textarea"
                      v-model="docData.auditConclusion"
                      rows="4"
                      maxlength="400"
                      placeholder="\"
                      :disabled="fieldDisabled(propertyFeatures['auditConclusion'])"
                    ></el-input>
                    <span class="overflow_describe_JX" style="padding-bottom:-6px;text-indent:0 !important">有关事项说明及审核结论：</span>
                    <span class="span_bg span_bg_top">&nbsp;</span>
                    <p class="span_bg">&nbsp;</p>
                    <p class="span_bg">&nbsp;</p>
                    <p class="span_bg">&nbsp;</p>
                  </el-form-item>
                </div>
              </div>
              <div class="pdf_seal" style="width:280px">
                <p>法制审核机构负责人（签章）：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
                  <span v-else>年&nbsp;月&nbsp;日</span>
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
      :pageDomId="'majorAdminLawEnforceAudit_print'"
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
      docData: {
        caseName: "",
        illegalFacts: "",
        transactor: "",
        telephone: "",
        legalAgency: "",
        enforcePeople: "",
        lawProcedure: "",
        caseFacts: "",
        lawRegulations: "",
        StatutoryAuth: "",
        docSpecification: "",
        selfRights: "",
        suspicionCrime: "",
        auditConclusion: "",
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
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        illegalFacts: [
          { required: true, message: "基本违法事实不能为空", trigger: "blur" }
        ],
        transactor: [
          { required: true, message: "承办人不能为空", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        legalAgency: [
          { required: true, message: "执法机关是否合法不能为空", trigger: "blur" }
        ],
        enforcePeople: [
          { required: true, message: "执法人员是否具备执法资格不能为空", trigger: "blur" }
        ],
        lawProcedure: [
          { required: true, message: "执法程序是否合法不能为空", trigger: "blur" }
        ],
        caseFacts: [
          { required: true, message: "案件事实是否准确不能为空", trigger: "blur" }
        ],
        lawRegulations: [
          { required: true, message: "适用法律是否准确不能为空", trigger: "blur" }
        ],
        StatutoryAuth: [
          { required: true, message: "是否超越法定权限不能为空", trigger: "blur" }
        ],
        docSpecification: [
          { required: true, message: "执法文书是否规范不能为空", trigger: "blur" }
        ],
        selfRights: [
          { required: true, message: "当事人权益是否得到保障不能为空", trigger: "blur" }
        ],
        suspicionCrime: [
          { required: true, message: "是否涉嫌犯罪不能为空", trigger: "blur" }
        ],
        auditConclusion: [
          { required: true, message: "审核结论不能为空", trigger: "blur" }
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
        pageDomId: "majorAdminLawEnforceAudit_print"
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
#majorAdminLawEnforceAudit_print {
  .overflow_lins_style .span_bg {
    display: block;
  }
  .overflow_lins_style .overflow_lins .overflow_lins_textarea {
    width: calc(100% - 10px);
    top: 0;
  }
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    white-space: normal;
    line-height: 23px;
    text-indent: 0;
  }
  #noteDesCon {
    .overflow_lins_textarea {
      padding-top: 4px;
      textarea {
        line-height: 24px !important;
      }
    }
    span.overflow_lins_textarea {
      line-height: 24px;
    }
    .span_bg {
      box-sizing: border-box;
      margin: 4px 0;
      height: 20px;
    }
  }
}
</style>
