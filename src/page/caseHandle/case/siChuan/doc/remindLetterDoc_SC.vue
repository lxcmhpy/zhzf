<!--长软-->
<template>
   <div class="print_box">
    <div class="print_info" id="remindLetter_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">催告书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p>
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="party" class="width228" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
              <el-input  v-model="docData.party"  :maxLength='maxLength' :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          因你（单位）
          <span>
            <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input  v-model="docData.caseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>，本机关于
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick" style="width:140px" :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker @blur="starttime" v-model="docData.serviceTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['serviceTime'])">
              </el-date-picker>
            </el-form-item>
          </span>作出了
          <span>
            <el-form-item prop="punishContent" :rules="fieldRules('punishContent',propertyFeatures['punishContent'])">
              <el-input  v-model="docData.punishContent"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['punishContent'])"></el-input>
            </el-form-item>
          </span>的决定，决定书案号为
          <span>
            <el-form-item prop="caseNmuberCopy" :rules="fieldRules('caseNmuberCopy',propertyFeatures['caseNmuberCopy'])">
              <el-input  v-model="docData.caseNmuberCopy"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseNmuberCopy'])"></el-input>
            </el-form-item>
          </span>。你（单位）逾期未履行义务，根据《中华人民共和国行政强制法》第三十五条和第五十四条的规定，现就有关事项催告如下，请你（单位）按要求履行：
        </p>
        <p>
          1.履行标的：
          <span>
            <el-form-item prop="fulfillSub" class="width476" :rules="fieldRules('fulfillSub',propertyFeatures['fulfillSub'])">
              <el-input v-model="docData.fulfillSub"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['fulfillSub'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          2.履行期限：
          <span>
            <el-form-item prop="fulfillLimit" class="width476" :rules="fieldRules('fulfillLimit',propertyFeatures['fulfillLimit'])">
              <el-input v-model="docData.fulfillLimit"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['fulfillLimit'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          3.履行方式：
          <span>
            <el-form-item prop="fulfillWay" class="width476" :rules="fieldRules('fulfillWay',propertyFeatures['fulfillWay'])">
              <el-input v-model="docData.fulfillWay"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['fulfillWay'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          4.履行要求：
          <span>
            <el-form-item prop="fulfillDemand" class="width476" :rules="fieldRules('fulfillDemand',propertyFeatures['fulfillDemand'])">
              <el-input v-model="docData.fulfillDemand"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['fulfillDemand'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          5.其他事项：
          <span>
            <el-form-item prop="otherMatter" class="width476" :rules="fieldRules('otherMatter',propertyFeatures['otherMatter'])">
              <el-input  v-model="docData.otherMatter"  :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['otherMatter'])"></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          你（单位）逾期仍不履行的，本机关将依法采取以下措施：
        </p>
        <p>
          <input type="checkbox" name="measure" value="1" v-model="docData.checknames" @change="click">1.到期不缴纳罚款的，每日按罚款数额的百分之三加处罚款。
        </p>
        <p>
          <input type="checkbox" name="measure" value="2" v-model="docData.checknames" @change="click">2.根据法律规定，将查封、扣押的财物拍卖抵缴罚款。
        </p>
        <p>
          <input type="checkbox" name="measure" value="3" v-model="docData.checknames" @change="click">3.申请人民法院强制执行。
        </p>
        <p>
          <input type="checkbox" name="measure" value="4" v-model="docData.checknames" @change="click">4.依法代履行或者委托第三人：
          <span>
            <el-form-item :prop="wtInfoDisabled?'':'wtInfo'">
              <el-input v-model="docData.wtInfo" v-bind:disabled="wtInfoDisabled" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>代履行。
        </p>
        <p>
          <input type="checkbox"  name="measure" value="5" v-model="docData.checknames" @change="click">5.其他强制执行方式：
          <span>
            <el-form-item :prop="otherRemindWayDisabled?'':'otherRemindWay'">
              <el-input v-model="docData.otherRemindWay" v-bind:disabled="otherRemindWayDisabled" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>。
        </p>
        <p>
          你（单位）可向本机关进行陈述或申辩，本机关将依法核实。
        </p>

        <div class="pdf_seal">
          <span >交通运输执法部门(印章)</span><br>
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
    <!-- <div class="float-btns">
      <el-button type="success" @click="print">
        <svg t="1577706357599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="16" height="16">
          <path d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z" p-id="2137" fill="#FFFFFF"></path>
        </svg>
        <br>
        打印
      </el-button>
      <el-button type="success">
        <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
          <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
        </svg>
        <br>
        编辑
      </el-button>
      <el-button type="success" @click="makeSeal">
        <svg t="1577706320726" class="icon" viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1274" width="16" height="16">
          <path d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z" fill="#FFFFFF" p-id="1275"></path>
        </svg>
        <br>
        签章
      </el-button>
      <el-button type="primary" @click="addDocData(1)">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交
      </el-button>
    </div> -->
     <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'remindLetter_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

   
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId","currentFileData"]) },
  data() {
    return {
      docData: {
        caseNumber: "",
        party: "",
        partyName: "",
        caseName: "",
        illegalLaw: "",
        serviceTime: "",
        checkLaw: [],
        decidedTime: "",
        caseNumberCopy: "",
        punishContent: "",
        performNumber: "",
        fulfillSub: "",
        fulfillLimit: "",
        fulfillWay: "",
        fulfillDemand: "",
        wtInfo: "",
        otherRemindWay: "",
        makeDate: "",
        checknames: [],
        otherMatter:''
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
      decidedTime: "",
      performNumber: "",
      illegalFactsEvidence: "",
      value1: "",
      rules: {
        party: [
          { required: true, message: "请输入当事人姓名", trigger: "blur" }
        ],
        caseName: [{ required: true, message: "请输入案由", trigger: "blur" }],
        punishContent: [
          { required: true, message: "请输入处罚结果", trigger: "blur" }
        ],
        serviceTime: [
          { required: true, message: "请输入处罚时间", trigger: "blur" }
        ],
        fulfillLimit: [
          { required: true, message: "请输入履行期限", trigger: "blur" }
        ],
        fulfillSub: [
          { required: true, message: "请输入履行标的", trigger: "blur" }
        ],
        fulfillWay: [
          { required: true, message: "请输入履行方式", trigger: "blur" }
        ],
        fulfillDemand: [
          { required: true, message: "请输入履行要求", trigger: "blur" }
        ],
        decidedTime: [
          { required: true, message: "请输入代履行人", trigger: "change" }
        ],
        caseNumberCopy: [
          { required: true, message: "请输入代履行人", trigger: "blur" }
        ],
        wtInfo: [
          { required: true, message: "请输入代履行人", trigger: "blur" }
        ],
        otherRemindWay: [
          { required: true, message: "请输入其他强制执行方式", trigger: "blur" }
        ],
        otherMatter: [
          { required: true, message: "请输入其他事项", trigger: "blur" }
        ]
        
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 50,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "remindLetter_print"
      },
      lawDisabled: true,
      wtInfoDisabled: true,
      otherRemindWayDisabled: true,
      propertyFeatures: "",
      isParty: true,
      needDealData: true
    };
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
      if (Date.parse(this.docData.decidedTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.decidedTime = '';
      }
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() { 
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId, //流程里的案件id
        docId: this.$route.params.docId
      };
      // this.com_getDocDataByCaseIdAndDocId(data);
      //有多份文书时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      let addMoreData = JSON.parse(this.$route.params.addMoreData);
      if (addMoreData.handelType == 'isAddMore' && !iLocalStroage.get("currentDocDataId")) {
        console.log('多份文书', this.$route.params.handelType)
        this.com_getCaseBasicInfo(data.caseId, data.docId);
        //文书名称 
        this.caseDocDataForm.note = "催告书 (第" + addMoreData.addNum + "份)";
      } else {
        console.log("修改");
        let currentDocDataId = iLocalStroage.get("currentDocDataId")||this.currentFileData.docDataId;
        if (currentDocDataId) {
          this.getDocDetailById(currentDocDataId);
        } else {
          this.getDocDetailById(this.$route.params.docDataId);
        }
      }
    },
    //保存文书信息
    addDocData(handleType) {
      this.com_addDocData(handleType, "docForm");
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
    checkTrue() {
      this.docData.decidedTime = "";
      this.docData.performNumber = "";
      if ( this.docData.checkLaw.length > 1) {
         this.docData.checkLaw.shift();
      }
      if ( this.docData.checkLaw == "6") {
        this.lawDisabled = true;
      }else{
        this.lawDisabled = false;
        this.docData.performNumber = this.performNumber;
      }
    },
    click() {
      this.docData.wtInfo = "";
      this.docData.otherRemindWay = "";
      if ( this.docData.checknames.length > 1) {
         this.docData.checknames.shift();
      }
      if ( this.docData.checknames == "4") {
        this.wtInfoDisabled = false;
        this.otherRemindWayDisabled = true;
      } else if ( this.docData.checknames == "5") {
        this.wtInfoDisabled = true;
        this.otherRemindWayDisabled = false;
      } else {
        this.wtInfoDisabled = true;
        this.otherRemindWayDisabled = true;
      }
    },
    getDataAfter(){
      if(this.docData.decidedTime != ""){
      this.decidedTime = this.docData.decidedTime;
      }
      if(this.docData.performNumber != ""){
      this.performNumber = this.docData.performNumber;
      }
      
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>