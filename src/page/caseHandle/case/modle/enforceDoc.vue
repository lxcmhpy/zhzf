<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="enforceDoc-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">中止（终结、恢复）行政强制执行通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
              <el-input v-model="docData.party" :maxLength='maxLength' placeholder="/" :disabled="fieldDisabled(propertyFeatures['party'])"></el-input>
            </el-form-item>
          </span>：
        </p>

        <p>
          <span>
            <el-form-item prop="caseName" class="width120" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input type="textarea" v-model="docData.caseName" :maxLength='maxLength'
              v-bind:class="{ over_flow:docData.caseName && docData.caseName.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              placeholder="/" :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>一案，本机关于
          <span>
            <el-form-item prop="decisionTime" class="pdf_datapick" :rules="fieldRules('decisionTime',propertyFeatures['decisionTime'])">
              <el-date-picker  :disabled="fieldDisabled(propertyFeatures['decisionTime'])"
              v-model="docData.decisionTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>依法作出了行政强制执行决定，并向你（单位）送达了《行政强制执行决定书》(案号：
          <span>
            <el-form-item prop="caseNumberCopy" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
              <el-input v-model="docData.caseNumberCopy" :maxLength='maxLength' placeholder="/" :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])"></el-input>
            </el-form-item>
          </span>)。
        </p>

        <p>
          <input type="checkbox" name="measure" value="1" v-model="docData.checknames" @change="click">1.现因
          <span>
            <el-form-item :prop="disabledOne ? 'placeholder':'stopReason'" class="width120">
              <el-input type="textarea" v-model="docData.stopReason"
              v-bind:class="{ over_flow:docData.stopReason.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              v-bind:disabled="disabledOne" :maxLength='maxLength' placeholder="/"></el-input>
            </el-form-item>
          </span>，根据《中华人民共和国行政强制法》第三十九条第一款的规定，本机关决定自
          <span>
            <el-form-item :prop="disabledOne ? 'placeholder':'executeTime'" class="pdf_datapick">
              <el-date-picker v-model="docData.executeTime" v-bind:disabled="disabledOne" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>起中止该行政强制执行。中止执行的情形消失后，本机关将恢复执行。
        </p>

        <p>
          <input type="checkbox" name="measure" value="2" v-model="docData.checknames" @change="click">2.现因
          <span>
            <el-form-item :prop="disabledTwo ? 'placeholder':'endReason'" class="width120">
              <el-input type="textarea" v-model="docData.endReason" v-bind:disabled="disabledTwo"
              v-bind:class="{ over_flow:docData.endReason.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              :maxLength='maxLength' placeholder="/"></el-input>
            </el-form-item>
          </span>，根据《中华人民共和国行政强制法》第四十条的规定，本机关决定终结执行。
        </p>
        <p>
          <input type="checkbox" name="measure" value="3" v-model="docData.checknames" @change="click">3.你(单位)
          <span>
            <el-form-item :prop="disabledThree?'placeholder':'caseNameCopy'" class="width120">
              <el-input  type="textarea" v-model="docData.caseNameCopy"
              v-bind:class="{ over_flow:docData.caseNameCopy.length>14?true:false }"
              :autosize="{ minRows: 1, maxRows: 3}"
              v-bind:disabled="disabledThree" :maxLength='maxLength' placeholder="/"></el-input>
            </el-form-item>
          </span>一案，本机关于
          <span>
            <el-form-item :prop="disabledThree?'placeholder':'serviceTime'" class="pdf_datapick">
              <el-date-picker v-model="docData.serviceTime"
              v-bind:disabled="disabledThree" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>决定中止执行，现中止执行的情形已消失，根据《中华人民共和国行政强制法》第三十九第二款的规定，决定从即日恢复强制执行。
        </p>
        <p>
          <input type="checkbox" name="measure" value="4" v-model="docData.checknames" @change="click">4.本机关于
          <span>
            <el-form-item :prop="disabledFour?'placeholder':'agreeTime'" class="pdf_datapick">
              <el-date-picker v-model="docData.agreeTime" v-bind:disabled="disabledFour" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>与你（单位）达成执行协议，因你（单位）不履行执行协议，根据《中华人民共和国行政强制法》第四十二条第二款的规定，决定从即日恢复强制执行。
        </p>
        <p>
          特此通知。
        </p>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'enforceDoc-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage"
export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId','currentFileData']) },
  data() {
    return {
      docData: {
        caseNumber: '',
        party: '',
        partyName: '',
        caseName: '',
        caseNameCopy: '',
        decisionTime: '',
        caseNumberCopy: '',
        stopReason: '',
        executeTime: '',
        endReason: '',
        serviceTime: '',
        agreeTime: '',
        makeDate: '',
        checknames:[]
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "", //提交状态
        //多份文书的docDataId
        docDataId:"",
        linkTypeId:this.$route.params.caseLinkTypeId
      },
      name: '',
      inputInfo: '',
      inputInfos: '',
      illegalFactsEvidence: '',
      value1: '',
      rules: {
        decisionTime: [
          { required: true, message: '请输入决定时间', trigger: 'blur' },
        ],
        stopReason: [
          { required: true, message: '请输入中止理由', trigger: 'blur' },
        ],
        executeTime: [
          { required: true, message: '请输入中止时间', trigger: 'blur' },
        ],
        endReason: [
          { required: true, message: '请输入终结原因', trigger: 'blur' },
        ],
        caseNameCopy: [
          { required: true, message: '请输入恢复执行原因', trigger: 'blur' },
        ],
        serviceTime: [
          { required: true, message: '请输入恢复执行时间', trigger: 'blur' },
        ],
        agreeTime: [
          { required: true, message: '请输入恢复执行时间', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'enforceDoc-print',
      },
      checknames: [],
      disabledOne: true,
      disabledTwo: true,
      disabledThree: true,
      disabledFour: true,
      propertyFeatures:'',
      a:{try:['1','2']},
      needClick:true
    }
  },

   methods: {

    //根据案件ID和文书Id获取数据
    //  getDocDataByCaseIdAndDocId() {
    //    this.caseDocDataForm.caseBasicinfoId = this.caseId;
    //    let data = {
    //      caseId: this.caseId,
    //      docId: this.$route.params.docId
    //    };
    //    this.com_getDocDataByCaseIdAndDocId(data)
    //  },

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
      this.$refs.overflowInputRef.showModal(0, '',this.maxLengthOverLine);
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
      this.docData.checknames=this.docData.checknames
      console.log('docData提交',this.docData)

      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    click(){
      this.clearData();
      this.dealCheck();
    },
    dealCheck(){
      if(this.docData.checknames.length > 1){
        this.docData.checknames.shift();
      }
      if(this.docData.checknames[0] == '1'){
        this.disabledOne = false;
        this.disabledTwo = true;
        this.disabledThree = true;
        this.disabledFour = true;
      }else if(this.docData.checknames[0] == '2'){
        this.disabledOne = true;
        this.disabledTwo = false;
        this.disabledThree = true;
        this.disabledFour = true;
      }else if(this.docData.checknames[0] == '3'){
        this.disabledOne = true;
        this.disabledTwo = true;
        this.disabledThree = false;
        this.disabledFour = true;
        this.docData.caseNameCopy = this.docData.caseName;
      }else if(this.docData.checknames[0] == '4'){
        this.disabledOne = true;
        this.disabledTwo = true;
        this.disabledThree = true;
        this.disabledFour = false;
      }else{
        this.disabledOne = true;
        this.disabledTwo = true;
        this.disabledThree = true;
        this.disabledFour = true;
      }
    },
    clearData() {
      this.docData.stopReason = '';
      this.docData.caseNameCopy = '';
      this.docData.executeTime = '';
      this.docData.endReason = '';
      this.docData.serviceTime = '';
      this.docData.agreeTime = ''; 
    },
    getDataAfter(){
      this.docData.checknames = this.docData.checknames;
      console.log('this.docData.checknames',this.docData.checknames)
    },
    initData(){
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      //有多份文书时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      let addMoreData = JSON.parse(this.$route.params.addMoreData);
      if (addMoreData.handelType == 'isAddMore' && !iLocalStroage.get("currentDocDataId")) {
        console.log('多份文书', this.$route.params.handelType)
        this.com_getCaseBasicInfo(data.caseId, data.docId);
        if (addMoreData.approvalForm.executeHandle == 0) {
          // 拒绝
          this.docData.checknames.push("1")
          this.caseDocDataForm.note = "中止行政强制执行通知书";
        }else if(addMoreData.approvalForm.executeHandle == 1){
          this.docData.checknames.push("2")
          this.caseDocDataForm.note = "终结行政强制执行通知书";
        }else if(addMoreData.approvalForm.executeHandle == 2){
          this.docData.checknames.push("3")
          this.caseDocDataForm.note = "恢复行政强制执行通知书";
        }else if(addMoreData.approvalForm.executeHandle == 3){
          this.docData.checknames.push("4")
          this.caseDocDataForm.note = "恢复行政强制执行通知书";
        }
      } else {
        // this.getDocDetailById(this.$route.params.docDataId)
        let currentDocDataId = iLocalStroage.get("currentDocDataId")||this.currentFileData.docDataId;
        if(currentDocDataId){
          this.getDocDetailById(currentDocDataId)
        }else{
          this.getDocDetailById(this.$route.params.docDataId)
        }
      }
      this.dealCheck();
    }
  },
  mounted() {
    this.initData()
  },
  created() {
    this.isOverStatus();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
