<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">

        <div class="search">
          <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px" :inline="true" >
            <el-form-item label="所属机构">
              <el-select v-model="search.oId" placeholder="请选择" @change="fetchData" >
                <el-option v-for="(item,index) in organList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="考核名称">
              <el-select v-model="search.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="randomSamplingCase">随机抽取</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="extractPage">
          <div class="com_extract_top" >
            <el-transfer width="100%" :titles="['案件列表', '已抽取案件']" v-model="value" 
            :button-texts="['取消', '抽取']" 
            :data="data"
            @change="handleChange">
                <span slot-scope="{ option }" >
                    <ul class="transfer-list" >
                        <li><span>案件编号{{ option.caseNo }}</span></li>
                        <li><span>案件类型{{ option.caseType }}</span></li>
                        <li><span>业务领域{{ option.businessArea }}</span></li>
                        <li><span>案由{{ option.caseCause }}</span></li>
                    </ul>
                </span>
              <el-button class="transfer-footer" slot="left-header" size="small" >操作</el-button>
              <el-button class="transfer-footer" slot="right-header" size="small">操作</el-button>

            </el-transfer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhCaseByPage,submitCase,randomSamplingCaseByPage} from "@/api/catsAppraisalExamCaseUpload.js";
  import {findAllDepartment} from "@/api/catsAppraisalExamPersonUpload.js";
  import {getCurrentBatchId} from "@/api/catsAppraisalStartUp.js";
  import iLocalStroage from '@/common/js/localStroage';
  import qs from 'qs';
  export default {
    data() {
      return {
        data: [],
        value: [],
        search:{
          oId:"",
          batchId:"",
          current:1,
          size:200
        },
        organId:"",
        labelPosition: 'right',
        batchList:[],
        organList:[]

      };
    },
    methods:{
      fetchData(){
        findPykhCaseByPage(this.search).then(res=>{
          if(res.code==200){
            this.data=res.data.records;
            var caseList=[];
            for(var i=0;i<res.data.records.length;i++){
              if(res.data.records[i].caseStatus!=0){
                this.value.push(i)
              }
              caseList.push({
                key: i,
                label: res.data.records[i].caseNo,
                caseNo:res.data.records[i].caseNo,
                caseId:res.data.records[i].caseId,
                caseType: res.data.records[i].caseType,
                businessArea:res.data.records[i].businessArea,
                caseCause:res.data.records[i].caseCause
              });
            }
            this.data=caseList;
          }
        });
      },
      handleChange(value, direction, movedKeys) {
        var ids= [];
        for(var j=0;j<value.length;j++){
          ids.push(this.data[value[j]].caseId)
        }
        var submitCaseData={};
        submitCaseData.idList= ids ;
        submitCaseData.batchId=this.search.batchId;
        let _this = this
        submitCase(submitCaseData).then(res=>{
          if(res.code===200){
            if(res.data === "操作成功"){
              _this.$message({type: "success",message: res.data});
            }else if(res.data === "取消成功"){
              _this.$message({type: "success",message: res.data});
              _this.value = []
            }else{
              _this.$message({type: "error",message: res.data});
              _this.value = []
            }
          }
        });
      },
      randomSamplingCase(){
        if(this.search.batchId=="" || this.search.OId=="" ){
          this.$message({
            message: '请先选择机构和考核名称',
            type: 'error'
          })
        }else{
          randomSamplingCaseByPage(this.search.oId,this.search.batchId).then(res=>{
            this.value.push(2)
            this.value.push(4)
          })
        }
      },
      getBatch(){
        getCurrentBatchId().then(res=>{
          if(res.code=200){
            this.search.batchId=res.data
          }
        });
      },
      getOrgan(){
        findAllDepartment(this.organId).then(res=>{
          if(res.code=200){
            this.organList=res.data
          }
        });
      }

    },
    mounted() {
      let userInfo = iLocalStroage.gets("userInfo");
      this.organId = userInfo.organId;
      this.getBatch();
      this.getOrgan();
    }

  };
</script>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
