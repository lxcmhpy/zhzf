<template>
  <el-dialog
    title=""
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="850px"
    custom-class="caseInfoDia"
  >
    <!-- <caseInfo></caseInfo> -->
    <div class="box">
    <el-form ref="docForm" :model="formData" label-width="115px" >
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
              <div class="row" v-if="caseFlowData.flowName != '赔补偿流程'">
                <div class="col">
                  <el-form-item label="处罚类型">{{formData.punishType}}</el-form-item>
                </div>
                <div class="col"></div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="赔偿金额" v-if="caseFlowData.flowName == '赔补偿流程'">￥{{formData.tempPunishAmount}}</el-form-item>
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
          </div>
        </div>
      </div>
    </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
// import caseInfo from '@/page/caseHandle/waitDeal/caseInfo'
import { getCaseBasicInfoApi,queryFlowBycaseIdApi } from "@/api/caseHandle";
import { mapGetters } from "vuex";
import { mixinGetCaseApiList } from "@/common/js/mixins";

export default {
  data() {
    return {
      visible: false,
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
    };
  },
  components:{
    // caseInfo
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModel() {
      this.visible = true;
      this.getData();
    },
    async getData(){
      let data = { id: this.caseId };
      await this.queryFlowBycaseId();
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
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>
<style lang="scss">
.caseInfoDia{
  .el-dialog__header{
    background: #fff;
    padding: 20px 20px 10px;
  }
  .el-dialog__body{
    padding-top: 0px;
  }
  .box{
    position: static;
    box-shadow: none;
  }
} 
</style>