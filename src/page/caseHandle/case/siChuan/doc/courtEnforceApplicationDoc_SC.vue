<template>
  <div class="print_box">
    <div class="print_info" id="courtEnforceApplicationDoc-print">
      <el-form :rules="rules" ref="courtEnforceApplicationForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">申请法院强制执行申请书</div>
        <p class="p_begin">
          申请人：
          <span>
            <el-form-item prop="applicant" style="width: 554px;" :rules="fieldRules('applicant',propertyFeatures['applicant'])">
              <el-input v-model="docData.applicant" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicant'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          申请人负责人：
          <span>
            <el-form-item prop="applicantLeader" style="width: 506px;" :rules="fieldRules('applicantLeader',propertyFeatures['applicantLeader'])">
              <el-input v-model="docData.applicantLeader" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['applicantLeader'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          被申请人（基本信息）：
          <span>
            <el-form-item prop="respondent" style="width: 442px;" :rules="fieldRules('respondent',propertyFeatures['respondent'])">
              <el-input v-model="docData.respondent" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['respondent'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <!-- <br>  -->
        <p class="p_begin">
          请求事项：强制执行
          <span>
            <el-form-item prop="caseNumber1" style="width: 360px;" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
             <el-input v-model="docData.caseNumber1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber1'])"></el-input>
            </el-form-item>
          </span>号
          <span>
            <el-form-item prop="administrativeDecision" style="width: 360px;" :rules="fieldRules('administrativeDecision',propertyFeatures['administrativeDecision'])">
<!--              <el-input v-model="docData.administrativeDecision" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['administrativeDecision'])"></el-input>-->
              <el-input :disabled="fieldDisabled(propertyFeatures['administrativeDecision'])" type="textarea" ref="administrativeDecision" clearable class="w-120" v-model="docData.administrativeDecision" size="small"></el-input>
            </el-form-item>
          </span>行政决定。
        </p>
        <p class="p_begin">
          事实与理由：
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="factsAndReasons"
              :rules="fieldRules('factsAndReasons',propertyFeatures['factsAndReasons'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.factsAndReasons"
                rows="3"
                maxlength="1024"
                :disabled="fieldDisabled(propertyFeatures['factsAndReasons'])"
              ></el-input>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p>
          鉴于上述情况，根据《行政诉讼法》第六十五条、《行政强制法》第五十三条、第五十四条的规定及相关法规、规章的规定，特申请贵院依法强制执行。
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
          </span>
        </p>
        <p>
          <span>附件：1.主体资格证明材料（编办三定文件，机关/事业单位法人证书，法律法规授权依据等，主要用于证明具有执法主体资格）</span>
        </p>
        <p>
         2.行政处罚决定书以及相关证据材料
        </p>
        <p>
          3.当事人身份证件资料
        </p>
        <p>
          4.《催告书》以及当事人陈述意见
        </p>
        <p>
         5.涉案扣押物及相关情况（如有则提供）。
        </p>
        <br />
        <p>
          申请人：
        </p>
        <div class="pdf_seal">
          <span>
            负责人签字：</span>
          <br />
          <el-form-item prop="makeDate">
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
          <span>备注：法院对申请强制执行有其他要求的，从其规定。</span>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'courtEnforceApplication-print'" :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>


  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
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
        applicantLeader:'',
        respondent:'',
        administrativeDecision:'',
        factsAndReasons:'',
        caseNumber1:'',
        courtName:'',
        makeDate:''
      },
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
        applicant: [
          { required: true, message: '申请人必须填写', trigger: 'blur' },
        ],
        applicantLeader: [
          { required: true, message: '申请人法定代表人必须填写', trigger: 'blur' },
        ],
        respondent: [
          { required: true, message: '被申请人必须填写', trigger: 'blur' },
        ],
        administrativeDecision: [
          { required: true, message: '行政决定必须填写', trigger: 'blur' },
        ],
        factsAndReasons: [
          { required: true, message: '事实与理由必须填写 ', trigger: 'blur' },
        ],
        caseNumber1: [
          { required: true, message: '行政处罚决定书编号必须填写', trigger: 'blur' },
        ],
        courtName: [
          { required: true, message: '法院名称必须填写', trigger: 'blur' },
        ],
        makeDate: [
          { required: true, message: '签字日期必须填写', trigger: 'blur' },
        ],
      },
      factsAndReasonsLength: 1024,
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
        pageDomId: "courtEnforceApplication-print"
      },
      needDealData: true,
      propertyFeatures:''
    }
  },

  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() { 
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId, //流程里的案件id
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "courtEnforceApplicationForm");
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
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
    getDataAfter(){

        //获取机构详情
        let params = { id: iLocalStroage.gets("userInfo").organId };
        let _this = this
        this.$store.dispatch("getOrganDetail", params).then(
            res => {
                console.log("机构", res);
                let organData = res.data;
                _this.docData.courtName = organData.enforcementOrgan1||'';
            },
            err => {
                console.log(err);
            }
        );
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
#courtEnforceApplicationDoc-print{
   height:1220px;
  
}
</style>
