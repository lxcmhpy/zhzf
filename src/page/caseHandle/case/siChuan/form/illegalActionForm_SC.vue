<template>
  <div class="print_box">
    <div class="print_info indent_style" id="illegalAction_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">违法行为通知书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="side_right_indent">
          当事人（个人姓名或单位名称）：
          <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])" style="width: 250px;">
            <el-input
              type="textarea"
              v-model="formData.party"
              v-bind:class="{ over_flow:formData.party && formData.party.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['party'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
        </p>
        <p>
          &nbsp;&nbsp;经调查，本机关认为你（单位）
          <span>
            <el-form-item prop="caseCauseNameCopy" style="width:250px;" :rules="fieldRules('caseCauseNameCopy',propertyFeatures['caseCauseNameCopy'])">
              <el-input
                type="textarea"
                v-model="formData.caseCauseNameCopy"
                v-bind:class="{ over_flow:formData.caseCauseNameCopy && formData.caseCauseNameCopy.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['caseCauseNameCopy'])"
                style="width:250px;"
              ></el-input>
            </el-form-item>
          </span>行为，违反了
          <span>
            <el-form-item prop="illegalBasis" :rules="fieldRules('illegalBasis',propertyFeatures['illegalBasis'])" style="width:250px;">
              <el-input
                type="textarea"
                v-model="formData.illegalBasis"
                v-bind:class="{ over_flow:formData.illegalBasis && formData.illegalBasis.length>14?true:false }"
                :autosize="{ minRows: 1, maxRows: 2}"
                :maxLength="maxLength"
                style="width:250px;"
                :disabled="fieldDisabled(propertyFeatures['illegalBasis'])"
              ></el-input>
            </el-form-item>
          </span>的规定，依据
          <span>
            <el-form-item prop="punishLaw" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])" style="width:250px;">
              <el-input type="textarea" v-model="formData.punishLaw" v-bind:class="{ over_flow:formData.punishLaw && formData.punishLaw.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}" :maxLength="maxLength" :disabled="fieldDisabled(propertyFeatures['punishLaw'])" style="width:250px;"></el-input>
            </el-form-item>
          </span>的规定，本机关拟作出
          <span>
            <!-- <el-form-item prop="punishDecisionSelect">
              <el-input type="textarea" v-model="formData.punishDecisionSelect" v-bind:class="{ over_flow:formData.punishDecisionSelect && formData.punishDecisionSelect.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}" :maxLength="maxLength"></el-input>
            </el-form-item>
            </span> -->
             <!-- <el-select v-model="formData.punishDecision">
                <el-option
                  v-for="item in punishDecisionOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select> -->
            <el-form-item prop="punishDecision" :rules="fieldRules('punishDecision',propertyFeatures['punishDecision'])" style="width:250px;">
              <el-input type="textarea" v-model="formData.punishDecision" v-bind:class="{ over_flow:formData.punishDecision && formData.punishDecision.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}" :maxLength="maxLength" @focus="showPunishDecision" :disabled="fieldDisabled(propertyFeatures['punishDecision'])" style="width:250px;"></el-input>
            </el-form-item>
          </span>的处罚决定。
        </p>

        <p>
          &nbsp;&nbsp;
          <el-checkbox v-model="formData.checkLaw1"></el-checkbox> 根据《中华人民共和国行政处罚法》第三十一条、第三十二条的规定，你（单位）如对该处罚意见有异议，可向本机关提出陈述申辩，本机关将依法予以核实。
        </p>
        <p>
          &nbsp;&nbsp;
          <el-checkbox v-model="formData.checkLaw2"></el-checkbox> 根据《中华人民共和国行政处罚法》第四十二条的规定，你（单位）有权在收到本通知书之日起三日内向本机关要求举行听证；逾期不要求举行听证的，视为你（单位）放弃听证的权利。
        </p>
        <p>（注：在序号前□内打“√”的为当事人享有该权利。）</p>
        <br />
        <el-row>
          <el-col :span="12">
            <p>
              联系地址：
              <el-form-item v-if="!lineStyleFlag" prop="organAddress" style="width:180px" :rules="fieldRules('organAddress',propertyFeatures['organAddress'])">
                <el-input
                  type="textarea"
                  v-model="formData.organAddress"
                  v-bind:class="{ over_flow:formData.organAddress && formData.organAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organAddress'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.organAddress}}</u>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              邮编：
              <el-form-item v-if="!lineStyleFlag" prop="organZipCode" style="width:210px" :rules="fieldRules('organZipCode',propertyFeatures['organZipCode'],validateZIP)">
                <el-input
                  type="textarea"
                  v-model="formData.organZipCode "
                  v-bind:class="{ over_flow:formData.organZipCode && formData.organZipCode.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organZipCode'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.organZipCode }}</u>
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>
              联系人：
              <el-form-item v-if="!lineStyleFlag" prop="organContactor" style="width:200px" :rules="fieldRules('organContactor',propertyFeatures['organContactor'])">
                <el-input
                  type="textarea"
                  v-model="formData.organContactor"
                  v-bind:class="{ over_flow:formData.organContactor && formData.organContactor.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organContactor'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.organContactor}}</u>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              联系电话：
              <el-form-item v-if="!lineStyleFlag" prop="organTel" style="width:180px" :rules="fieldRules('organTel',propertyFeatures['organTel'],validatePhone)">
                <el-input
                  type="textarea"
                  v-model="formData.organTel"
                  v-bind:class="{ over_flow:formData.organTel && formData.organTel.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxLength="maxLength"
                  placeholder="/"
                  :disabled="fieldDisabled(propertyFeatures['organTel'])"
                ></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{formData.organTel}}</u>
            </p>
          </el-col>
        </el-row>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
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
      :pageDomId="'illegalAction_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput> -->
    <illegalActionPunishDecision ref="illegalActionPunishDecisionRef" @sendPunishDecis="setPunishDecis"></illegalActionPunishDecision>
  </div>
</template>


<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
// import overflowInput from "../modle/overflowInput";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateZIP } from "@/common/js/validator";
import illegalActionPunishDecision from "@/page/caseHandle/case/form/illegalActionPunishDecision";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      validatePhone:validatePhone,
      validateZIP:validateZIP,
      formData: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        checkBoxList: "",
        makeDate: "",
        checkLaw1:true,
        checkLaw2:true,
        organContactor:'',
        organTel:'',
        organZipCode:'',
        organAddress:'',
        punishType:'',
        tempPunishAmount:'',
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ],
        caseCauseNameCopy: [
          { required: true, message: "违法行为必须填写", trigger: "blur" }
        ],
        illegalBasis: [
          { required: true, message: "违法事实必须填写", trigger: "blur" }
        ],
        punishLaw: [
          { required: true, message: "违法规定必须填写", trigger: "blur" }
        ],
        punishDecision: [
          { required: true, message: "处罚决定必须填写", trigger: "change" }
        ],
        organContactor:[
          { required: true, message: "联系机构必须填写", trigger: "blur" },
        ],
        organAddress:[
          { required: true, message: "联系地址必须填写", trigger: "blur" }
        ],
        organTel:[
          { required: true, message: "联系电话必须填写", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        organZipCode:[
          { required: true, message: "邮编必须填写", trigger: "blur" },
          { validator: validateZIP, trigger: "blur" }
        ],
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseLinktypeId: this.BASIC_DATA_SYS.illegalActionForm_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
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
        pageDomId: "illegalAction_print",
        isHuanjie: true
      },
      huanjieAndDocId: this.BASIC_DATA_SYS.illegalActionForm_huanjieAndDocId, //违法行为通知书的文书id
      needDealData:true,
      propertyFeatures:'', //字段属性配置

    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  components: {
    // overflowInput,
    casePageFloatBtns,
    illegalActionPunishDecision
  },
  methods: {
    // 多行编辑
    // overFlowEdit() {
    //   let maxlength = 122;
    //   this.$refs.overflowInputRef.showModal(0, "", maxlength);
    // },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFact = edit;
    },
    setData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    // 提交表单
    submitDataIllegal(handleType) {},
    saveData(handleType) {
      //参数  提交类型 、
      this.com_submitCaseForm(handleType, "docForm", true);
    },
    // 盖章
    makeSeal() {
      signature.openURL("oeder");
    },
    // 打印
    print() {
      console.log("打印!");
    },
    //显示拟处罚决定弹窗
    showPunishDecision(){
      this.$refs.illegalActionPunishDecisionRef.showModal();
    },
    //设置拟处罚决定
    setPunishDecis(val){
//      console.log('val',val);
      // console.log('this.formData.punishDecision ',this.formData.punishDecision)
      this.formData.punishDecision = val.fullDecision;
      this.formData.tempPunishAmount = val.amount;
      this.formData.punishType = val.checkDec;
      // 去掉前后逗号

    },
    getDataAfter(){
      //获取机构详情
      let params = { id: iLocalStroage.gets("userInfo").organId };
      let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
//          console.log("机构", res);
          let organData = res.data;
          _this.formData.organContactor = organData.contactor;
          _this.formData.organAddress = organData.address;
          _this.formData.organZipCode = organData.zipCode;
          _this.formData.organTel = organData.telephone;
        },
        err => {
//          console.log(err);
        }
      );
    }
  },
  created() {
    this.setData();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
