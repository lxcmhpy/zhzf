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
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="isParty && !originalData.partyIdNo ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="isParty && !originalData.partyAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input
                  v-model="formData.partyTel"
                  :maxLength="maxLength"
                  :disabled="isParty && !originalData.partyTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input
                  v-model="formData.partyName"
                  :maxLength="maxLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input
                  v-model="formData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input
                  v-model="formData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input
                  v-model="formData.partyManager"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyManager ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input
                  v-model="formData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.socialCreditCode ? false : true"
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
            <el-form-item prop="illegalFact">
              <el-input
                class="text_indent10 overflow_lins_textarea"
                type="textarea"
                v-model="formData.illegalFact"
                rows="3"
                maxlength="90"
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
            <el-form-item prop="illegalLaw">
              <el-input
                type="textarea"
                v-model="formData.illegalLaw"
                v-bind:class="{ over_flow:formData.illegalLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>的规定，依据
          <span contenteditable="true">
            <el-form-item prop="punishLaw" class="width120">
              <el-input
                type="textarea"
                v-model="formData.punishLaw"
                v-bind:class="{ over_flow:formData.punishLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>的规定，决定给予
          <span>
            <el-form-item prop="tempPunishAmount">
              <el-input
                type="textarea"
                v-model="formData.tempPunishAmount"
                v-bind:class="{ over_flow:formData.tempPunishAmount.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
              <!-- <el-input v-model="docData.tempPunishAmount" :maxLength='maxLength' placeholder="\"></el-input> -->
            </el-form-item>
          </span>的行政处罚。
        </p>
        <p>
          处以罚款的，自收到本决定书之日起十五日内缴至
          <span>
            <el-form-item prop="bank">
              <el-input type="textarea" v-model="formData.bank" v-bind:class="{ over_flow:formData.bank && formData.bank.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength" ></el-input>
            </el-form-item>
          </span>，账号
          <span>
            <el-form-item prop="account">
              <el-input type="textarea" v-model="formData.account" v-bind:class="{ over_flow:formData.account && formData.account.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
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
            <el-form-item prop="otherWay">
              <el-input
                class="text_indent10 overflow_lins_textarea"
                type="textarea"
                v-model="formData.otherWay"
                rows="3"
                maxlength="90"
              ></el-input>
              <span class="overflow_describe">其他执行方式和期限：</span>
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
          如果不服本处罚决定，可以在六十日内依法向
          <span>
            <el-form-item prop="reconsiderationOrgan">
              <!-- <el-input
                type="textarea"
                v-model="formData.reconsiderationOrgan"
                v-bind:class="{ over_flow:formData.reconsiderationOrgan && formData.reconsiderationOrgan.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
                placeholder="\"
              ></el-input> -->
              <el-select v-model="formData.reconsiderationOrgan">
                <el-option v-for="(item,index) in reconsiderationOrganList" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向

          <span>
            <el-form-item prop="litigationOrgan">
              <!-- <el-input type="textarea" v-model="formData.litigationOrgan" v-bind:class="{ over_flow:formData.litigationOrgan && formData.litigationOrgan.length>12?true:false }" :maxLength="maxLength" :autosize="{ minRows: 1, maxRows: 3}"  placeholder="\"></el-input> -->
              <el-select v-model="formData.litigationOrgan">
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
          <span @click="makeSeal">交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="formData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
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

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
// import overflowInput from "./overflowInput";
// import { mixinGetCaseApiList } from "@/common/js/mixins";
// import { mapGetters } from "vuex";
// import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// // import signture from "../../../../js/signture";
// import mySignture from "@/common/js/mySignture";
// // import {signture2} from "@/common/js/signture";
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import mySignture from "@/common/js/mySignture";
import { validatePhone } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";

export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
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
        caseLinktypeId: "2c9029d56c8f7b66016c8f8043c90001", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      rules: {
        partyTel: [{ validator: validatePhone, trigger: "blur" }],
        partyUnitTel: [{ validator: validatePhone, trigger: "blur" }],
        punishLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        illegalLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        tempPunishAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
         illegalFact: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        litigationOrgan: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        

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
      huanjieAndDocId: "2c9029ca5b71686d015b71c8a0c10042", //行政处罚决定书的文书id
      isParty: true, //当事人类型为个人
      isPdf: "",
      overFlowEditList: [{}, {}],
      needDealData:true,
      reconsiderationOrganList:[], //复议机构列表
      enforcementOrganList:[], //诉讼机构列表
      originalData:"",
    };
  },

  methods: {
    // 盖章
    makeSeal() {
      mySignture.openURL("oeder");
      // this.$util.openURL('a');
    },
    // 打印
    print() {
      console.log("打印!");
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log("回显", edit);
      this.formData.illegalFactsEvidence = edit;
    },
    saveData(handleType) {
      // this.com_submitCaseForm(handleType, "docForm", true);
      // 预览样式
      this.isPdf = "color_FFFFFF";
      setTimeout(() => {
        this.com_submitCaseForm(handleType, "docForm", true);
      }, 3000);
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
          _this.formData.bank = organData.bank;
          _this.formData.account = organData.account;
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
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
