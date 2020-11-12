<!--长软-->
<template>
  <div class="print_box">
    <div class="print_info" id="importantCaseTeamDissDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">重大案件集体讨论记录</div>
        <div class="doc_number">
          <!-- 案号：{{docData.caseNumber}} -->
          </div>
        <p class="p_begin">
          案件名称：
          <span>
            <el-form-item
              prop="caseName"
              style="width: 535px;"
              :rules="fieldRules('caseName',propertyFeatures['caseName'])"
            >
              <el-input
                v-model="docData.caseName"
                maxlength="32"
                :disabled="fieldDisabled(propertyFeatures['caseName'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          讨论时间：
          <span>
            <el-form-item
              prop="discussionStartTime"
              class="pdf_datapick inputwidth dataTimeReplaceBox"
              style="width:220px"
              :rules="fieldRules('discussionStartTime',propertyFeatures['discussionStartTime'])"
            >
              <el-date-picker
                v-model="docData.discussionStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                :disabled="fieldDisabled(propertyFeatures['discussionStartTime'])"
              ></el-date-picker>
              <el-input
                class="replaceTime"
                placeholder=" 年 月 日 时 分 秒"
                v-model="replaceInquestStartTime"
              ></el-input>
            </el-form-item>
          </span> 至
          <span>
            <el-form-item
              prop="discussionEndTime"
              class="pdf_datapick inputwidth dataTimeReplaceBox"
              style="width:240px"
              :rules="fieldRules('discussionEndTime',propertyFeatures['discussionEndTime'])"
            >
              <el-date-picker
                type="datetime"
                placeholder=" 年 月 日 时 分 秒"
                v-model="docData.discussionEndTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="fieldDisabled(propertyFeatures['discussionEndTime'])"
              ></el-date-picker>
              <el-input
                class="replaceTime"
                placeholder=" 年 月 日 时 分 秒"
                v-model="replaceInquestEndTime"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          地点：
          <span>
            <el-form-item
              prop="discussionPlace"
              style="width:566px"
              :rules="fieldRules('discussionPlace',propertyFeatures['discussionPlace'])"
            >
              <el-input
                v-model="docData.discussionPlace"
                maxlength="30"
                :disabled="fieldDisabled(propertyFeatures['discussionPlace'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
       
        <p class="p_begin">
          主持人：
          <span>
            <el-form-item
              prop="presidingHearer"
              style="width: 550px;"
              :rules="fieldRules('presidingHearer',propertyFeatures['presidingHearer'])"
            >
              <el-input
                v-model="docData.presidingHearer"
                maxlength="7"
                :disabled="fieldDisabled(propertyFeatures['presidingHearer'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          汇报人：
          <span>
            <el-form-item
              prop="presidingHearerPos"
              style="width: 550px;"
              :rules="fieldRules('presidingHearerPos',propertyFeatures['presidingHearerPos'])"
            >
              <el-input
                v-model="docData.presidingHearerPos"
                maxlength="7"
                :disabled="fieldDisabled(propertyFeatures['presidingHearerPos'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          记录人：
          <span>
            <el-form-item
              prop="recorder"
              style="width: 550px;"
              :rules="fieldRules('recorder',propertyFeatures['recorder'])"
            >
              <el-input
                v-model="docData.recorder"
                maxlength="7"
                :disabled="fieldDisabled(propertyFeatures['recorder'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">出席人员姓名级职务：</p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="discussionPeople"
              :rules="fieldRules('discussionPeople',propertyFeatures['discussionPeople'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.discussionPeople"
                rows="3"
                maxlength="60"
                :disabled="fieldDisabled(propertyFeatures['discussionPeople'])"
              ></el-input>
              <!-- <span class="overflow_describe" style="text-indent:0em;">参加人员：</span> -->
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
       
        <p class="p_begin">案件简介：</p>
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="caseInformation"
              :rules="fieldRules('caseInformation',propertyFeatures['caseInformation'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.caseInformation"
                rows="3"
                maxlength="512"
                :disabled="fieldDisabled(propertyFeatures['caseInformation'])"
              ></el-input>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <p class="p_begin">讨论记录：</p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="discussionOpinionAndReason"
              :rules="fieldRules('discussionOpinionAndReason',propertyFeatures['discussionOpinionAndReason'])"
            >
              <el-input
                class="overflow_lins_textarea"
                type="textarea"
                v-model="docData.discussionOpinionAndReason"
                rows="3"
                maxlength="512"
                :disabled="fieldDisabled(propertyFeatures['discussionOpinionAndReason'])"
              ></el-input>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>

            </el-form-item>
          </div>
        </div>
        <!-- 多行样式 -->
        <p class="p_begin">结论性意见：</p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item
              prop="conclussionOpinion"
              :rules="fieldRules('conclussionOpinion',propertyFeatures['conclussionOpinion'])"
            >
              <el-input
                class=" overflow_lins_textarea"
                type="textarea"
                v-model="docData.conclussionOpinion"
                rows="3"
                maxlength="512"
                :disabled="fieldDisabled(propertyFeatures['conclussionOpinion'])"
              ></el-input>
              <span class="span_bg" style="margin-top: 8px;">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
              <span class="span_bg">&nbsp;</span>
               <span class="span_bg">&nbsp;</span>
            </el-form-item>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col :span="20">
            出席人员签字：
            <!-- <span class="write_line width250"></span> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
    <casePageFloatBtns
      :formOrDocData="formOrDocData"
      @saveData="saveData"
    ></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";

export default {
  components: {
    casePageFloatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  data() {
    //验证开始时间
    // var validateStartTime = (rule, value, callback) => {
    //   console.log(Date.parse(this.docData.discussionStartTime));
    //   console.log(Date.parse(this.docData.discussionEndTime));
    //   let parseStartTime = this.docData.discussionStartTime
    //     .replace("年", "-")
    //     .replace("月", "-")
    //     .replace("日", " ")
    //     .replace("时", ":")
    //     .replace("分", "");
    //   let parseEndTime = this.docData.discussionEndTime
    //     .replace("年", "-")
    //     .replace("月", "-")
    //     .replace("日", " ")
    //     .replace("时", ":")
    //     .replace("分", "");
    //   console.log('案发时间=='+this.docData.lasj)
    //   if (Date.parse(parseStartTime) < Date.parse(this.docData.lasj)) {
    //     this.$message({
    //       showClose: true,
    //       message: "开始时间不得小于立案时间",
    //       type: "error",
    //       offset: 100,
    //       customClass: "validateErrorTip",
    //     });
    //     this.docData.discussionStartTime = "";
    //     return callback(new Error("开始时间不得小于立案时间"));
    //   }
    //   if (Date.parse(parseStartTime) > Date.parse(parseEndTime)) {
    //     this.$message({
    //       showClose: true,
    //       message: "开始时间不得大于结束时间",
    //       type: "error",
    //       offset: 100,
    //       customClass: "validateErrorTip",
    //     });
    //     return callback(new Error("开始时间不得大于结束时间"));
    //   }
    //   callback();
    // };
    //验证开始时间
    var validateStartTime = (rule, value, callback) => {
      let parseInquestStartTime = this.docData.discussionStartTime
      let parseinquestEndTime = this.docData.discussionEndTime
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(parseInquestStartTime) < Date.parse(this.docData.lasj)) {
        this.$message({
          showClose: true,
          message: "开始时间不得小于立案时间",
          type: "error",
          offset: 100,
          customClass: "validateErrorTip",
        });
        this.docData.inquestStartTime = ""
        return callback(new Error("开始时间不得小于立案时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(parseinquestEndTime)) {
        this.$message({
          showClose: true,
          message: '开始时间不得大于结束时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        return callback(new Error("开始时间不得大于结束时间"));
      }
      if (Date.parse(parseinquestEndTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: '结束时间不得大于当前时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        this.docData.discussionEndTime = ""
        return callback(new Error("结束时间不得大于当前时间"));
      }
      if (Date.parse(parseInquestStartTime) > Date.parse(new Date())) {
        this.$message({
          showClose: true,
          message: '开始时间不得大于当前时间',
          type: 'error',
          offset: 100,
          customClass: 'validateErrorTip'
        });
        this.docData.discussionStartTime = ""
        return callback(new Error("开始时间不得大于当前时间"));
      }
      callback();
    };
    return {
      docData: {
        caseNumber: "",
        caseName: "",
        discussionStartTime: "",
        discussionEndTime: "",
        discussionPlace: "",
        discussionReason: "",
        presidingHearer: "",
        presidingHearerPos: "",
        recorder: "",
        discussionPeople: "",
        attendPeople: "",
        caseUnderTakePeople: "",
        caseInformation: "",
        discussionOpinionAndReason: "",
        overWidthFlag: false,
        conclussionOpinion: "", //多行编辑内容
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId, //所属环节的id
      },
      rules: {
        caseName: [
          { required: true, message: "请输入案件名称", trigger: "blur" },
        ],
        discussionStartTime: [
          { required: true, message: "请输入开始讨论时间", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        discussionEndTime: [
          { required: true, message: "请输入结束讨论时间", trigger: "blur" },
          { validator: validateStartTime, trigger: "blur" },
        ],
        discussionPlace: [
          { required: true, message: "请输入地点", trigger: "blur" },
        ],
        presidingHearer: [
          { required: true, message: "请输入主持人", trigger: "blur" },
        ],
        presidingHearerPos: [
          { required: true, message: "请输入汇报人", trigger: "blur" },
        ],
        recorder: [
          { required: true, message: "请输入记录人", trigger: "blur" },
        ],
        discussionReason: [
          { required: true, message: "请输入集体讨论原因", trigger: "blur" },
        ],
        discussionPeople: [
          { required: true, message: "请输入参加人员", trigger: "blur" },
        ],
        attendPeople: [
          { required: true, message: "请输入列席人员", trigger: "blur" },
        ],
        caseUnderTakePeople: [
          { required: true, message: "请输入案件承办人员", trigger: "blur" },
        ],
        caseInformation: [
          {
            required: true,
            message: "请输入案件汇报案件情况",
            trigger: "blur",
          },
        ],
        conclussionOpinion: [
          { required: true, message: "请输入结论性意见", trigger: "blur" },
        ],
        discussionOpinionAndReason: [
          {
            required: true,
            message: "请输入参与讨论人员意见和理由",
            trigger: "blur",
          },
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
          false,
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "importantCaseTeamDissDoc-print",
      },
      propertyFeatures: "",
    };
  },
  computed:{
    replaceInquestEndTime() {
      if (this.docData.discussionEndTime) {
        return new Date(this.docData.discussionEndTime).format('yyyy年MM月dd日HH时mm分ss秒')
      }
    },
    replaceInquestStartTime() {
      if (this.docData.discussionStartTime) {
        return new Date(this.docData.discussionStartTime).format('yyyy年MM月dd日HH时mm分ss秒')
      }
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
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    saveData(handleType) {
      // this.printContent()
      this.com_addDocData(handleType, "docForm");
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
          true,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId()
  },
  created() {
    this.isOverStatus();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
#importantCaseTeamDissDoc-print {
  .dataTimeReplaceBox {
    position: relative;
    height: 35px;
    .el-form-item__content .el-date-editor--datetime {
      opacity: 0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime {
      position: absolute;
      top: 0;
      left: 10px;
    }
  }
}
</style>
