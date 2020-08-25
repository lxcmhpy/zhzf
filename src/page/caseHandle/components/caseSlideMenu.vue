<template>
  <div class="right_side_box">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" background-color="#545c64" active-background-color="#F3F9F9" text-color="#9EA7B6" active-text-color="#4573D0" :collapse="true">
      <el-menu-item index="caseInfo" v-show="!IsLawEnforcementSupervision" :disabled = "disabledCaseInfo" @click="goTo('case_handle_caseInfo')">
        案件<br>总览
      </el-menu-item>
      <el-menu-item index="inforCollect" v-show="!IsLawEnforcementSupervision && !noOperation"  @click="goToInfoPage">
        基本<br>信息
      </el-menu-item>
      <el-menu-item index="flowChart" v-show="!noOperation" :disabled = "disabledFlow" @click="goTo('case_handle_flowChart')">
        案件<br>流程
      </el-menu-item>
      <el-menu-item index="handleRecordForm" v-show="!noOperation" @click="goTo('case_handle_handleRecordForm')">
        操作<br>记录
      </el-menu-item>
      <el-menu-item index="documentForm" :disabled = "disabledBeforeEstablish" v-show="!IsLawEnforcementSupervision || lawEnforcementSupervisionType =='archivesCaseSupervision'">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('documentForm')" @click="goTo('case_handle_documentForm')">文书<br>列表</div>
        <div v-else>文书<br>列表</div>
      </el-menu-item>
      <el-menu-item index="documentForm" :disabled = "disabledBeforeEstablish" v-show="IsLawEnforcementSupervision && lawEnforcementSupervisionType!=='archivesCaseSupervision'">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('documentForm_supervision')" @click="mouseenterShowEmit('documentForm_supervision')">文书<br>列表</div>
        <div v-else>文书<br>列表</div>
      </el-menu-item>
      <el-menu-item index="deliverReceiptForm" :disabled = "disabledBeforeEstablish" v-show="!IsLawEnforcementSupervision || lawEnforcementSupervisionType =='archivesCaseSupervision'">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('deliverReceiptForm')" @click="goTo('case_handle_deliverReceiptForm')">送达<br>回证</div>
        <div v-else>送达<br>回证</div>
      </el-menu-item>
      <el-menu-item index="deliverReceiptForm" :disabled = "disabledBeforeEstablish" v-show="IsLawEnforcementSupervision && lawEnforcementSupervisionType!=='archivesCaseSupervision'">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('deliverReceiptForm_supervision')" @click="mouseenterShowEmit('deliverReceiptForm_supervision')">送达<br>回证</div>
        <div v-else>送达<br>回证</div>
      </el-menu-item>

      <el-menu-item index="evidenceForm" >
        <div @mouseenter="mouseenterShowEmit('evidenceForm')" @click="goTo('case_handle_evidenceForm')">证据<br>目录</div>
      </el-menu-item>
      <el-menu-item index="archiveCatalogue" :disabled = "disabledArchiveCatalogue" v-show="!IsLawEnforcementSupervision && !noOperation">
        <div v-if="!disabledArchiveCatalogue" @mouseenter="mouseenterShowEmit('archiveCatalogue')"  @click="goTo('case_handle_archiveCatalogueDetail')">卷宗<br>目录</div>
        <div v-else>卷宗<br>目录</div>
       </el-menu-item>
      <el-menu-item index="lawEnforcementSupervision_supervisionRecord" v-show="IsLawEnforcementSupervision && lawEnforcementSupervisionType!=='archivesCaseSupervision'" @click="goTo('lawEnforcementSupervision_supervisionRecord')">
        督办<br>记录
      </el-menu-item>
      <el-menu-item index="lawEnforcementSupervision_caseFileList" v-show="lawEnforcementSupervisionType =='majorCaseSupervision'" @click="goTo('lawEnforcementSupervision_caseFileList')">
        重大案件<br>报送材料
      </el-menu-item>
      <el-menu-item index="lawEnforcementSupervision_caseFileList" v-show="lawEnforcementSupervisionType =='adminCaseSupervision'" @click="goTo('lawEnforcementSupervision_caseFileList')">
        行政复议<br>备案材料
      </el-menu-item>
      <el-menu-item index="lawEnforcementSupervision_archivesReviewResult" v-show="lawEnforcementSupervisionType =='archivesCaseSupervision'" @click="goTo('lawEnforcementSupervision_caseFileList')">
        评查<br>打分
      </el-menu-item>
      <!-- <el-menu-item index="10" class="top" @click="scrollToTop">
        置顶
      </el-menu-item> -->
    </el-menu>



    <!-- <div class="btn_box bottom_fixed">
      <i class="el-icon-arrow-up"></i>
    </div> -->

      <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef"></archiveCatalogue>
    <!-- 证据目录 -->
    <evidenceCatalogue ref="evidenceCatalogueRef" @getEvidenceEmit="getEvidence"></evidenceCatalogue>
    <!-- 文书列表 -->
    <documentFormRef ref="documentFormRef"></documentFormRef>
     <!-- 送达回证列表 -->
    <deliverReceiptFormRef ref="deliverReceiptFormRef"></deliverReceiptFormRef>
    <!--执法监督 文书列表 -->
    <documentFormSupervision ref="documentFormSupervisionRef"></documentFormSupervision>
    <!--执法监督 送达回证 -->
    <deliverReceiptFormSupervision ref="deliverReceiptFormSupervisionRef"></deliverReceiptFormSupervision>
  </div>

</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import archiveCatalogue from "@/page/caseHandle/waitArchive/archiveCatalogue";
import evidenceCatalogue from "@/page/caseHandle/case/form/evidenceCatalogue";
import documentFormRef from "@/page/caseHandle/case/form/documentFormRef";
import deliverReceiptFormRef from "@/page/caseHandle/case/form/deliverReceiptFormRef";
import {
  queryFlowBycaseIdApi,
} from "@/api/caseHandle";
import documentFormSupervision from "@/page/lawEnforcementSupervision/components/documentFormSupervision";
import deliverReceiptFormSupervision from "@/page/lawEnforcementSupervision/components/deliverReceiptFormSupervision";
export default {
  data(){
    return{
      disabledArchiveCatalogue:true,
      disabledCaseInfo:true,
      disabledBeforeEstablish:true,
      disabledFlow:true,
      infoPage: "",
    }
  },
  props:['activeIndex'],
  computed: { ...mapGetters(["caseApproval",'caseId','caseHandle','IsLawEnforcementSupervision','lawEnforcementSupervisionType', 'noOperation']) },
  components: {
    archiveCatalogue,
    evidenceCatalogue,
    documentFormRef,
    deliverReceiptFormRef,
    documentFormSupervision,
    deliverReceiptFormSupervision,
  },
  methods: {
    goToInfoPage(){
      console.log("shuju1111111",this.infoPage)
      this.goTo(this.infoPage);
    },
    goTo(name){
      console.log('name',name)
      // if(this.caseApproval ) { 
      //   this.$message('暂不支持审批人员查看');
      // }else{
       
      //   this.$router.push({
      //       name: name,
      //       params:{
      //         tabTitle:this.caseHandle.caseNumber,
      //         fromSlide: true
      //       }
      //   })
      // }
      this.$router.push({
            name: name,
            params:{
              tabTitle:this.caseHandle.caseNumber,
              fromSlide: true
            }
      })
    },
    scrollToTop() {
        let scrollId = this.$route.meta.scrollId;
        $("#" + scrollId + "").find(".el-scrollbar__wrap").animate({ scrollTop: 0 }, "slow");
    },
    //鼠标移入显示
    mouseenterShowEmit(type){
      console.log('hover')
      this.closeOtherDia();
      if(type == 'archiveCatalogue'){
        //  this.$emit('showArchiveCatalogue');
        this.$refs.archiveCatalogueRef.showModal(false);
      }
      if(type == 'documentForm'){
        this.$refs.documentFormRef.showModal();
      }
      if(type == 'deliverReceiptForm'){
        this.$refs.deliverReceiptFormRef.showModal();
      }
      if(type == 'evidenceForm'){
        this.$refs.evidenceCatalogueRef.showModal();
      }
      //执法监督文书列表
      if(type == 'documentForm_supervision'){
        this.$refs.documentFormSupervisionRef.showModal();
      }
      //执法监督送达回证
      if(type == 'deliverReceiptForm_supervision'){
        this.$refs.deliverReceiptFormSupervisionRef.showModal();
      }

    },
    //关掉其他目录弹窗
    closeOtherDia(){
        this.$refs.archiveCatalogueRef.closeDialog();
        this.$refs.evidenceCatalogueRef.closeDialog();
        this.$refs.documentFormRef.closeDialog();
        this.$refs.deliverReceiptFormRef.closeDialog();
        this.$refs.documentFormSupervisionRef.closeDialog();
        this.$refs.deliverReceiptFormSupervisionRef.closeDialog();
    },
    getEvidence(){
      this.$emit("getEvidenceEmit");
    },
    //判断快捷菜单是否可用
    getCaseData(){
      if(this.caseId){
        let data = {
            id: this.caseId
        };
        this.$store.dispatch("getCaseBasicInfo", data).then(
            res => {
              console.log('快捷菜单获取案件信息', res);
              this.menuCanUse(res.data)
            },
            err => {
              console.log(err);
            }
        );
      }
      
    },
    menuCanUse(data){
      //案件状态（办理中，待归档）
      //控制卷宗目录 (归档页面可用)
      this.disabledArchiveCatalogue = data.caseStatus !== "待归档" ;
      //控制案件总览 （提交完立案审批之后可用）方法: 当前环节为立案登记且caseStatus不等于待审批
      //立案登记数组
      let establish_caseLinktypeIdArr = [this.BASIC_DATA_SYS.establish_caseLinktypeId,this.BASIC_DATA_JX.establish_JX_caseLinktypeId];
      if(data.caseStatus == "未立案"){
          this.disabledCaseInfo = true;
      }else{ 
          console.log(this.hasDataInOtherArr(establish_caseLinktypeIdArr,data.doingLink.split(',')));
          if(this.hasDataInOtherArr(establish_caseLinktypeIdArr,data.doingLink.split(','))){
             this.disabledCaseInfo = false;
          }else{
            // if(data.completeLink.includes(this.BASIC_DATA_SYS.establish_caseLinktypeId)){ //已完成
            console.log(this.hasDataInOtherArr(establish_caseLinktypeIdArr,data.completeLink.split(',')));
            if(this.hasDataInOtherArr(establish_caseLinktypeIdArr,data.completeLink.split(','))){
              this.disabledCaseInfo = false;
            }else{
              this.disabledCaseInfo = true;
            }
          } 
      }
     
      //文书列表、送达回证（两级立案审批通过后可用）方法：判断已完成有没有立案
      this.disabledBeforeEstablish = !this.hasDataInOtherArr(establish_caseLinktypeIdArr,data.completeLink.split(','));
      //控制案件流程 （信息采集保存后可用 方法：状态是不是1
      this.disabledFlow = !data.state
      console.log('控制案件总览', this.disabledCaseInfo)
    },
    //根据案件类型判断进入哪个信息采集页
    findInforCollectPageName(){
      queryFlowBycaseIdApi(this.caseId).then(res=>{
          this.infoPage = res.data.basicInfoPage;
      }).catch(err=>{console.log(err)})
    },
    //判断一个数组中的值是否在另一个数组中
    hasDataInOtherArr(arr1,arr2){
      let hasVal = false;
      arr1.forEach(item1 => {
        if(arr2.includes(item1)){ hasVal = true; return;}
      });
      console.log('hasVal',hasVal)
      return hasVal;
    }

  },
  mounted(){
    //判断快捷菜单是否可用
    this.getCaseData();
    this.findInforCollectPageName();
  }
}
</script>
<style lang="scss"  src="@/assets/css/documentForm.scss" >
/* @import "@/assets/css/documentForm.scss"; */
</style>
