
<template>
  <div class="print_box">
    <div class="print_info" id="importantCaseTeamDissDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">强制执行申请书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          申请人：
          <span>
            <el-form-item prop="applicant" style="width: 554px;" :rules="fieldRules('applicant',propertyFeatures['applicant'])">
              <el-input v-model="docData.applicant" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicant'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          法定代表人：
          <span>
            <el-form-item prop="applicantManager" style="width: 522px;" :rules="fieldRules('applicantManager',propertyFeatures['applicantManager'])">
              <el-input v-model="docData.applicantManager" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantManager'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="applicantAddress" style="width: 538px;" :rules="fieldRules('applicantAddress',propertyFeatures['applicantAddress'])">
              <el-input v-model="docData.applicantAddress" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantAddress'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item prop="applicantTel" style="width:538px" :rules="fieldRules('applicantTel',propertyFeatures['applicantTel'],validatePhone)">
              <el-input v-model="docData.applicantTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantTel'])"></el-input>
            </el-form-item>
          </span>
        </p> 
        <!-- <br> -->
        <p class="p_begin">
          被申请人：
          <span>
            <el-form-item prop="respondent" style="width: 538px;" :rules="fieldRules('respondent',propertyFeatures['respondent'])">
              <el-input v-model="docData.respondent" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondent'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          法定代表人：
          <span>
            <el-form-item prop="respondentManager" style="width: 522px;" :rules="fieldRules('respondentManager',propertyFeatures['respondentManager'])">
              <el-input v-model="docData.respondentManager" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentManager'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="respondentAddess" style="width: 538px;" :rules="fieldRules('respondentAddess',propertyFeatures['respondentAddess'])">
              <el-input v-model="docData.respondentAddess" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentAddess'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item prop="respondentTel" style="width:538px" :rules="fieldRules('respondentTel',propertyFeatures['respondentTel'],validatePhone)">
              <el-input v-model="docData.respondentTel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondentTel'])"></el-input>
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
              <el-input v-model="docData.executeMatter" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['executeMatter'])"></el-input>
            </el-form-item>
          </span>事项。
        </p>
        <p>
          2、其他事项：
          <span>
            <el-form-item prop="otherMatter" style="width: 360px;" :rules="fieldRules('otherMatter',propertyFeatures['otherMatter'])">
              <el-input v-model="docData.otherMatter" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['otherMatter'])"></el-input>
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
              <el-input v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>一案，申请人于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达了
            <span>
            <el-form-item prop="caseNumber1" style="width: 200px;" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
              <el-input v-model="docData.caseNumber1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber1'])"></el-input>
            </el-form-item>
          </span>（编号）行政处罚决定书，被申请人未在法定的期限内申请行政复议或提起行政诉讼，又不履行该行政处罚决定书规定的义务。申请人于
          <span>
            <el-form-item prop="serviceTime1" class="pdf_datapick" :rules="fieldRules('serviceTime1',propertyFeatures['serviceTime1'])">
              <el-date-picker v-model="docData.serviceTime1" :disabled="fieldDisabled(propertyFeatures['serviceTime1'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达<span>
            <el-form-item prop="caseNumber2" style="width: 200px;" :rules="fieldRules('caseNumber2',propertyFeatures['caseNumber2'])">
              <el-input v-model="docData.caseNumber2" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber2'])"></el-input>
            </el-form-item>
          </span>（编号）催告书，责令其在
          <span>
            <el-form-item prop="reformTime" class="pdf_datapick" :rules="fieldRules('reformTime',propertyFeatures['reformTime'])">
              <el-date-picker v-model="docData.reformTime" :disabled="fieldDisabled(propertyFeatures['reformTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>前主动履行规定义务，被申请人逾期仍未履行。          
        </p> 
        <p>
          <el-checkbox v-model="docData.checkLaw1"></el-checkbox> 鉴于上述情况，根据《中华人民共和国行政强制法》第五十三条的规定，特申请贵院依法强制执行。
        </p>
        <p>
          <el-checkbox v-model="docData.checkLaw2"></el-checkbox> 现因情况紧急，根据《中华人民共和国行政强制法》第五十九条的规定，特申请贵院依法立即强制执行。
        </p>
        <!-- <br> -->
        <p>
          此致
        </p> 
        <p>
          <span>
            <el-form-item prop="courtName" style="width: 200px;" :rules="fieldRules('courtName',propertyFeatures['courtName'])">
              <el-input v-model="docData.courtName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['courtName'])"></el-input>
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
              v-model="docData.makeDate"
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
    <casePageFloatBtns :pageDomId="'importantCaseTeamDissDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

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
      docData: {
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
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //
        caseDoctypeId: this.$route.params.docId, //表单类型IDer
        //表单数据
        docData: "",
        status: "",
        linkTypeId:this.$route.params.caseLinkTypeId //所属环节的id
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
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'importantCaseTeamDissDoc-print',
      },
      propertyFeatures:''
    }
  },

  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {

      this.com_addDocData(handleType, 'docForm');
    },
     // 打印
    print() {
      console.log('打印!');
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
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
