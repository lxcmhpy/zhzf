<template>
  <div class="box" id="caseInfoBox">
    <el-form ref="docForm" :model="formData" label-width="115px">
      <div class="content_box" style="-webkit-box-shadow:none;box-shadow:none">
        <div class="content">
          <div class="content_title">案件总览</div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseNumber"
                  label="案号"
                >{{formData.caseNumber ? formData.caseNumber : formData.tempNo}}</el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="caseStatus" label="案件状态">{{formData.caseStatus}}</el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="acceptTime" label="受案时间">{{formData.acceptTime}}</el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyType" label="案由">{{formData.caseName}}</el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="partyType"
                  label="当事人"
                >{{formData.party ? formData.party : formData.partyName}}</el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyType" label="车/船信息">{{formData.vehicleShipId}}</el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="案发地点">
                  <!-- 字段名 -->
                  {{formData.afdd}}
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="基本情况" class="over-line">{{formData.caseInfo}}</el-form-item>
              </div>
            </div>
          </div>

          <div class="border_blue"></div>
          <div class="content_form">
            <!-- 罚款类型案件 -->

              <div class="row">
                <div class="col">
                  <el-form-item label="执法人员">{{formData.staff}}</el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="当前环节">{{formData.currentLinkName}}</el-form-item>
                </div>
              </div>
              <div class="row" v-if="caseFlowData.flowUrl != 'compensationGraphData' && caseFlowData.flowUrl != 'compensationGraphData_QH'">
                <div class="col">
                  <el-form-item label="处罚类型">{{formData.punishType}}</el-form-item>
                </div>
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="赔偿金额" v-if="caseFlowData.flowUrl == 'compensationGraphData' || caseFlowData.flowUrl == 'compensationGraphData_QH'">￥{{formData.tempPunishAmount||formData.payTotal}}</el-form-item>
                  <el-form-item label="处罚金额" v-else>￥{{formData.tempPunishAmount}}</el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="执行情况">{{formData.executeInfo}}</el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <el-form-item label="结案时间">{{formData.closeDate}}</el-form-item>
                </div>
              </div>

            <!-- 赔补偿类型案件 -->
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!caseApproval">
            <svg
              t="1577959944457"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1969"
              width="24"
              height="24"
            >
              <path
                d="M920.2 831.8H103.8c-22.1 0-40 17.9-40 40s17.9 40 40 40h816.5c22.1 0 40-17.9 40-40s-18-40-40.1-40zM788.1 340.2c15.7-16.1 23.9-37.9 23-61.4-1-28.1-14.7-56.1-37.7-76.7L703.9 140c-17.8-15.9-40.1-25.7-62.8-27.5-25.7-2-49.9 6.6-66.5 23.6L135.7 587l-34.4 243.2 252.4-43.7 434.4-446.3zM631.4 192.4c2.7-0.8 11.3 0.1 19.1 7.1l69.5 62.2c7.9 7.1 11 15.1 11.1 19.8 0.1 1.8-0.3 2.7-0.4 2.9l-57.3 58.9-101-90.3 59-60.6zM195.8 732.6l15.4-108.5 305.4-313.7 101 90.3-303.1 311.4-118.7 20.5z"
                p-id="1970"
                fill="#FFFFFF"
              />
            </svg>
            <br />继续
            <br />办理
          </el-button>
          <!-- <el-button type="primary" @click="approvalCase" v-if="caseApproval">
            <svg t="1577959944457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1969" width="24" height="24">
              <path d="M920.2 831.8H103.8c-22.1 0-40 17.9-40 40s17.9 40 40 40h816.5c22.1 0 40-17.9 40-40s-18-40-40.1-40zM788.1 340.2c15.7-16.1 23.9-37.9 23-61.4-1-28.1-14.7-56.1-37.7-76.7L703.9 140c-17.8-15.9-40.1-25.7-62.8-27.5-25.7-2-49.9 6.6-66.5 23.6L135.7 587l-34.4 243.2 252.4-43.7 434.4-446.3zM631.4 192.4c2.7-0.8 11.3 0.1 19.1 7.1l69.5 62.2c7.9 7.1 11 15.1 11.1 19.8 0.1 1.8-0.3 2.7-0.4 2.9l-57.3 58.9-101-90.3 59-60.6zM195.8 732.6l15.4-108.5 305.4-313.7 101 90.3-303.1 311.4-118.7 20.5z" p-id="1970" fill="#FFFFFF"></path>
            </svg>
            <br>
            审批
          </el-button>-->
        </div>
      </div>
    </el-form>
    <!--快速入口 -->

    <caseSlideMenu :activeIndex="'caseInfo'"></caseSlideMenu>
    <!-- 置顶 -->
    <el-backtop target="#caseInfoBox"  :bottom="46" :right='0' :visibility-height='800' style="width: 58px;height: 58px;">
      <div class="back-ball">
        <svg
          t="1581647372853"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1939"
          width="18"
          height="22"
        >
          <path
            d="M862.72 147.2H161.28c-18.432 0-33.28-14.848-33.28-33.28s14.848-33.28 33.28-33.28h701.44c18.432 0 33.28 14.848 33.28 33.28s-14.848 33.28-33.28 33.28zM549.376 323.84v580.608c0 21.504-17.408 38.912-38.912 38.912-21.504 0-38.912-17.408-38.912-38.912V323.84c0-21.504 17.408-38.912 38.912-38.912 21.504 0 38.912 17.408 38.912 38.912z"
            p-id="1940"
            fill="#bfbfbf"
          />
          <path
            d="M542.72 262.144L207.872 661.248c-13.824 16.384-38.4 18.688-54.784 4.864-16.384-13.824-18.688-38.4-4.864-54.784L483.072 212.224c13.824-16.384 38.4-18.688 54.784-4.864 16.384 13.824 18.688 38.4 4.864 54.784z"
            p-id="1941"
            fill="rgb(158, 167, 182)"
          />
          <path
            d="M481.28 262.144l334.848 398.848c13.824 16.384 38.4 18.688 54.784 4.864 16.384-13.824 18.688-38.4 4.864-54.784L540.928 212.224c-13.824-16.384-38.4-18.688-54.784-4.864-16.384 13.824-18.688 38.4-4.864 54.784z"
            p-id="1942"
            fill="rgb(158, 167, 182)"
          />
        </svg>
      </div>
    </el-backtop>
  </div>
</template>
<script>
import caseSlideMenu from "../components/caseSlideMenu";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { getCaseBasicInfoApi, queryFlowBycaseIdApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      caseInfo: null,
      nextLink: [],
      formData: {
        caseStatus: "",
        caseNumber: "",
        caseName: "",
        party: "",
        partyAddress: "",
        partyTel: "",
        partyIdNo: "",
        partyAge: "",
        party: "",
        partySex: "",
        partyName: "",
        investigProcess: "",
        caseCauseDescrib: "",
        isMajorCase: "1",
        punishType: ["警告"],
        investigResult: "",
        dealOpinions: "1212121",
        tempPunishAmount: ""
      }
      // approval: this.$route.params.isApproval ? true : false,
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "caseApproval"]) },
  components: {
    caseSlideMenu
  },
  methods: {
    //继续办理  跳转流程图
    continueHandle() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$store.commit("setApprovalState", "");
      this.$router.push({
        name: "case_handle_flowChart"
      });
    },
    //案件审批
    approvalCase() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      console.log(this.caseInfo);
      let approvalLink = "";
      let docId = "";
      switch (this.caseInfo.currentLinkId) {
        case this.BASIC_DATA_SYS.establish_caseLinktypeId:
          approvalLink = "case_handle_establish";
          docId = this.BASIC_DATA_SYS.establish_huanjieAndDocId;
          break;
        case this.BASIC_DATA_SYS.caseInvestig_caseLinktypeId:
          approvalLink = "case_handle_caseInvestig";
          docId = this.BASIC_DATA_SYS.caseInvestig_huanjieAndDocId;
          break;
        case this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId:
          approvalLink = "case_handle_finishCaseReport";
          docId = this.BASIC_DATA_SYS.finishCaseReport_huanjieAndDocId;
          break;
      }
      //设置案件为审批中
      this.$store.commit("setApprovalState", "approvaling");
      this.$router.push({
        name: "case_handle_myPDF",
        params: { docId: docId, isApproval: true }
      });
    },
    async init() {
      await this.queryFlowBycaseId();
      let data = { id: this.caseId };
      getCaseBasicInfoApi(data).then(
        res => {
          console.log(res);
          let caseData = res.data;
          for (var key in caseData) {
            this.formData[key] = caseData[key];
          }
        },
        err => {
          console.log(err);
        }
      );
    },

  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  created() {

  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/caseHandle/index.scss";
@import "@/assets/css/documentForm.scss";
</style>
<style scoped>
el-form {
  margin-bottom: 40px;
}
#caseInfoBox {
  width: calc(100% - 96px);
}
.btn-height63 {
  right: 9%;
}
.el-form-item {
  margin-bottom: 0px;
}
.over-line /deep/ .el-form-item__content {
  margin-top: 9px;
  margin-bottom: 8px;
  line-height: 22px;
}
</style>
