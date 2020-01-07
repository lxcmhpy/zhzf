<template>
  <!-- <div class="searchAndpageBox" id="waitDealBox">
    <div>我是案件总览</div>
    <el-button @click="continueHandle">继续办理</el-button>
    <nextLinkDialog ref="nextLinkDialogRef" @myChooseNext="getMyChooseNext"></nextLinkDialog>
  </div> -->

  <div class="box">
    <el-form ref="docForm"  :model="formData" label-width="115px">

      <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">
            返回
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            案件总览
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="caseStatus" label="案件状态">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseStatus" size="small" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="acceptTime" label="受案时间">
                  <el-date-picker v-model="formData.acceptTime" type="date" placeholder="选择日期" size="small">
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyType" label="案由">
                  <el-input ref="partyType" clearable class="w-120" v-model="formData.partyType" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="partyType" label="当事人">
                  <el-input ref="partyType" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="partyType" label="车/船信息">
                  <el-input ref="partyType" clearable class="w-120" v-model="formData.partyType" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="案发地点">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="基本情况">
                  <el-input type="textarea" class="height106" v-model="formData.caseCauseDescrib" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执法人员">
                  <el-input ref="party" clearable class="w-120" v-model="formData.staff" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="当前环节">
                  <el-input ref="party" clearable class="w-120" v-model="formData.currentLinkName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚类型">
                  <el-select v-model="formData.party" placeholder="请选择">
                    <el-option label="行政处罚" value="shanghai"></el-option>
                    <el-option label="处罚类型二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入">
                       <span slot="prefix" >￥</span>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="执行情况">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="结案时间">
                  <el-date-picker v-model="formData.acceptTime" type="date" placeholder="选择日期" size="small">
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle">
            <svg t="1577959944457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1969" width="24" height="24">
              <path d="M920.2 831.8H103.8c-22.1 0-40 17.9-40 40s17.9 40 40 40h816.5c22.1 0 40-17.9 40-40s-18-40-40.1-40zM788.1 340.2c15.7-16.1 23.9-37.9 23-61.4-1-28.1-14.7-56.1-37.7-76.7L703.9 140c-17.8-15.9-40.1-25.7-62.8-27.5-25.7-2-49.9 6.6-66.5 23.6L135.7 587l-34.4 243.2 252.4-43.7 434.4-446.3zM631.4 192.4c2.7-0.8 11.3 0.1 19.1 7.1l69.5 62.2c7.9 7.1 11 15.1 11.1 19.8 0.1 1.8-0.3 2.7-0.4 2.9l-57.3 58.9-101-90.3 59-60.6zM195.8 732.6l15.4-108.5 305.4-313.7 101 90.3-303.1 311.4-118.7 20.5z" p-id="1970" fill="#FFFFFF"></path>
            </svg>
            <br>
            继续<br>办理
          </el-button>
        </div>
      </div>
    </el-form>
     <nextLinkDialog ref="nextLinkDialogRef" @myChooseNext="getMyChooseNext"></nextLinkDialog>
  </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";
import nextLinkDialog from "../components/nextLinkDialog";

export default {
  data() {
    return {
      caseInfo: this.$route.params.caseInfo,
      nextLink:[],
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
        investigProcess: "",
        caseCauseDescrib: "",
        isMajorCase: "1",
        punishType: ['警告'],
        investigResult: '',
        dealOpinions: '1212121',
      },
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    nextLinkDialog
  },
  methods: {
    //继续办理  跳转流程图   但是还没加流程图 
    continueHandle() {
      this.$store.dispatch('deleteTabs', 'caseInfo');
      this.$router.push({
          name: "flowChart"
      })
      // this.com_whatIsNext(this.caseInfo.id);
    },
    //获取弹窗中选中的环节id
    getMyChooseNext(targetLink){
        console.log(targetLink);
        let nextLink = this.com_getCaseRouteName(targetLink);
        console.log(nextLink);
        this.$router.push({name:nextLink,params:{id:this.caseInfo.id}})
    }
  },
  mounted(){
    this.formData = this.caseInfo;
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import "../../../css/documentForm.less";
</style>