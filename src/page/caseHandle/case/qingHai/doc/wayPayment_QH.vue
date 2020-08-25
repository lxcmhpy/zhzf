<template>
  <div class="print_box" id="btnB">
    <div class="print_info">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">公路赔（补）偿通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>
          当事人：
          <el-form-item style="width: calc(100% - 105px);" prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
            <el-input type="textarea" v-model="docData.party" :disabled="fieldDisabled(propertyFeatures['party'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人地址：
          <el-form-item style="width: calc(100% - 137px);" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])">
            <el-input type="textarea" v-model="docData.partyAddress" :disabled="fieldDisabled(propertyFeatures['partyAddress'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人
          <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
            <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>一案，经<el-form-item prop="checkParty" :rules="fieldRules('checkParty',propertyFeatures['checkParty'])">
            <el-input type="textarea" v-model="docData.checkParty" :disabled="fieldDisabled(propertyFeatures['checkParty'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>依法调查核实：
        </p>
        <p>
          当事人<el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'])">
            <el-input type="textarea" v-model="docData.partyName" :disabled="fieldDisabled(propertyFeatures['partyName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>于
          <el-form-item prop="causeName" :rules="fieldRules('causeName',propertyFeatures['causeName'])">
            <el-input type="textarea" v-model="docData.causeName" :disabled="fieldDisabled(propertyFeatures['causeName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>
        </p>
        <p>
          上述事实,由<el-form-item prop="evidence" :rules="fieldRules('evidence',propertyFeatures['evidence'])">
            <el-input type="textarea" v-model="docData.evidence" :disabled="fieldDisabled(propertyFeatures['evidence'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>予以佐证。本单位认为，当事人<el-form-item prop="illegaldecision" :rules="fieldRules('illegaldecision',propertyFeatures['illegaldecision'])">
            <el-input type="textarea" v-model="docData.illegaldecision" :disabled="fieldDisabled(propertyFeatures['illegaldecision'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>规定，本单位依法做出如下公路赔（补）偿处理决定：
        </p>
        <p>
          当事人赔（补）偿人民币：
          <el-form-item prop="fine" :rules="fieldRules('fine',propertyFeatures['fine'])">
            <el-input type="textarea" v-model="docData.fine" :disabled="fieldDisabled(propertyFeatures['fine'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人必须在收到本通知书之日起15日内到
          <el-form-item prop="bankInfo" :rules="fieldRules('bankInfo',propertyFeatures['bankInfo'])">
            <el-input type="textarea" v-model="docData.bankInfo" :disabled="fieldDisabled(propertyFeatures['bankInfo'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>，逾期不交的，本单位将申请人民法院强制执行或依法强制执行。
        </p>
        <p>
          当事人对本通知书认定的事实和赔（补）偿数额有疑义的，可在收到本通知书之日起60日内,向
          <el-form-item prop="aplayParty" :rules="fieldRules('aplayParty',propertyFeatures['aplayParty'])">
            <el-input type="textarea" v-model="docData.aplayParty" :disabled="fieldDisabled(propertyFeatures['aplayParty'])" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
          </el-form-item>申请复核或者向人民法院起诉。
        </p>
        <div class="pdf_seal" style="width:240px">
          <span @click="makeSeal">公路赔（补）偿执行单位（印章）</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" :disabled="fieldDisabled(propertyFeatures['makeDate'])" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'subOutputRank-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
import { validatePhone, validateIDNumber } from "@/common/js/validator";

export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      overFlowEditList: [{}, {}],
      isOverflow: false,
      isOverLine: false,
      docData: {
        caseNumber: '',
        party: '',
        checkParty:'',
        partyName:'',
        saveDate: '',
        caseNumberCopy: '',
        relieveDate: '',
        partyAddress: '',
        bankInfo:'',
        aplayParty:'',
        fine:'',
        illegaldecision:'',
        causeName:'',
        makeDate:'',
        evidence:'',
      },
      handleType: 0, //0  暂存     1 提交
       caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: '1d8e7525e724a2bd61cfec7f23a8fb15',     //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note:"",//文书名字 
        docDataId:"", //多份文书的id
        linkTypeId:this.$route.params.caseLinkTypeId //所属环节的id
      },
      name: '',
      rules: {
        // party: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        // saveDate: [
        //   { required: true, message: '证据保存日期不能为空', trigger: 'change' },
        // ],
        // relieveDate: [
        //   { required: true, message: '解除证据登记日期不能为空', trigger: 'change' },
        // ],
        // caseNumberCopy: [
        //   { required: true, message: '证据登记编号不能为空', trigger: 'blur' },
        // ]

      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      // lineStyleFlag: false,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'subOutputRank-print',
      },
      isPdf: '',
      propertyFeatures: '', //字段属性配置
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
    makeSeal() {

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
