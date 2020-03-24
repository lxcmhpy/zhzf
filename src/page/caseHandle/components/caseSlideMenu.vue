<template>
  <div class="right_side_box">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" background-color="#545c64" active-background-color="#F3F9F9" text-color="#9EA7B6" active-text-color="#4573D0" :collapse="true">
      <el-menu-item index="caseInfo" @click="goTo('caseInfo')">
        案件<br>总览
      </el-menu-item>
      <el-menu-item index="inforCollect" @click="goTo('inforCollect')">
        基本<br>信息
      </el-menu-item>
      <el-menu-item index="flowChart" @click="goTo('flowChart')">
        案件<br>流程
      </el-menu-item>
      <el-menu-item index="handleRecordForm" @click="goTo('handleRecordForm')">
        操作<br>记录
      </el-menu-item>
      <el-menu-item index="documentForm" @click="goTo('documentForm')">
        文书<br>列表
      </el-menu-item>
      <el-menu-item index="deliverReceiptForm" @click="goTo('deliverReceiptForm')">
        送达<br>回证
      </el-menu-item>
      <el-menu-item index="evidenceForm" >
        <div @mouseenter="mouseenterShowEmit('evidenceForm')" @click="goTo('evidenceForm')">证据<br>目录</div>
      </el-menu-item>
      <el-menu-item index="archiveCatalogue" > 
        <div @mouseenter="mouseenterShowEmit('archiveCatalogue')"  @click="goTo('archiveCatalogueDetail')">卷宗<br>目录</div>
       </el-menu-item>
      <!-- <el-menu-item index="10" class="top" @click="scrollToTop">
        置顶
      </el-menu-item> -->
    </el-menu>
       


    <!-- <div class="btn_box bottom_fixed">
      <i class="el-icon-arrow-up"></i>
    </div> -->

  </div>

</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
export default {
  data(){
    return{

    }
  },
  props:['activeIndex'],
  computed: { ...mapGetters(["caseApproval"]) },
  methods: {
    goTo(name){
      console.log('name',name)
      if(this.caseApproval) {
        this.$message('暂不支持审批人员查看');
      }else{
        this.$store.dispatch('deleteTabs', 'caseInfo');
        this.$router.push({
            name: name,
            params:{
              fromSlide: true
            }
        })
      }
      
    },
    scrollToTop() {
        let scrollId = this.$route.meta.scrollId;
        $("#" + scrollId + "").find(".el-scrollbar__wrap").animate({ scrollTop: 0 }, "slow");
    },
    //鼠标移入显示
    mouseenterShowEmit(type){
      console.log('hover')
      if(type == 'archiveCatalogue'){
         this.$emit('showArchiveCatalogue');
      }
      if(type == 'evidenceForm'){
        this.$emit('showEvidenceCatalogue');
      }
     
    },
    
  }
}
</script>
<style lang="scss">
@import "@/assets/css/documentForm.scss";
</style>
