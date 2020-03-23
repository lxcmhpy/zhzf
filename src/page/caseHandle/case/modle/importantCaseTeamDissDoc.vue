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
            <el-form-item prop="caseName">
              <el-input v-model="docData.caseName" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          讨论时间：
          <span>
            <el-form-item prop="discussionStartTime" class="pdf_datapick">
              <el-date-picker v-model="docData.discussionStartTime" type="datetime" format="yyyy年MM月dd日HH时mm分" placeholder="    年  月  日  时  分">
              </el-date-picker>
            </el-form-item>
          </span>至
          <span>
            <el-form-item prop="discussionEndTime" class="pdf_datapick">
              <el-date-picker v-model="docData.discussionEndTime" type="datetime" format="yyyy年MM月dd日HH时mm分" placeholder="    年  月  日  时  分">
              </el-date-picker>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          地点：
          <span>
            <el-form-item prop="discussionPlace">
              <el-input v-model="docData.discussionPlace" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          主持人：
          <span>
            <el-form-item prop="presidingHearer">
              <el-input v-model="docData.presidingHearer" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
          汇报人：
          <span>
            <el-form-item prop="reporter">
              <el-input v-model="docData.reporter" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
          记录人：
          <span>
            <el-form-item prop="recorder">
              <el-input v-model="docData.recorder" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
        </p>
        <p class="p_begin">
          出席人员姓名：
          <span>
            <el-form-item prop="presentMembersName">
              <el-input v-model="docData.presentMembersName" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>
        </p>
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
          <div class="overflow_lins_textarea">
            <el-form-item prop="discussionRecord">
              <el-input class='text_indent10' type='textarea' v-model="docData.discussionRecord" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>
          </div>
          <span class="overflow_describe">讨论记录：</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </div>
        <p v-if="lineStyleFlag">
          讨论记录：<u>{{docData.discussionRecord}}</u>
        </p>

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
          <div class="overflow_lins_textarea">
            <el-form-item prop="conclussionOpinion">
              <el-input class='text_indent10' type='textarea' v-model="docData.conclussionOpinion" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>
          </div>
          <span class="overflow_describe"> 结论性意见：</span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit2">&nbsp;</span>
        </div>
        <p v-if="lineStyleFlag">
          结论性意见：<u>{{docData.conclussionOpinion}}</u>
        </p>

        <el-row :gutter="20">
          <el-col :span="12">
            出席人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'importantCaseTeamDissDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    <overflowInput ref="overflowInputRef2" @overFloeEditInfo="getOverFloeEditInfo2"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// import signture from "../../../../js/signture";
import mySignture from "@/common/js/mySignture";

export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      docData: {
        caseNumber: '',
        caseName:'',
        discussionStartTime: '',
        discussionEndTime: '',
        discussionPlace: '',
        presidingHearer: '',
        reporter: '',
        recorder: '',
        presentMembersName: '',
        discussionRecord: '',
        conclussionOpinion: '',
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
        status: ""
      },
      rules: {
        caseName: [
          { required: true, message: '请输入案件名称', trigger: 'blur' },
        ],
        discussionStartTime: [
          { required: true, message: '请输入开始讨论时间', trigger: 'blur' },
        ],
        discussionEndTime: [
          { required: true, message: '请输入结束讨论时间', trigger: 'blur' },
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
          { required: true, message: '请输入出席人员姓名', trigger: 'blur' },
        ],
        discussionRecord: [
          { required: true, message: '请输入讨论记录', trigger: 'blur' },
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'importantCaseTeamDissDoc-print',
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
      this.com_getDocDataByCaseIdAndDocId(data);

    },
    //保存文书信息
    addDocData(handleType) {

      this.com_addDocData(handleType, 'docForm');
    },
    // 盖章
    makeSeal() {
      console.log('盖章!');
      mySignture.openURL('oeder');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 多行编辑
    overFlowEdit2() {
      this.$refs.overflowInputRef2.showModal(0, '', this.maxLengthOverLine);
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
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
