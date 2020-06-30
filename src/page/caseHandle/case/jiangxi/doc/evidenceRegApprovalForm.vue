<template>
  <div class="print_box">
    <div class="print_info" id="evidenceRegApprovalForm_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">证据登记保存审批表</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table prolong_table" border="1" bordercolor="black" width="100%" cellspacing="0">
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
            <td rowspan="2">
              <p>案件</p>
              <p>基本</p>
              <p>情况</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
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
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['basicSituation'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>实施证据登记保存理由</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              <el-form-item
                prop="reason"
                :rules="fieldRules('reason',propertyFeatures['reason'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.reason"
                  v-bind:class="{ over_flow:docData.reason && docData.reason.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['reason'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td rowspan="2">
              <p>承办人意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
              <p> &nbsp;&nbsp;根据《中华人民共和国行政处罚法》第三十七条第二款的规定，拟对下列物品
                <el-form-item
                prop="detainGoods"
                :rules="fieldRules('detainGoods',propertyFeatures['detainGoods'])"
              >
                <el-input
                  type="textarea"
                  v-model="docData.detainGoods"
                  v-bind:class="{ over_flow:docData.detainGoods && docData.detainGoods.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  maxlength="200"
                  placeholder="\"
                  :disabled="fieldDisabled(propertyFeatures['detainGoods'])"
                ></el-input>
              </el-form-item>
                予以先行登记保存
                <el-form-item
                prop="days"
                style="width: 45px"
                :rules="fieldRules('days',propertyFeatures['days'])"
              >
                <el-input
                  v-model="docData.days"
                  placeholder="\"
                  disabled
                ></el-input>
              </el-form-item>
                日（自
                <span>
                  <el-form-item
                    prop="startDate"
                    :rules="fieldRules('startDate',propertyFeatures['startDate'])"
                    style="width: 150px"
                    class="pdf_datapick"
                  >
                    <el-date-picker
                      v-model="docData.startDate"
                      @change="starttime"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="  年  月  日"
                      :disabled="fieldDisabled(propertyFeatures['startDate'])"
                    ></el-date-picker>
                  </el-form-item>
                </span>
                <span>至</span>
                <span>
                  <el-form-item
                    prop="endDate"
                    :rules="fieldRules('endDate',propertyFeatures['endDate'])"
                    style="width: 150px"
                    class="pdf_datapick"
                  >
                    <el-date-picker
                      v-model="docData.endDate"
                      @change="endtime"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="  年  月  日"
                      :disabled="fieldDisabled(propertyFeatures['endDate'])"
                    ></el-date-picker>
                  </el-form-item>
                </span>
                ）。
              </p> 
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
            <td rowspan="2">
              <p>承办机构意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
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
            <td rowspan="2">
              <p>行政机关负责人意见</p>
            </td>
            <td rowspan="2" colspan="9" class="color_DBE4EF">
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
        </table>
      </el-form>
    </div>
    <casePageFloatBtns
      :pageDomId="'evidenceRegApprovalForm_print'"
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
        party: "",
        partyManager: "",
        basicSituation: "",
        reason: "",
        detainGoods: "",
        days: "",
        startDate: "",
        endDate: "",
        approvePeo: "",
        approveTime: "",
        secondApproveOpinions: "",
        secondApprovePeo: "",
        secondApproveTime: "",
        threeApproveOpinions: "",
        threeApprovePeo: "",
        threeApproveTime: "",
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
          { required: true, message: "当事人身份证件号不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "单位统一社会信用代码不能为空", trigger: "blur" }
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
        basicSituation: [
          { required: true, message: "基本情况不能为空", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "保存理由不能为空不能为空", trigger: "blur" }
        ],
        detainGoods: [
          { required: true, message: "保存物品详情不能为空", trigger: "blur" }
        ],
        days: [
          { required: true, message: "保存时长不能为空", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
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
        pageDomId: "evidenceRegApprovalForm_print"
      },
      approvalOver: false, //审核完成
      propertyFeatures: ""
    };
  },
  methods: {
    starttime(){
      if (this.docData.endDate){
        if(this.docData.startDate > this.docData.endDate){
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          });
          this.docData.startDate = '';
          this.docData.days = '';
        }else{
          this.docData.days = new Date(this.docData.endDate) - new Date(this.docData.startDate);
          this.docData.days = Math.abs(this.docData.days)
          this.docData.days = this.docData.days / (24 * 3600 * 1000);
          this.docData.days = Math.floor(this.docData.days) ;
          this.$set(this.docData, 'days',  this.docData.days);
        }
      }
    },
    endtime(){
      if (this.docData.startDate){
        if(this.docData.startDate > this.docData.endDate){
          this.$message({
            message: '结束时间不能小于开始时间',
            type: 'warning'
          });
          this.docData.endDate = '';
          this.docData.days = '';
        }else{
          this.docData.days = new Date(this.docData.endDate) - new Date(this.docData.startDate);
          this.docData.days = Math.abs(this.docData.days)
          this.docData.days = this.docData.days / (24 * 3600 * 1000);
          this.docData.days = Math.floor(this.docData.days) ;
          this.$set(this.docData, 'days',  this.docData.days);

        }
      }
    },
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
  td, p, span, .el-checkbox {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
