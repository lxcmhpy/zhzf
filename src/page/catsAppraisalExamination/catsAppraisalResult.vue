<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" >
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="onPublic">发布</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <!-- @row-click="handleNodeClick" -->
        <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
          <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
          <el-table-column prop="batchName" label="考核名称" align="center"></el-table-column>
          <el-table-column prop="caseSore" label="案卷分数" align="center"></el-table-column>
          <el-table-column prop="selfSore" label="自查自评" align="center"></el-table-column>
          <el-table-column prop="onLineSore" label="网上评分" align="center"></el-table-column>
          <el-table-column prop="offLineSore" label="现场检查" align="center"></el-table-column>
          <el-table-column prop="psnSore" label="人员得分" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {getAppraisalResult,publicResult} from "@/api/appraisalExam.js";
  import iLocalStroage from '@/common/js/localStroage';
  export default {
    mixins: [mixinsCommon],
    data() {
      return {
        dataList:[]
      };
    },
    methods: {
      fetchData(){
        let _this = this
        getAppraisalResult().then(res=>{
          if(res.code==200){
            _this.dataList = res.data;
          }
        });
      },
      onPublic(){
        const data =  this.dataList.find(item=>
          (item.caseSore === null || item.selfSore === null || item.onLineSore === null
          || item.offLineSore === null || item.psnSore === null))
        if(data){
          this.$message({type: "warning",message: "全部完成评分后才能发布"});
          return
        }
        publicResult().then(res=>{
          if(res.code==200){
            this.$message({type: "success",message: "发布成功!"});
            this.fetchData()
          }
        });
      }
    },
    mounted () {
      this.fetchData()
    }
  };
</script>
