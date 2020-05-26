<!-------长软------->
<template>
  <div class="print_box">
      <div class="print_info"  id="prolongAdmin-print">
        <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
          <div class="doc_topic">延长行政强制措施期限通知书</div>
          <div class="doc_number">案号：{{docData.caseNumber}}</div>
          <p class="p_begin">
            当事人（个人姓名或单位名称）
            <span>
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                <el-input :disabled="fieldDisabled(propertyFeatures['party'])" v-model="docData.party" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>:
          </p>
          <p>
            因你（单位）
            <span>
              <el-form-item prop="caseCauseName" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
                <el-input :disabled="fieldDisabled(propertyFeatures['caseCauseName'])" v-model="docData.caseCauseName" type='textarea'  v-bind:class="{ over_flow:docData.caseCauseName.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}"   :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>，本机关依法于
            <span>
              <el-form-item prop="enforceDate" class="pdf_datapick" :rules="fieldRules('enforceDate',propertyFeatures['enforceDate'])">
                <el-date-picker :disabled="fieldDisabled(propertyFeatures['enforceDate'])" v-model="docData.enforceDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </span>对你（单位）采取了
            <span>
              <el-form-item prop="enforceMeasure" :rules="fieldRules('enforceMeasure',propertyFeatures['enforceMeasure'])">
                <el-input :disabled="fieldDisabled(propertyFeatures['enforceMeasure'])" v-model="docData.enforceMeasure" type='textarea'  v-bind:class="{ over_flow:docData.enforceMeasure.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}"  :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>的行政强制措施，行政强制措施决定书案号：
            <span>
              <el-form-item prop="caseNumberCopy" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
                <el-input :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])" v-model="docData.caseNumberCopy" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>。
          </p>
          <p>
            现因
            <span>
              <el-form-item prop="situationDescription" :rules="fieldRules('situationDescription',propertyFeatures['situationDescription'])">
                <el-input v-model="docData.situationDescription"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['situationDescription'])"></el-input>
              </el-form-item>
            </span>，依据《中华人民共和国行政强制法》第二十五条的规定，决定延长行政强制措施期限至
            <span>
              <el-form-item prop="delayDate" class="pdf_datapick" :rules="fieldRules('delayDate',propertyFeatures['delayDate'])">
                <el-date-picker v-model="docData.delayDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['delayDate'])">
                </el-date-picker>
              </el-form-item>
            </span>。
          </p>

           <div class="pdf_seal">
            <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
            <el-form-item prop="signatureDate" class="pdf_datapick">
              <el-date-picker v-model="docData.signatureDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="notice clear">
            <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
          </div>
        </el-form>
      </div>
           <!-- 悬浮按钮 -->
          <casePageFloatBtns :pageDomId="'prolongAdmin-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

          <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
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
    //延长日期验证
    var validateIfDate = (rule, value, callback) => {
      var diff = new Date(new Date(value).format("yyyy-MM-dd")).getTime() - new Date(this.docData.endDate).getTime();
      var days = diff/24/60/60/1000;
      console.log("相差天数",diff/24/60/60/1000)
      if (days < 1 || days > 29 ) {
        return callback("延长期限不能超过行政强制措施期限截止日期30日(最多30日,不少于1日)");
      }
      callback();
    };
    return {
      docData: {
        caseNumber: '',
        party: '',
        caseCauseName: '',
        enforceDate: '',
        enforceMeasure: '',
        caseNumberCopy: '',
        situationDescription: '',
        delayDate: '',
        signatureDate: '',
        endDate: '',
      },
      needDealData: true,
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: "2c902934699a6ef801699a7426750001", //表单类型IDer
        //表单数据
        docData: "",
        status: ""
      },
      rules: {
        party: [
          { required: true, message: '当事人不能为空', trigger: 'blur' },
        ],
        caseCauseName: [
          { required: true, message: '案由不能为空', trigger: 'blur' },
        ],
        enforceDate: [
          { required: true, message: '时间不能为空', trigger: 'blur' },
        ],
        enforceMeasure: [
          { required: true, message: '行政强制措施不能为空', trigger: 'blur' },
        ],
        caseNumber: [
          { required: true, message: '案号不能为空', trigger: 'blur' },
        ],
        situationDescription: [
          { required: true, message: '延期原因不能为空', trigger: 'blur' },
        ],
        delayDate: [
          { required: true, message: '延期日期不能为空', trigger: 'blur' },
          { validator: validateIfDate, trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'prolongAdmin-print',
      },
      propertyFeatures:'', //字段属性配置

    }
  },

   methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId, //流程里的案件id
        // caseId: '297708bcd8e80872febb61577329194f', //先写死
        docId: '2c902934699a6ef801699a7426750001'
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    // 盖章
    makeSeal() {
      console.log('盖章!');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log('回显', edit)
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
    },
    //对原始数据做一下处理
    getDataAfter(){
      this.docData.endDate = new Date(this.docData.delayDate).format("yyyy-MM-dd");
      // this.docData.delayDate = new Date(new Date(new Date(this.docData.delayDate).format("yyyy-MM-dd")).getTime()+30*24*60*60*1000);
      this.docData.delayDate = new Date(new Date(this.docData.delayDate).getTime()+30*24*60*60*1000).format('yyyy-MM-dd');

    },
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
