
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
            <el-form-item prop="discussionPlace" style="width:538px" :rules="fieldRules('discussionPlace',propertyFeatures['discussionPlace'])">
              <el-input v-model="docData.discussionPlace" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['discussionPlace'])"></el-input>
            </el-form-item>
          </span>
        </p> 
        <!-- <br> -->
        <p class="p_begin">
          被申请人：
          <span>
            <el-form-item prop="caseName" style="width: 538px;" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          法定代表人：
          <span>
            <el-form-item prop="caseName" style="width: 522px;" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系地址：
          <span>
            <el-form-item prop="caseName" style="width: 538px;" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          联系电话：
          <span>
            <el-form-item prop="discussionPlace" style="width:538px" :rules="fieldRules('discussionPlace',propertyFeatures['discussionPlace'])">
              <el-input v-model="docData.discussionPlace" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['discussionPlace'])"></el-input>
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
            <el-form-item prop="caseUnderTakePeople" style="width: 360px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
            </el-form-item>
          </span>事项。
        </p>
        <p>
          2、其他事项：
          <span>
            <el-form-item prop="caseUnderTakePeople" style="width: 360px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          <span style="font-size:20px;font-weight: 600;">事实与理由：</span>
        </p> 
        <p>
          因被申请人
          <span>
            <el-form-item prop="caseUnderTakePeople" style="width: 200px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
            </el-form-item>
          </span>一案，申请人于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达了
            <span>
            <el-form-item prop="caseUnderTakePeople" style="width: 200px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
            </el-form-item>
          </span>（编号）行政处罚决定书，被申请人未在法定的期限内申请行政复议或提起行政诉讼，又不履行该行政处罚决定书规定的义务。申请人于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>向被申请人送达<span>
            <el-form-item prop="caseUnderTakePeople" style="width: 200px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
            </el-form-item>
          </span>（编号）催告书，责令其在
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
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
            <el-form-item prop="caseUnderTakePeople" style="width: 200px;" :rules="fieldRules('caseUnderTakePeople',propertyFeatures['caseUnderTakePeople'])">
              <el-input v-model="docData.caseUnderTakePeople" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseUnderTakePeople'])"></el-input>
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

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      console.log(Date.parse(this.docData.discussionStartTime))
      console.log(Date.parse(this.docData.discussionEndTime))
      let parseStartTime = this.docData.discussionStartTime.replace('年','-').replace('月','-').replace('日',' ').replace('时',":").replace('分',"");
      let parseEndTime = this.docData.discussionEndTime.replace('年','-').replace('月','-').replace('日',' ').replace('时',":").replace('分',"");
      if(Date.parse(parseStartTime)>Date.parse(parseEndTime)){
        this.$message({
              showClose: true,
              message: '开始时间不得大于结束时间',
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      callback();
    };
    return {
      docData: {
        applicant:'',
        applicantManager:'',
        applicantAddress:'',
        checkLaw1:'',
        checkLaw2:'',
        serviceTime:'',
        caseNumber: '',
        caseName: '',
        discussionStartTime: '',
        discussionEndTime: '',
        discussionPlace: '',
        discussionReason:'',
        presidingHearer: '',
        presidingHearerPos: '',
        recorder: '',
        discussionPeople:'',
        attendPeople:'',
        caseUnderTakePeople:'',
        caseInformation:'',
        discussionOpinionAndReason:'',
        // presentMembersName: '',
        overWidthFlag: false,
        // discussionRecord: '',//多行编辑内容
        conclussionOpinion: '',//多行编辑内容
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
        caseName: [
          { required: true, message: '请输入案件名称', trigger: 'blur' },
        ],
        discussionStartTime: [
          { required: true, message: '请输入开始讨论时间', trigger: 'blur' },
          { validator: validateStartTime, trigger: "blur" }
        ],
        discussionEndTime: [
          { required: true, message: '请输入结束讨论时间', trigger: 'blur' },
          { validator: validateStartTime, trigger: "blur" }
        ],
        discussionPlace: [
          { required: true, message: '请输入地点', trigger: 'blur' },
        ],
        presidingHearer: [
          { required: true, message: '请输入主持人', trigger: 'blur' },
        ],
        presidingHearerPos: [
          { required: true, message: '请输入职务', trigger: 'blur' },
        ],
        recorder: [
          { required: true, message: '请输入记录人', trigger: 'blur' },
        ],
        discussionReason: [
          { required: true, message: '请输入集体讨论原因', trigger: 'blur' },
        ],
        discussionPeople: [
          { required: true, message: '请输入参加人员', trigger: 'blur' },
        ],
        attendPeople: [
          { required: true, message: '请输入列席人员', trigger: 'blur' },
        ],
        caseUnderTakePeople: [
          { required: true, message: '请输入案件承办人员', trigger: 'blur' },
        ],
        caseInformation: [
          { required: true, message: '请输入案件汇报案件情况', trigger: 'blur' },
        ],
        conclussionOpinion: [
          { required: true, message: '请输入结论性意见', trigger: 'blur' },
        ],
        discussionOpinionAndReason: [
          { required: true, message: '请输入参与讨论人员意见和理由', trigger: 'blur' },
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
