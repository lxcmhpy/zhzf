<template>
  <div class="print_box">
    <div class="print_info" id="test_print">
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
              <!-- <span v-show="hidePar2"  class="text_indent10 overflow_lins_textarea"  style="display:inline-block;width:100%;position: absolute;left: 0;top: 0;line-height: 32px;text-indent: 12em;">{{formData.illegalFact}}</span> -->
              
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
          <span style="width:160px;display:inline-block;">
            <el-form-item prop="illegalLaw" style="width:160px;display:inline-block;">
              <el-input
                type="textarea"
                v-model="formData.illegalLaw"
                v-bind:class="{ over_flow:formData.illegalLaw.length>12?true:false }"
                :autosize="{ minRows: 1, maxRows: 3}"
                :maxLength="maxLength"
              ></el-input>
              <!-- <span v-show="hidePar2"  v-bind:class="{ over_flow:formData.illegalLaw.length>12?true:false }" style="display:inline-block;width:100%;position: absolute;left: 0;top: 0;line-height: 15px;">{{formData.illegalLaw}}</span> -->
            </el-form-item>
           
           
            <!-- <p style="width:158px;height: 50px;overflow: auto;line-height: 20px;display: inline-block;">撒娇的开始撒娇的开始撒娇的开始撒娇的开始撒娇的开始撒娇的开始</p> -->
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
          <!-- <span @click="makeSeal">交通运输执法部门(印章)</span> -->
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
         <el-button @click="test" >测试</el-button>
      </el-form>
    </div>

    <casePageFloatBtns
      :pageDomId="'subOutputRank-print'"
    ></casePageFloatBtns>
   
  
  </div>
</template>
<script>

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import mySignture from "@/common/js/mySignture";
import { validatePhone } from "@/common/js/validator";
import iLocalStroage from "@/common/js/localStroage";
import { htmlExportPDF } from '@/common/js/htmlExportPDF';
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
        hidePart:true,
        hidePar2:false,
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
    //   setTimeout(() => {
    //     this.com_submitCaseForm(handleType, "docForm", true);
    //   }, 3000);
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
    test(){ 
        this.hidePart=false;
        this.hidePar2=true;
        let obj = document.getElementsByTagName('textarea');
        console.log(obj);
        console.log(obj[0]);

        let obj2 = [];
        
        for(let i=0;i<obj.length;i++){
          console.log(obj[i]);
          //获取textarea的值
          let textAreaValue = obj[i].value;
          //获取textarea的classname
          let textAreaBoxClass = obj[i].parentNode.className;
          console.log('textAreaBoxClass',textAreaBoxClass);
          let objParent = obj[i].parentNode.parentNode;
          console.log('objParent',objParent);
          //追加span元素
          let newSpan = document.createElement("span");
          newSpan.innerHTML = textAreaValue;
          newSpan.setAttribute("class", textAreaBoxClass); 
          // newSpan.className +='newSpanClass'
          obj[i].parentNode.style.display='none'
          objParent.appendChild(newSpan);
        }
        
        setTimeout(() => {
            htmlExportPDF('test_print',function(){})
        }, 1000)
       
    }
  },
  created() {
    // this.setData();
  }
};
</script>
<style lang="scss" >
@import "@/assets/css/caseHandle/caseDocModle.scss";


</style>
