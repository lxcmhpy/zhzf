<template>
  <div class="print_box">
    <div class="print_info" style="height: 1200px" id="majorAdminLawEnforceAudit_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">分期（延期）缴纳罚款申请书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              <p>案由</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input
                  type="textarea"
                  v-model="docData.caseName"
                  v-bind:class="{ over_flow:docData.caseName && docData.caseName.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  disabled
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>处罚决定书文号</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              <el-form-item
                prop="caseNumberCopy"
                :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])"
              >
                <el-input
                  v-model="docData.caseNumberCopy"
                  v-bind:class="{ over_flow:docData.caseNumberCopy && docData.caseNumberCopy.length>14?true:false }"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>当事人</p>
            </td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item
                prop="party"
                :rules="fieldRules('party',propertyFeatures['party'])"
              >
                <el-input
                  v-model="docData.party"
                  v-bind:class="{ over_flow:docData.party && docData.party.length>14?true:false }"
                  :maxlength="nameLength"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['party'])"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="2">
              <p>联系电话</p>
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item
                prop="partyTel"
                :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone)"
              >
                <el-input
                  v-model="docData.partyTel"
                  maxlength="11"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['partyTel'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>违法事实及处罚决定</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              <el-form-item
                prop="illegalFact"
                :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.illegalFact"
                  v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  maxlength="200"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p>当事人申请延期（分期）缴纳罚款的理由</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              <p>
                &nbsp;&nbsp;本人已经充分认识到
                <el-form-item
                  prop="illegalFact"
                  :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.illegalFact"
                    v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 5}"
                    maxlength="200"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                  ></el-input>
                </el-form-item>
                的危害，愿意接受行政处罚，但确有经济困难。现向
                <el-form-item
                  prop="illegalFact"
                  :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.illegalFact"
                    v-bind:class="{ over_flow:docData.illegalFact && docData.illegalFact.length>14?true:false }"
                    :autosize="{ minRows: 1, maxRows: 5}"
                    maxlength="200"
                    placeholder="/"
                    :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
                  ></el-input>
                </el-form-item>
                申请延期缴纳罚款，本人承诺于
                <el-form-item prop="afsj" class="pdf_datapick" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
                  <el-date-picker @blur="starttime" v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                前完成罚款缴纳。
              </p>
              <div class="pdf_seal">
                <p>当事人或其代理人签名：{{docData.approvePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>执法人员意见</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
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
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['closeResult'])"
                ></el-input>
              </el-form-item>
              <div class="pdf_seal">
                <p>执法人员签名：{{docData.approvePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>经办机构负责人意见</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              {{docData.approveOpinions}}
              <br/>
              <div class="pdf_seal">
                <p>签名：{{docData.approvePeo}}</p>
                <p>
                  <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>执法部门负责人意见</p>
            </td>
            <td colspan="11" class="color_DBE4EF">
              {{docData.secondApproveOpinions}}
              <br/>
              <div class="pdf_seal">
                <p>签名：{{docData.secondApprovePeo}}</p>
                <p>
                  <span v-if="docData.secondApproveTime">{{docData.secondApproveTime}}</span>
                  <span v-else>年 月 日</span>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </el-form>
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
        illegalFact: "",
        party: "",
        partyTel: "",
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
        closeResult:""
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
        illegalFact: [
          { required: true, message: "基本违法事实不能为空", trigger: "blur" }
        ],
        party: [
          { required: true, message: "承办人不能为空", trigger: "blur" }
        ],
        partyTel: [
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

</style>