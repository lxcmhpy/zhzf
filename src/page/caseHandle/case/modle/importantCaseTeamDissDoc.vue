<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="importantCaseTeamDissDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">重大案件集体讨论记录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          案件名称：
          <span>
            <el-form-item prop="caseName" style="width: 535px;" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          讨论时间：
          <span>
            <el-form-item prop="discussionStartTime" class="pdf_datapick inputwidth dataTimeReplaceBox" style="width:220px" :rules="fieldRules('discussionStartTime',propertyFeatures['discussionStartTime'])">
              <el-date-picker v-model="docData.discussionStartTime" type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy年MM月dd日HH时mm分" :disabled="fieldDisabled(propertyFeatures['discussionStartTime'])">
              </el-date-picker>
              <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="docData.discussionStartTime"></el-input>
            </el-form-item>
          </span> 至
          <span>
            <el-form-item prop="discussionEndTime" class="pdf_datapick inputwidth dataTimeReplaceBox" style="width:220px" :rules="fieldRules('discussionEndTime',propertyFeatures['discussionEndTime'])">
              <el-date-picker v-model="docData.discussionEndTime" type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy年MM月dd日HH时mm分" :disabled="fieldDisabled(propertyFeatures['discussionEndTime'])">
              </el-date-picker>
              <el-input class="replaceTime" placeholder=" 年 月 日 时 分" v-model="docData.discussionEndTime"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          地点：
          <span>
            <el-form-item prop="discussionPlace" style="width:566px" :rules="fieldRules('discussionPlace',propertyFeatures['discussionPlace'])">
              <el-input v-model="docData.discussionPlace" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['discussionPlace'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          主持人：
          <span>
            <el-form-item prop="presidingHearer" class='width130' :rules="fieldRules('presidingHearer',propertyFeatures['presidingHearer'])">
              <el-input v-model="docData.presidingHearer" maxLength='7' :disabled="fieldDisabled(propertyFeatures['presidingHearer'])"></el-input>
            </el-form-item>
          </span>
          汇报人：
          <span>
            <el-form-item prop="reporter" class='width130' :rules="fieldRules('reporter',propertyFeatures['reporter'])">
              <el-input v-model="docData.reporter" maxLength='7' :disabled="fieldDisabled(propertyFeatures['reporter'])"></el-input>
            </el-form-item>
          </span>
          记录人：
          <span>
            <el-form-item prop="recorder" class='width130' :rules="fieldRules('recorder',propertyFeatures['recorder'])">
              <el-input v-model="docData.recorder" maxLength='7' :disabled="fieldDisabled(propertyFeatures['recorder'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <!-- <p class="p_begin">
          出席人员姓名及职务：
          <span>
            <el-form-item prop="presentMembersName" style="width: 503px;" :rules="fieldRules('presentMembersName',propertyFeatures['presentMembersName'])">
              <el-input v-model="docData.presentMembersName" type='textarea' maxLength='90' rows="2" :disabled="fieldDisabled(propertyFeatures['presentMembersName'])"></el-input>
            </el-form-item>
          </span>
        </p> -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="presentMembersName" :rules="fieldRules('presentMembersName',propertyFeatures['presentMembersName'])">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.presentMembersName" rows="4" maxLength='200'
              :disabled="fieldDisabled(propertyFeatures['presentMembersName'])"></el-input>
              <span class="overflow_describe" style="text-indent: 0">出席人员姓名及职务：</span>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg" >&nbsp;</span>
              <span class="span_bg" >&nbsp;</span>
              <span class="span_bg" >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <!-- <p class="side_right_indent">
          <span class="side_right" @click="overFlowEdit">
            <el-form-item prop="illegalFactsEvidence">
              <span class="over_topic">讨论记录：</span>
              {{docData.illegalFactsEvidence}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </p> -->
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="discussionRecord" :rules="fieldRules('discussionRecord',propertyFeatures['discussionRecord'])">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.discussionRecord" rows="10" maxLength='1500'
              :disabled="fieldDisabled(propertyFeatures['discussionRecord'])"></el-input>
              <span class="overflow_describe" style="text-indent: 0">讨论记录：</span>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span v-for="i in 9" :key="i" class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="overflow_lins_style">
          <div class="overflow_lins_textarea">
            <el-form-item prop="discussionRecord">
              <el-input class='text_indent10' type='textarea' v-model="docData.discussionRecord" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>
          </div>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </div> -->
        <!-- <p class="side_right_indent">
          <span class="side_right" @click="overFlowEdit2">
            <el-form-item prop="illegalFactsEvidence2">
              <span class="over_topic">结论性意见：</span>
              {{docData.illegalFactsEvidence2}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
        </p> -->
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="conclussionOpinion" :rules="fieldRules('conclussionOpinion',propertyFeatures['conclussionOpinion'])">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.conclussionOpinion" rows="3" maxLength='90'
              :disabled="fieldDisabled(propertyFeatures['conclussionOpinion'])"></el-input>
              <span class="overflow_describe" style="text-indent: 0">结论性意见：</span>
              <span class="span_bg"  style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg" >&nbsp;</span>
              <span class="span_bg" >&nbsp;</span>
            </el-form-item>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            出席人员签名：
            <span class="write_line width620"></span>
            <span class="write_line width620"></span>
            <span class="write_line width620"></span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'importantCaseTeamDissDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <!-- <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    <overflowInput ref="overflowInputRef2" @overFloeEditInfo="getOverFloeEditInfo2"></overflowInput> -->
  </div>
</template>
<script>
// import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

export default {
  components: {
    // overflowInput,
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
        caseNumber: '',
        caseName: '',
        discussionStartTime: '',
        discussionEndTime: '',
        discussionPlace: '',
        presidingHearer: '',
        reporter: '',
        recorder: '',
        presentMembersName: '',
        overWidthFlag: false,
        discussionRecord: '',//多行编辑内容
        conclussionOpinion: '',//多行编辑内容
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
        reporter: [
          { required: true, message: '请输入汇报人', trigger: 'blur' },
        ],
        recorder: [
          { required: true, message: '请输入记录人', trigger: 'blur' },
        ],
        presentMembersName: [
          { required: true, message: '请输入出席人员姓名及职务', trigger: 'blur' },
        ],
        discussionRecord: [
          { required: true, message: '请输入讨论记录', trigger: 'blur' },
        ],
        conclussionOpinion: [
          { required: true, message: '请输入结论性意见', trigger: 'blur' },
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
    // 多行编辑
    overFlowEdit() {
      // this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 多行编辑
    overFlowEdit2() {
      // this.$refs.overflowInputRef2.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.discussionRecord = edit;
    },
    // 获取多行编辑内容
    getOverFloeEditInfo2(edit) {
      this.docData.conclussionOpinion = edit;
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
