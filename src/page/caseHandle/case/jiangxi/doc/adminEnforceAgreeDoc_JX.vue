<!---长软-->
<template>
   <div class="print_box">
    <div class="print_info" id="executAnnounceDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">行政强制执行协议书</div>
        <div class="doc_number">赣（{{docData.caseNumber.substring(3,7)}}）交强执协〔{{docData.caseNumber.substring(8,13)}}〕号</div>
        <p>
          本机关于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker @blur="starttime" v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>对
          <span>
            <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" style="width:250px;" :maxLength='maxLength' placeholder="/"></el-input>
            </el-form-item>
          </span>做出了编号为：
          <el-form-item prop="caseNumber1" :rules="fieldRules('caseNumber1',propertyFeatures['caseNumber1'])">
              <el-input v-model="docData.caseNumber1" :disabled="fieldDisabled(propertyFeatures['caseNumber1'])" style="width:250px;" :maxLength='maxLength' placeholder="/"></el-input>
            </el-form-item>的《行政强制执行决定书》，根据《中华人民共和国行政强
            制法》第四十二条的规定，在不损害公共利益和他人合法利益的情况下，与当事人
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])" style="width: 180px;">
            <el-input
              type="textarea"
              v-model="docData.party"
              v-bind:class="{ over_flow:docData.party && docData.party.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              :disabled="fieldDisabled(propertyFeatures['party'])"
            ></el-input>
            <!-- <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :maxLength='maxLength'></el-input> -->
          </el-form-item>
          </span>，身份证号码为：
          <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'])" style="width: 250px;">
            <el-input
              type="textarea"
              v-model="docData.partyIdNo"
              v-bind:class="{ over_flow:docData.partyIdNo && docData.partyIdNo.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 2}"
              :maxLength="maxLength"
              style="width:250px;"
              :disabled="fieldDisabled(propertyFeatures['partyIdNo'])"
            ></el-input>
          </el-form-item>达成以下执行协议：
        </p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="agreeMent1" :rules="fieldRules('agreeMent1',propertyFeatures['agreeMent1'])">
              <el-input
                class="text_indent2 overflow_lins_textarea"
                type="textarea"
                v-model="docData.agreeMent1"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['investQagreeMent1uestion'])"
              ></el-input>
              <span class="overflow_describe">1、</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
          <el-form-item prop="agreeMent2" :rules="fieldRules('agreeMent2',propertyFeatures['agreeMent2'])">
              <el-input
                class="text_indent2 overflow_lins_textarea"
                type="textarea"
                v-model="docData.agreeMent2"
                rows="3"
                maxlength="90"
                :disabled="fieldDisabled(propertyFeatures['agreeMent2'])"
              ></el-input>
              <span class="overflow_describe">2、</span>
              <span class="span_bg span_bg_top">&nbsp;</span>
              <span
                v-for="item in overFlowEditList"
                :key="item.id"
                class="span_bg"
              >&nbsp;</span>
            </el-form-item>
          </div>
        </div>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker @blur="starttime" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'executAnnounceDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateZIP } from "@/common/js/validator";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      validatePhone:validatePhone,
      docData: {
        caseNumber: '',
        party:'',
        partyIdNo:'',
        caseName: '',
        serviceTime: '',
        agreeMent1:'',
        agreeMent2:'',
        makeDate: '',
        caseNumber1: ''
      },
      lineStyleFlag: false,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.BASIC_DATA_JX.adminEnforceAgreeDoc_JX_caseDocTypeId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      overFlowEditList: [{}],
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        serviceTime: [
          { required: true, message: '移送时间必须填写', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案件名称必须填写', trigger: 'blur' },
        ],
        caseNumber: [
          { required: true, message: '案件编号必须填写', trigger: 'blur' },
        ],
        party: [
            { required: true, message: '当事人必须填写', trigger: 'blur' },
        ],
        partyIdNo: [
            { required: true, message: '身份证号必须填写', trigger: 'blur' },
        ],
        agreeMent1: [
            { required: true, message: '协议内容必须填写', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'executAnnounceDoc_print',
      },
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
      if (Date.parse(this.docData.serviceTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.serviceTime = '';
      }
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)

    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, 'docForm');
    },
     // 打印
    print() {
      console.log('打印!');
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.docData.illegalFactsEvidence = edit;
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
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
