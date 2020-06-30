<template>
  <div class="print_box">
    <div class="print_info" id="adminPunish_print">
      <el-form
        :rules="rules"
        ref="docForm"
        :inline-message="true"
        :inline="true"
        :model="formData"
        :class="isPdf"
      >
        <div class="doc_topic">行政处罚决定书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="\"
                ></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.partyTel"
                  :maxLength="maxLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input
                  v-model="formData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input
                  v-model="formData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input
                  v-model="formData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input
                  v-model="formData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
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
        </table>
        <!-- <p class="side_right_indent">
          <span class="side_right" @click="overFlowEdit">
            <el-form-item prop="illegalFactsEvidence">
              <span class="over_topic">违法事实及依据：</span>
              {{formData.illegalFactsEvidence}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </p>-->
        <!-- <p  v-if="lineStyleFlag">
          违法事实及依据：<u>{{formData.illegalFactsEvidence}}</u>
        </p>-->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="illegalFact" :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])">
              <el-input
                class="text_indent10 overflow_lins_textarea"
                type="textarea"
                v-model="formData.illegalFact"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['illegalFact'])"
              ></el-input>
              <span class="overflow_describe">违法事实及依据：</span>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
                @click="overFlowEdit"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p>
          你(单位)的行为违反了
          <span>
            <el-form-item prop="illegalLaw" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
              <el-input
                type="textarea"
                v-model="formData.illegalLaw"
                v-bind:class="{ over_flow:formData.illegalLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"
              ></el-input>
            </el-form-item>
          </span>的规定，依据
          <span contenteditable="true">
            <el-form-item prop="punishLaw" class="width120" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])">
              <el-input
                type="textarea"
                v-model="formData.punishLaw"
                v-bind:class="{ over_flow:formData.punishLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['punishLaw'])"
              ></el-input>
            </el-form-item>
          </span>的规定，决定给予
          <span>
            <el-form-item prop="tempPunishAmount" :rules="fieldRules('tempPunishAmount',propertyFeatures['tempPunishAmount'])">
              <el-input
                type="textarea"
                v-model="formData.tempPunishAmount"
                v-bind:class="{ over_flow:formData.tempPunishAmount.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['tempPunishAmount'])"
              ></el-input>
              <!-- <el-input v-model="docData.tempPunishAmount" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>的行政处罚。
        </p>
        <p>
          处以罚款的，自收到本决定书之日起十五日内缴至
          <span>
            <el-form-item prop="bank" style="width:218px;" :rules="fieldRules('bank',propertyFeatures['bank'])">
              <el-input type="textarea" v-model="formData.bank" v-bind:class="{ over_flow:formData.bank && formData.bank.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength" :disabled="fieldDisabled(propertyFeatures['bank'])"></el-input>
            </el-form-item>
          </span>，账号
          <span>
            <el-form-item prop="account" :rules="fieldRules('account',propertyFeatures['account'])">
              <el-input type="textarea" v-model="formData.account" v-bind:class="{ over_flow:formData.account && formData.account.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength" :disabled="fieldDisabled(propertyFeatures['account'])"></el-input>
            </el-form-item>
          </span>，到期不缴纳罚款的，本机关可以每日按罚款数额的百分之三加处罚款，加处罚款的数额不超过罚款本数。
        </p>
        <!-- <p class="side_right_indent">
          <span class="side_right" @click="overFlowEdit">
            <el-form-item prop="otherWay">
              <span class="over_topic">其他执行方式：</span>
              {{formData.otherWay}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </p>
        <p v-if="lineStyleFlag">
          其他执行方式：
          <u>{{formData.otherWay}}</u>
        </p> -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="otherWay" :rules="fieldRules('otherWay',propertyFeatures['otherWay'])">
              <el-input
                class="text_indent11 overflow_lins_textarea"
                type="textarea"
                v-model="formData.otherWay"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['otherWay'])"
              ></el-input>
              <span class="overflow_describe" >其他执行方式和期限：</span>
              <span class="span_bg span_bg_top"  @click="overFlowEdit">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
                @click="overFlowEdit"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p>
          如果不服本处罚决定，可以在六十日内依法向
          <span>
            <el-form-item prop="reconsiderationOrgan" :rules="fieldRules('reconsiderationOrgan',propertyFeatures['reconsiderationOrgan'])">
              <el-select v-model="formData.reconsiderationOrgan" :disabled="fieldDisabled(propertyFeatures['reconsiderationOrgan'])">
                <el-option v-for="(item,index) in reconsiderationOrganList" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向

          <span>
            <el-form-item prop="litigationOrgan" :rules="fieldRules('litigationOrgan',propertyFeatures['litigationOrgan'])">
              <!-- <el-input type="textarea" v-model="formData.litigationOrgan" v-bind:class="{ over_flow:formData.litigationOrgan && formData.litigationOrgan.length>12?true:false }" :maxLength="maxLength" :autosize="{ minRows: 1, maxRows: 3}"  placeholder="\"></el-input> -->
              <el-select v-model="formData.litigationOrgan" :disabled="fieldDisabled(propertyFeatures['litigationOrgan'])">
                <el-option v-for="(item,index) in enforcementOrganList" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </span>人民法院提起行政诉讼，但本决定不停止执行，法律另有规定的除外。逾期不申请行政复议、不提起行政诉讼又不履行的，本机关将依法申请人民法院强制执行。
        </p>
        <!-- <p>处罚前已口头告知当事人拟作出处罚的事实、理由和依据，并告知当事人依法享有的陈述权和申辩权。</p>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            执法人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row> -->
        <div class="pdf_seal">
          <span >交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="formData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <casePageFloatBtns
      :pageDomId="'subOutputRank-print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>

    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
  </div>
</template>
<script>
// import overflowInput from "./overflowInput";
// import { mixinGetCaseApiList } from "@/common/js/mixins";
// import { mapGetters } from "vuex";
// import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone,validateIDNumber  } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber :validateIDNumber,
      isOverflow: false,
      isOverLine: false,
      formData: {
        caseNumber:"",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        partyName: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        illegalFact:"",
        punishLaw: "",
        illegalLaw: "",
        tempPunishAmount: "",
        socialCreditCode: "",
        illegalFactsEvidence: "",
        reconsiderationOrgan: "",
        litigationOrgan:"",
        test: "",
        otherWay: "",
        account:"",
        bank:"",
        makeDate:"",
      },
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      rules: {
        party: [
          { required: true, message: '当事人姓名不能为空', trigger: 'blur' },
        ],
        partyAddress: [
          { required: true, message: '当事人地址不能为空', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator:validateIDNumber , trigger: "blur"}
        ],
        partyTel: [
          { required: true, message: '当事人联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '单位地址不能为空', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: '法人不能为空', trigger: 'blur' },
        ],
        socialCreditCode: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
        ],
        punishLaw: [
          { required: true, message: '处罚依据必须填写', trigger: 'blur' },
        ],
        illegalLaw: [
          { required: true, message: '违法依据必须填写', trigger: 'blur' },
        ],
        tempPunishAmount: [
          { required: true, message: '行政处罚必须填写', trigger: 'blur' },
        ],
         illegalFact: [
          { required: true, message: '违法事实及依据必须填写', trigger: 'blur' },
        ],
        litigationOrgan: [
          { required: true, message: '行政诉讼机构必须填写', trigger: 'change' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '行政复议机构必须填写', trigger: 'change' },
        ],
        otherWay: [
          { required: true, message: '其他执行方式和期限必须填写', trigger: 'change' },
        ],
        bank:[
          { required: true, message: '银行名称必须填写', trigger: 'change' },
        ],
        account:[
          { required: true, message: '银行账户必须填写', trigger: 'change' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      lineStyleFlag: false,
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
        pageDomId: "adminPunish_print",
        isHuanjie: true
      },
      huanjieAndDocId: this.BASIC_DATA_SYS.punishDecisionDoc_huanjieAndDocId, //行政处罚决定书的文书id
      isParty: true, //当事人类型为个人
      isPdf: "",
      overFlowEditList: [{}, {}],
      needDealData:true,
      reconsiderationOrganList:[], //复议机构列表
      enforcementOrganList:[], //诉讼机构列表
      originalData:"",
      propertyFeatures:'',
    };
  },

  methods: {
      // 打印
    print() {
      console.log("打印!");
    },
    // 多行编辑
    overFlowEdit() {
      // this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log("回显", edit);
      this.formData.illegalFactsEvidence = edit;
    },
    saveData(handleType) {
      // this.com_submitCaseForm(handleType, "docForm", true);
      // 预览样式
      // this.isPdf = "color_FFFFFF";
      this.formData.otherWay=this.formData.otherWay||'';
       this.com_submitCaseForm(handleType, "docForm", true);
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
    },
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    getDataAfter(){
      //获取机构详情
      let params = { id: iLocalStroage.gets("userInfo").organId };
       let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          console.log("机构", res);
          let organData = res.data;
          if(this.caseLinkDataForm.status == ''){
              _this.formData.bank = organData.bank||'';
              _this.formData.account = organData.account||'';
          }          
          //复议机构
          if(organData.reconsiderationOrgan1){
             _this.reconsiderationOrganList.push(organData.reconsiderationOrgan1)
          }
          if(organData.reconsiderationOrgan2){
             _this.reconsiderationOrganList.push(organData.reconsiderationOrgan2)
          }
          //诉说机构
          if(organData.enforcementOrgan1){
             _this.enforcementOrganList.push(organData.enforcementOrgan1)
          }
          if(organData.enforcementOrgan2){
             _this.enforcementOrganList.push(organData.enforcementOrgan2)
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.setData();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
