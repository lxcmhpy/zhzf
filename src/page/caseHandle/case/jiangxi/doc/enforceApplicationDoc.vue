
<template>
  <div class="print_box">
    <div class="print_info" id="importantCaseTeamDissDoc-print">
      <el-form :rules="rules" ref="enforceApplicationForm" :inline-message="true" :inline="true" :model="formData">
        <div class="doc_topic">强制执行申请书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <p class="p_begin">
          申请人：
          <span>
            <el-form-item prop="applicant" style="width: 554px;" :rules="fieldRules('applicant',propertyFeatures['applicant'])">
              <el-input v-model="formData.applicant" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicant'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          法定代表人：
          <span>
            <el-form-item prop="applicantManager" style="width: 522px;" :rules="fieldRules('applicantManager',propertyFeatures['applicantManager'])">
              <el-input v-model="formData.applicantManager" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantManager'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="applicantAddress" style="width: 538px;" :rules="fieldRules('applicantAddress',propertyFeatures['applicantAddress'])">
              <el-input v-model="formData.applicantAddress" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantAddress'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item prop="applicantTel" style="width:538px" :rules="fieldRules('applicantTel',propertyFeatures['applicantTel'],validatePhone)">
              <el-input v-model="formData.applicantTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantTel'])"></el-input>
            </el-form-item>
          </span>
        </p> 
        <!-- <br> -->
        <p class="p_begin">
          被申请人：
          <span>
            <el-form-item prop="respondent" style="width: 538px;" :rules="fieldRules('respondent',propertyFeatures['respondent'])">
              <el-input v-model="formData.respondent" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondent'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          法定代表人：
          <span>
            <el-form-item prop="respondentManager" style="width: 522px;" :rules="fieldRules('respondentManager',propertyFeatures['respondentManager'])">
              <el-input v-model="formData.respondentManager" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentManager'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="respondentAddess" style="width: 538px;" :rules="fieldRules('respondentAddess',propertyFeatures['respondentAddess'])">
              <el-input v-model="formData.respondentAddess" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentAddess'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item prop="respondentTel" style="width:538px" :rules="fieldRules('respondentTel',propertyFeatures['respondentTel'],validatePhone)">
              <el-input v-model="formData.respondentTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentTel'])"></el-input>
            </el-form-item>
          </span>
        </p> 
        <!-- <br>  -->
        <p class="p_begin">
          <span style="font-size:20px;font-weight: 600;">请求事项：</span>
        </p>       
        <p>
          1、强制执行
          <span>
            <el-form-item prop="executeMatter" style="width: 360px;" :rules="fieldRules('executeMatter',propertyFeatures['executeMatter'])">
              <el-input v-model="formData.executeMatter" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['executeMatter'])"></el-input>
            </el-form-item>
          </span>事项。
        </p>
        <p>
          2、其他事项：
          <span>
            <el-form-item prop="otherMatter" style="width: 360px;" :rules="fieldRules('otherMatter',propertyFeatures['otherMatter'])">
              <el-input v-model="formData.otherMatter" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['otherMatter'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          <span style="font-size:20px;font-weight: 600;">事实与理由：</span>
        </p> 
        <p>
          因被申请人
          <span>
            <el-form-item prop="caseName" style="width: 200px;" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="formData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>一案，申请人于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="formData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达了
            <span>
            <el-form-item prop="caseNumber1" style="width: 200px;" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
              <el-input v-model="formData.caseNumber1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber1'])"></el-input>
            </el-form-item>
          </span>（编号）行政处罚决定书，被申请人未在法定的期限内申请行政复议或提起行政诉讼，又不履行该行政处罚决定书规定的义务。申请人于
          <span>
            <el-form-item prop="serviceTime1" class="pdf_datapick" :rules="fieldRules('serviceTime1',propertyFeatures['serviceTime1'])">
              <el-date-picker v-model="formData.serviceTime1" :disabled="fieldDisabled(propertyFeatures['serviceTime1'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达<span>
            <el-form-item prop="caseNumber2" style="width: 200px;" :rules="fieldRules('caseNumber2',propertyFeatures['caseNumber2'])">
              <el-input v-model="formData.caseNumber2" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber2'])"></el-input>
            </el-form-item>
          </span>（编号）催告书，责令其在
          <span>
            <el-form-item prop="reformTime" class="pdf_datapick" :rules="fieldRules('reformTime',propertyFeatures['reformTime'])">
              <el-date-picker v-model="formData.reformTime" :disabled="fieldDisabled(propertyFeatures['reformTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>前主动履行规定义务，被申请人逾期仍未履行。          
        </p> 
        <p>
          <el-checkbox v-model="formData.checkLaw1"></el-checkbox> 鉴于上述情况，根据《中华人民共和国行政强制法》第五十三条的规定，特申请贵院依法强制执行。
        </p>
        <p>
          <el-checkbox v-model="formData.checkLaw2"></el-checkbox> 现因情况紧急，根据《中华人民共和国行政强制法》第五十九条的规定，特申请贵院依法立即强制执行。
        </p>
        <!-- <br> -->
        <p>
          此致
        </p> 
        <p>
          <span>
            <el-form-item prop="courtName" style="width: 200px;" :rules="fieldRules('courtName',propertyFeatures['courtName'])">
              <el-input v-model="formData.courtName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['courtName'])"></el-input>
            </el-form-item>
          </span>人民法院
        </p> 
        <p class="p_begin">
          <span>附件：</span>
        </p>
        <p class="p_begin">
          1.行政处罚决定书及送达文书；
        </p>
        <p class="p_begin">
         2.证明材料；
        </p>
        <p class="p_begin">
          3.履行义务催告书及送达文书；
        </p>
        <p class="p_begin">
          4.申请强制执行标的情况；
        </p>
        <p class="p_begin">
         5.法律、行政法规规定的其他材料。
        </p> 
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
          <span>(本文书一式两份：一份存根，一份呈交人民法院。)</span>
        </div>  
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'caseInvest-print'" :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>
    

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
  import {validatePhone, validateIDNumber} from "@/common/js/validator";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        applicant:'',
        applicantManager:'',
        applicantAddress:'',
        applicantTel:'',
        respondent:'',
        respondentManager:'',
        respondentAddress:'',
        respondentTel:'',
        executeMatter:'',
        otherMatter:'',
        caseName:'',
        caseNumber1:'',
        caseNumber2:'',
        serviceTime:'',
        serviceTime1:'',
        reformTime:'',
        checkLaw1:'',
        checkLaw2:'',
        courtName:'',
        
        makeDate:''
      },
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //
        caseLinktypeId: this.BASIC_DATA_JX.courtPunishExecute_JX_caseLinktypeId,
        //表单数据
        formData: "",
        status: ""
      },
      rules: {
        applicant: [
          { required: true, message: '申请人必须填写', trigger: 'blur' },
        ],
        applicantManager: [
          { required: true, message: '申请人法定代表人必须填写', trigger: 'blur' },
        ],
        applicantAddress: [
          { required: true, message: '申请人联系地址必须填写', trigger: 'blur' },
        ],
        applicantTel: [
          { required: true, message: '申请人联系电话必须填写', trigger: 'blur' },
        ],
        respondent: [
          { required: true, message: '被申请人必须填写', trigger: 'blur' },
        ],
        respondentManager: [
          { required: true, message: '被申请人法定代表人必须填写', trigger: 'blur' },
        ],
        respondentAddress: [
          { required: true, message: '被申请人地址必须填写', trigger: 'blur' },
        ],
        respondentTel: [
          { required: true, message: '被申请人联系电话必须填写', trigger: 'blur' },
        ],
        executeMatter: [
          { required: true, message: '执行事项必须填写', trigger: 'blur' },
        ],
        otherMatter: [
          { required: true, message: '其他事项必须填写', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案由必须填写 ', trigger: 'blur' },
        ],
        caseNumber1: [
          { required: true, message: '行政处罚决定书编号必须填写', trigger: 'blur' },
        ],
        caseNumber2: [
          { required: true, message: '催告书编号必须填写', trigger: 'blur' },
        ],
        serviceTime: [
          { required: true, message: '行政处罚决定书送达时间必须填写', trigger: 'blur' },
        ],
        serviceTime1: [
          { required: true, message: '催告书送达时间必须填写', trigger: 'blur' },
        ],
        reformTime: [
          { required: true, message: '责令整改时间必须填写', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      isParty: true,
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
        pageDomId: "caseInvest-print"
      },
      huanjieAndDocId: this.BASIC_DATA_JX.courtPunishExecute_JX_huanjieAndDocId, //案件调查报告的文书id
      needDealData: true,
      propertyFeatures:''
    }
  },

  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "enforceApplicationForm", true);
    },

  },
  created() {
    this.setFormData();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
#importantCaseTeamDissDoc-print{
   height:1220px;
  .dataTimeReplaceBox{
    position: relative;
    height: 35px;
    .el-form-item__content .el-date-editor--datetime{
      opacity:0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime{
      position:absolute;
      top:0;
      left:10px;
    }    
  }
}
</style>
