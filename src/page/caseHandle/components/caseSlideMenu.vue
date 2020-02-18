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
      <el-menu-item index="4">
        操作<br>记录
      </el-menu-item>
      <el-menu-item index="5">
        文书<br>列表
      </el-menu-item>
      <el-menu-item index="6">
        送达<br>回证
      </el-menu-item>
      <el-menu-item index="7">
        证据<br>目录
      </el-menu-item>
      <!-- <el-menu-item index="8">
        审核<br>流程
      </el-menu-item> -->
      <el-menu-item index="archiveCatalogue" @click="showArchiveCatalogueEmit()">
        卷宗<br>目录
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
export default {
  data(){
    return{
      
    }
  },
  props:['activeIndex'],
  methods: {
    goTo(name){
      this.$store.dispatch('deleteTabs', 'caseInfo');
      this.$router.push({
          name: name,
          params:{
            fromSlide: true
          }
      })
    },
    scrollToTop() {
        let scrollId = this.$route.meta.scrollId;
        $("#" + scrollId + "").find(".el-scrollbar__wrap").animate({ scrollTop: 0 }, "slow");
    },
    //显示卷宗目录
    showArchiveCatalogueEmit(){
      this.$emit('showArchiveCatalogue');
    }
  }
}
</script>
<style lang="less">
@import "../../../css/documentForm.less";
</style>