
<template>
  <div class="print_box"> 
    <div class="print_info" id="giveUpStatement-print">
      <el-form :rules="rules" ref="enforceApplicationForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">放弃陈述申辩及听证权利的说明</div>
        <p class="p_begin">
          <span style="font-size:20px;font-weight: 600;">
            <el-form-item prop="organName" style="width: 240px;" :rules="fieldRules('organName',propertyFeatures['organName'])">
              <el-input v-model="docData.organName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organName'])"></el-input>
            </el-form-item>：
          </span>
        </p>
        <p>
          我（单位）
          <span>
            <el-form-item prop="party" style="width: 270px;" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['party'])" ref="party" clearable class="w-120" v-model="docData.party" size="small"></el-input>
            </el-form-item>
          </span>
          于
          <span>
            <el-form-item prop="afsj" class="pdf_datapick" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
              <el-date-picker @blur="starttime" v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>
          在
          <span>
            <el-form-item prop="caseNumber1" style="width: 405px;" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
              <el-input v-model="docData.caseNumber1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber1'])"></el-input>
            </el-form-item>
          </span>
          过程中，经交通运输行政执法人员检查发现存在
          <span>
            <el-form-item prop="caseNumber1" style="width: 405px;" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
              <el-input v-model="docData.caseNumber1" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber1'])"></el-input>
            </el-form-item>
          </span>
          的行为，违反了
          <span>
            <el-form-item prop="caseNumber2" style="width: 405px;" :rules="fieldRules('caseNumber2',propertyFeatures['caseNumber2'])">
              <el-input v-model="docData.caseNumber2" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber2'])"></el-input>
            </el-form-item>
          </span>
           的相关规定。我（单位）于
          <span>
            <el-form-item prop="reformTime" class="pdf_datapick" :rules="fieldRules('reformTime',propertyFeatures['reformTime'])">
              <el-date-picker  v-model="docData.reformTime" :disabled="fieldDisabled(propertyFeatures['reformTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>
          接到
          <span>
            <el-form-item prop="caseNumber2" style="width: 200px;" :rules="fieldRules('caseNumber2',propertyFeatures['caseNumber2'])">
              <el-input v-model="docData.caseNumber2" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber2'])"></el-input>
            </el-form-item>
          </span>
          送达的交通违法行为通知书（编号
          <span>
            <el-form-item prop="caseNumber" style="width: 210px;" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
              <el-input v-model="docData.caseNumber" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNumber'])"></el-input>
            </el-form-item>
          </span>
          ），我（单位）对违法事实及认定无任何异议，愿接受行政处罚，放弃陈述、申辩及要求举行听证的权利。
        </p>
        <div class="pdf_seal">
          <span>当事人或代理人签字：</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
              @blur="starttime"
            ></el-date-picker>
          </el-form-item>
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
        applicantManager:'',
        applicantAddress:'',
        applicantTel:'',
        respondent:'',
        respondentManager:'',
        respondentAddress:'',
        respondentTel:'',
        executeMatter:'',
        otherMatter:'',
        party:'',
        caseNumber1:'',
        caseNumber2:'',
        afsj:'',
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
        party: [
          { required: true, message: '案由必须填写 ', trigger: 'blur' },
        ],
        caseNumber1: [
          { required: true, message: '行政处罚决定书编号必须填写', trigger: 'blur' },
        ],
        caseNumber2: [
          { required: true, message: '催告书编号必须填写', trigger: 'blur' },
        ],
        afsj: [
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
        pageDomId: "giveUpStatement-print"
      },
      needDealData: true,
      propertyFeatures:''
    }
  },

  methods: {
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.makeDate) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.makeDate = '';
      }
      if (Date.parse(this.docData.afsj) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.afsj = '';
      }
      if (Date.parse(this.docData.reformTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.reformTime = '';
      }
      if (Date.parse(this.docData.serviceTime1) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.serviceTime1 = '';
      }
    },
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
    saveData(handleType) {
      // this.printContent()
      this.com_addDocData(handleType, "docForm");
    },
    getDataAfter(){
        //获取机构详情
        let params = { id: iLocalStroage.gets("userInfo").organId };
        let _this = this
        this.$store.dispatch("getOrganDetail", params).then(
            res => {
                console.log("机构", res);
                let organData = res.data;
                _this.docData.applicant = organData.contactor||'';
                // _this.docData.applicantManager = organData.account||'';
                _this.docData.applicantAddress=organData.address||'';
                _this.docData.applicantTel=organData.telephone||'';
            },
            err => {
                console.log(err);
            }
        );
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
  },
  created() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  },
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#giveUpStatement-print{
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
