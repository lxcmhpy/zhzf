<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="remindLetter_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">催告书</div>
        <div
          class="doc_number"
        >赣（{{docData.caseNumber.substring(3,7)}}）交催〔{{docData.caseNumber.substring(8,13)}}〕号</div>
        <p>
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item
              prop="party"
              class="width228"
              :rules="fieldRules('party',propertyFeatures['party'],'',isParty)"
            >
              <el-input
                v-model="docData.party"
                :maxLength="maxLength"
                :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
              ></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          因你（单位）
          <span>
            <el-form-item
              prop="caseName"
              :rules="fieldRules('caseName',propertyFeatures['caseName'])"
            >
              <el-input
                v-model="docData.caseName"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['caseName'])"
              ></el-input>
            </el-form-item>
          </span>的行为，违反了
          <span>
            <el-form-item
              prop="illegalLaw"
              :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])"
            >
              <el-input
                v-model="docData.illegalLaw"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"
              ></el-input>
            </el-form-item>
          </span>的规定，本机关于
          <span>
            <el-form-item
              prop="serviceTime"
              class="pdf_datapick"
              style="width:140px"
              :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])"
            >
              <el-date-picker
                v-model="docData.serviceTime"
                type="date"
                format="yyyy年MM月dd日"
                placeholder="    年  月  日"
                value-format="yyyy-MM-dd"
                :disabled="fieldDisabled(propertyFeatures['serviceTime'])"
              ></el-date-picker>
            </el-form-item>
          </span>对你（单位）作出了
          <span>
            <el-form-item
              prop="punishContent"
              :rules="fieldRules('punishContent',propertyFeatures['punishContent'])"
            >
              <el-input
                v-model="docData.punishContent"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['punishContent'])"
              ></el-input>
            </el-form-item>
          </span>的决定，决定书案号为
          <span>
            <el-form-item
              prop="caseNmuberCopy"
              :rules="fieldRules('caseNmuberCopy',propertyFeatures['caseNmuberCopy'])"
            >
              <el-input
                v-model="docData.caseNmuberCopy"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['caseNmuberCopy'])"
              ></el-input>
            </el-form-item>
          </span>。你（单位）逾期未履行义务，
        </p>
        <p>
          <el-checkbox v-model="docData.checkLaw1"></el-checkbox>根据《中华人民共和国行政强制法》第三十五条和第五十四条的规定，
        </p>
        <p>
          <el-checkbox v-model="docData.checkLaw2"></el-checkbox>本机关于
          <el-form-item
            prop="decidedTime"
            class="pdf_datapick"
            style="width:140px"
            :rules="fieldRules('decidedTime',propertyFeatures['decidedTime'])"
          >
            <el-date-picker
              v-model="docData.decidedTime"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
              :disabled="fieldDisabled(propertyFeatures['decidedTime'])"
            ></el-date-picker>
          </el-form-item>对你（单位）作出了《代履行决定书》，决定书编号为
          <el-form-item
            prop="caseNumberCopy1"
            class="pdf_datapick"
            style="width:140px"
            :rules="fieldRules('caseNumberCopy1',propertyFeatures['caseNumberCopy1'])"
          >
            <el-input
              v-model="docData.caseNmuberCopy1"
              :maxLength="maxLength"
              :disabled="fieldDisabled(propertyFeatures['caseNmuberCopy1'])"
            ></el-input>
          </el-form-item>，根据《中华人民共和国行政强制法》第五十一条的规定，
        </p>
        <p>现就有关事项催告如下，请你（单位）按要求履行：</p>
        <p>
          1.履行标的：
          <span>
            <el-form-item
              prop="fulfillSub"
              class="width476"
              :rules="fieldRules('fulfillSub',propertyFeatures['fulfillSub'])"
            >
              <el-input
                v-model="docData.fulfillSub"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['fulfillSub'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          2.履行期限：
          <span>
            <el-form-item
              prop="fulfillLimit"
              class="width476"
              :rules="fieldRules('fulfillLimit',propertyFeatures['fulfillLimit'])"
            >
              <el-input
                v-model="docData.fulfillLimit"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['fulfillLimit'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          3.履行方式：
          <span>
            <el-form-item
              prop="fulfillWay"
              class="width476"
              :rules="fieldRules('fulfillWay',propertyFeatures['fulfillWay'])"
            >
              <el-input
                v-model="docData.fulfillWay"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['fulfillWay'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          4.履行要求：
          <span>
            <el-form-item
              prop="fulfillDemand"
              class="width476"
              :rules="fieldRules('fulfillDemand',propertyFeatures['fulfillDemand'])"
            >
              <el-input
                v-model="docData.fulfillDemand"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['fulfillDemand'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>
          5.其他事项：
          <span>
            <el-form-item
              prop="otherMatter"
              class="width476"
              :rules="fieldRules('otherMatter',propertyFeatures['otherMatter'])"
            >
              <el-input
                v-model="docData.otherMatter"
                :maxLength="maxLength"
                :disabled="fieldDisabled(propertyFeatures['otherMatter'])"
              ></el-input>
            </el-form-item>
          </span>
        </p>
        <p>你（单位）逾期仍不履行的，本机关将依法采取以下措施：</p>
        <p>
          <input type="checkbox" name="measure" value="3" v-model="checknames" @change="click" />1.到期不缴纳罚款的，每日按罚款数额的百分之三加处罚款。
        </p>
        <p>
          <input type="checkbox" name="measure" value="4" v-model="checknames" @change="click" />2.根据法律规定，将查封、扣押的财物拍卖抵缴罚款。
        </p>
        <p>
          <input type="checkbox" name="measure" value="5" v-model="checknames" @change="click" />3.申请人民法院强制执行。
        </p>
        <p>
          <input type="checkbox" name="measure" value="6" v-model="checknames" @change="click" />4.依法代履行或者委托第三人：
          <span>
            <el-form-item :prop="wtInfoDisabled?'':'wtInfo'">
              <el-input
                v-model="docData.wtInfo"
                v-bind:disabled="wtInfoDisabled"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>代履行。
        </p>
        <p>
          <input type="checkbox" name="measure" value="7" v-model="checknames" @change="click" />5.其他强制执行方式：
          <span>
            <el-form-item :prop="otherRemindWayDisabled?'':'otherRemindWay'">
              <el-input
                v-model="docData.otherRemindWay"
                v-bind:disabled="otherRemindWayDisabled"
                :maxLength="maxLength"
              ></el-input>
            </el-form-item>
          </span>。
        </p>
        <p>你（单位）可向本机关进行陈述或申辩，本机关将依法核实。</p>

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
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'remindLetter_print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
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
  computed: { ...mapGetters(["caseId"]) },
  data() {
    return {
      docData: {
        caseNumber: "",
        party: "",
        partyName: "",
        caseName: "",
        illegalLaw: "",
        serviceTime: "",
        checkLaw1: true,
        checkLaw2: true,
        decidedTime: "",
        caseNumberCopy: "",
        punishContent: "",
        caseNmuberCopy1: "",
        fulfillSub: "",
        fulfillLimit: "",
        fulfillWay: "",
        fulfillDemand: "",
        otherMatter: "",
        wtInfo: "",
        otherRemindWay: "",
        makeDate: ""
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
      name: "",
      inputInfo: "",
      inputInfos: "",
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
        otherMatter: [
          { required: true, message: "请输入其他事项", trigger: "blur" }
        ],
        wtInfo: [
          { required: true, message: "请输入代履行人", trigger: "blur" }
        ],
        otherRemindWay: [
          { required: true, message: "请输入其他强制执行方式", trigger: "blur" }
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      maxLengthOverLine: 122,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "remindLetter_print"
      },
      checknames: [],
      wtInfoDisabled: true,
      otherRemindWayDisabled: true,
      propertyFeatures: "",
      isParty: true,
      needDealData: true
    };
  },
 methods: {
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
        this.caseDocDataForm.note = '催告书 (第'+addMoreData.addNum+'份)';
      } else {
        console.log('修改')
        // this.getDocDetailById(this.$route.params.docDataId)
        let currentDocDataId = iLocalStroage.get("currentDocDataId");
        if(currentDocDataId){
          this.getDocDetailById(currentDocDataId)
        }else{
          this.getDocDetailById(this.$route.params.docDataId)
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
      this.docData.checknames = this.checknames;
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
    click() {
      this.docData.wtInfo = "";
      this.docData.otherRemindWay = "";
      if (this.checknames.length > 1) {
        this.checknames.shift();
      }
      if (this.checknames == "6") {
        this.wtInfoDisabled = false;
        this.otherRemindWayDisabled = true;
      } else if (this.checknames == "7") {
        this.wtInfoDisabled = true;
        this.otherRemindWayDisabled = false;
      } else {
        this.wtInfoDisabled = true;
        this.otherRemindWayDisabled = true;
      }
    },
    getDataAfter() {
      this.docData.caseNmuberCopy = this.docData.caseNumber;
    }
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
