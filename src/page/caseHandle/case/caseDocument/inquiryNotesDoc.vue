<template>
  <div class="main">
    <div class="a4-box" id="subOutputRank-print">
      <div class="pdf-box">
        <div class="pdf-title">询问笔录</div>
        <div class="case-number">案号：{{docData.caseNumber}}</div>
        <div class="pdf-report-info">
          <p>
            时间：
            <span class="pdf-line width250">
              <el-date-picker
                v-model="docData.inquiryStartTime"
                type="date"
                format="yyyy 年 M 月 d 日 HH 时 mm 分"
                placeholder="  年  月  日 时 分"
                clear-icon="el-icon-circle-close"
              ></el-date-picker>
            </span>
            至
            <span class="pdf-line width150">
              <el-date-picker
                v-model="docData.inquiryEndTime"
                type="date"
                format="d 日 HH 时 mm 分"
                placeholder=" 日 时 分"
                clear-icon="el-icon-circle-close"
              ></el-date-picker>
            </span>
            第
            <el-input class="pdf-line width80" v-model="docData.inquiryIndex">&nbsp;</el-input>询问
          </p>
          <p>
            地点：
            <el-input class="pdf-line width635" v-model="docData.inquiryAddress">&nbsp;</el-input>
          </p>
          <p>
            询问人：
            <el-input class="pdf-line width272" v-model="docData.inquiryStaff">&nbsp;</el-input>记录人：
            <el-input class="pdf-line width272" v-model="docData.recordStaff">&nbsp;</el-input>
          </p>
          <p>
            被询问人：
            <el-input class="pdf-line width250" v-model="docData.inquiried">&nbsp;</el-input>与案件关系：
            <el-input class="pdf-line width224" v-model="docData.inquiriedRelation">&nbsp;</el-input>
          </p>
          <p>
            性别：
            <el-select class="pdf-line width94" v-model="docData.inquiriedSex">
              &nbsp;
              <el-option value="0" label="男"></el-option>
              <el-option value="1" label="女"></el-option>
            </el-select>年龄：
            <el-input class="pdf-line width100" v-model="docData.inquiriedAge">&nbsp;</el-input>
          </p>
          <p>
            身份证件号：
            <el-input class="pdf-line width240" v-model="docData.inquiriedIdNo">&nbsp;</el-input>联系电话：
            <el-input class="pdf-line width240" v-model="docData.inquiriedTel">&nbsp;</el-input>
          </p>
          <p>
            工作单位及职务：
            <el-input class="pdf-line width555" v-model="docData.inquiriedUnitPosition">&nbsp;</el-input>
          </p>
          <p>
            联系地址：
            <el-input class="pdf-line width603" v-model="docData.inquestAddress">&nbsp;</el-input>
          </p>
          <p>
            我们是
            <span class="pdf-line width150">
              <el-input v-model="docData.inputInfo" placeholder="请输入内容"></el-input>
            </span>的执法人员
            <span class="pdf-line width150">
              <el-input v-model="docData.inputInfo" placeholder="请输入内容"></el-input>
            </span>、
            <span class="pdf-line width150">
              <el-input v-model="docData.inputInfo" placeholder="请输入内容"></el-input>
            </span>，这是我们的执法证件，执法证号分别是
            <span class="pdf-line width150">
              <el-input v-model="docData.inputInfo" placeholder="请输入内容"></el-input>
            </span>、
            <span class="pdf-line width150">
              <el-input v-model="docData.inputInfo" placeholder="请输入内容"></el-input>
            </span>，请你确认。现依法想你询问，请如实回答所问问题。执法人员与你有直接利害关系的，你可以申请回避。
          </p>

          <p>
            问：
            <el-input class="pdf-line width603" v-model="docData.inquestAddress">&nbsp;</el-input>
          </p>
          <p>
            答：
            <el-input class="pdf-line width603" v-model="docData.inquestAddress">&nbsp;</el-input>
          </p>

          <br />
          <br />
          <p>
            被询问人签名：
            <span class="pdf-line width250">
              <el-input v-model="docData.invitedSign" placeholder="请输入内容"></el-input>
            </span>
            询问人签名：
            <span class="pdf-line width210" align="right">
              <el-input v-model="docData.recorderSign" placeholder="请输入内容"></el-input>
            </span>
          </p>
          <p></p>
        </div>
      </div>
    </div>
    <!-- 悬浮按钮 -->
    <div class="float-btns">
      <el-button type="success" @click="printContent">
        <svg
          t="1577706357599"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2136"
          width="16"
          height="16"
        >
          <path
            d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z"
            p-id="2137"
            fill="#FFFFFF"
          />
        </svg>
        <br />打印
      </el-button>
      <el-button type="success">
        <svg
          t="1577706400265"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3033"
          width="16"
          height="16"
        >
          <path
            d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z"
            p-id="3034"
            fill="#FFFFFF"
          />
        </svg>
        <br />编辑
      </el-button>
      <el-button type="success" @click="makeSeal">
        <svg
          t="1577706320726"
          class="icon"
          viewBox="0 0 1052 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1274"
          width="16"
          height="16"
        >
          <path
            d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z"
            fill="#FFFFFF"
            p-id="1275"
          />
        </svg>
        <br />签章
      </el-button>
      <el-button type="primary" @click="addDocData(1)">
        <svg
          t="1577414377979"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1726"
          width="16"
          height="16"
        >
          <path
            d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
            p-id="1727"
            fill="#FFFFFF"
          />
        </svg>
        <br />提交
      </el-button>
    </div>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      docData: {
        caseNumber: "",
        caseName: "",
        inquestStartTime: "",
        inquestEndTime: "",
        inquestAddress: "",
        weather: "",
        staff1: "",
        staffUnitAndPosition1: "",
        certificateId1: "",
        staff2: "",
        staffUnitAndPosition2: "",
        certificateId2: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyIdNo: "",
        partyUnitAndPosition: "",
        partyAddress: "",
        partyTel: "",
        invited: "",
        invitedUnitAndPosition: "",
        recorder: "",
        recorderUnitAndPosition: "",
        inquestResult: "",
        partySign: "",
        inquestedSign: "",
        invitedSign: "",
        recorderSign: "",
        overWidthFlag: false,
        inquestResult: "" //多行编辑内容
      },
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件id
        caseDoctypeId: "", //文书模版ID
        docData: "",
        status: ""
      }
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  components: {
    overflowInput
  },

  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      this.caseDocDataForm.caseDoctypeId = this.$route.params.docId;

      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
    },
    checkHeights() {
      console.log("this.inputInfos");
      if (this.inputInfos.length > 10) {
        this.overWidthFlag = true;
      } else this.overWidthFlag = false;
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "");
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.inquestResult = edit;
    },
    // 盖章
    makeSeal() {
      console.log("盖章");
    },
    //   打印方法
    printContent(e) {
      let subOutputRankPrint = document.getElementById("subOutputRank-print");
      console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pdf.scss";
</style>
