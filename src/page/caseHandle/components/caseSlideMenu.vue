<template>
  <div class="right_side_box">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" background-color="#545c64" active-background-color="#F3F9F9" text-color="#9EA7B6" active-text-color="#4573D0" :collapse="true">
      <el-menu-item index="caseInfo" :disabled = "disabledCaseInfo" @click="goTo('case_handle_caseInfo')">
        案件<br>总览
      </el-menu-item>
      <el-menu-item index="inforCollect" @click="goTo('case_handle_inforCollect')">
        基本<br>信息
      </el-menu-item>
      <el-menu-item index="flowChart" :disabled = "disabledFlow" @click="goTo('case_handle_flowChart')">
        案件<br>流程
      </el-menu-item>
      <el-menu-item index="handleRecordForm" @click="goTo('case_handle_handleRecordForm')">
        操作<br>记录
      </el-menu-item>
      <el-menu-item index="documentForm" :disabled = "disabledBeforeEstablish">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('documentForm')" @click="goTo('case_handle_documentForm')">文书<br>列表</div>
        <div v-else>文书<br>列表</div>
      </el-menu-item>
      <el-menu-item index="deliverReceiptForm" :disabled = "disabledBeforeEstablish">
        <div v-if="!disabledBeforeEstablish" @mouseenter="mouseenterShowEmit('deliverReceiptForm')" @click="goTo('case_handle_deliverReceiptForm')">送达<br>回证</div>
        <div v-else>送达<br>回证</div>
      </el-menu-item>
      <el-menu-item index="evidenceForm" >
        <div @mouseenter="mouseenterShowEmit('evidenceForm')" @click="goTo('case_handle_evidenceForm')">证据<br>目录</div>
      </el-menu-item>
      <el-menu-item index="archiveCatalogue" :disabled = "disabledArchiveCatalogue">
        <div v-if="!disabledArchiveCatalogue" @mouseenter="mouseenterShowEmit('archiveCatalogue')"  @click="goTo('case_handle_archiveCatalogueDetail')">卷宗<br>目录</div>
        <div v-else>卷宗<br>目录</div>
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
    <evidenceCatalogue ref="evidenceCatalogueRef"></evidenceCatalogue>
    <!-- 文书列表 -->
    <documentFormRef ref="documentFormRef"></documentFormRef>
     <!-- 送达回证列表 -->
    <deliverReceiptFormRef ref="deliverReceiptFormRef"></deliverReceiptFormRef>
  </div>

</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import archiveCatalogue from "@/page/caseHandle/waitArchive/archiveCatalogue";
import evidenceCatalogue from "@/page/caseHandle/case/form/evidenceCatalogue";
import documentFormRef from "@/page/caseHandle/case/form/documentFormRef";
import deliverReceiptFormRef from "@/page/caseHandle/case/form/deliverReceiptFormRef";

export default {
  data(){
    return{
      disabledArchiveCatalogue:true,
      disabledCaseInfo:true,
      disabledBeforeEstablish:true,
      disabledFlow:true,
    }
  },
  props:['activeIndex'],
  computed: { ...mapGetters(["caseApproval",'caseId','caseHandle']) },
  components: {
    archiveCatalogue,
    evidenceCatalogue,
    documentFormRef,
    deliverReceiptFormRef
  },
  methods: {
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

    },
    //关掉其他目录弹窗
    closeOtherDia(){
        this.$refs.archiveCatalogueRef.closeDialog();
        this.$refs.evidenceCatalogueRef.closeDialog();
        this.$refs.documentFormRef.closeDialog();
        this.$refs.deliverReceiptFormRef.closeDialog();
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
      if(data.caseStatus == "未立案"){
          this.disabledCaseInfo = true;
      }else{ 
          if(data.doingLink.includes(this.BASIC_DATA_SYS.establish_caseLinktypeId)){
            this.disabledCaseInfo = false;
          }else{
            if(data.completeLink.includes(this.BASIC_DATA_SYS.establish_caseLinktypeId)){ //已完成
              this.disabledCaseInfo = false;
            }else{
              this.disabledCaseInfo = true;
            }
          }     
      }
     
      //文书列表、送达回证（两级立案审批通过后可用）方法：判断已完成有没有立案
      this.disabledBeforeEstablish = !data.completeLink.includes(this.BASIC_DATA_SYS.establish_caseLinktypeId);
      //控制案件流程 （信息采集保存后可用 方法：状态是不是1
      this.disabledFlow = !data.state
      console.log('控制案件总览', this.disabledCaseInfo)
    }
  },
  mounted(){
    //判断快捷菜单是否可用
    this.getCaseData();
  }
}
</script>
<style lang="scss">
@import "@/assets/css/documentForm.scss";
</style>
