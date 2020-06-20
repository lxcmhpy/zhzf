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
            <el-form-item v-show="!isSubmit">
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="randomSamplingCase">随机抽取</el-button>
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="submitCase">确认抽取</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="extractPage">
          <div class="com_extract_top" >
            <el-transfer width="100%" :titles="['案件列表', '已抽取案件']" v-model="value"
            :button-texts="['', '']"
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
                <ul class="transfer-list transfer-list-header" slot="left-footer" >
                    <li><span>案件编号</span></li>
                    <li><span>案件类型</span></li>
                    <li><span>业务领域</span></li>
                    <li><span>案由</span></li>
                </ul>
                <ul class="transfer-list transfer-list-header" slot="right-footer" >
                    <li><span>案件编号</span></li>
                    <li><span>案件类型</span></li>
                    <li><span>业务领域</span></li>
                    <li><span>案由</span></li>
                </ul>
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
          size:1000,
          bsStatus:"1"
        },
        organId:"",
        labelPosition: 'right',
        batchList:[],
        organList:[],
        isSubmit:false
      };
    },
    methods:{
      fetchData(){
        findPykhCaseByPage(this.search).then(res=>{
          if(res.code==200){
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
            if(this.value.length>0){
              this.isSubmit = true
              caseList.forEach((item)=>{
                item.disabled=true
              })
            }
            this.data=caseList;
          }
        });
      },
      handleChange(value, direction, movedKeys) {
        /* var ids= [];
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
        }); */
      },
      submitCase() {
        var ids= [];
        for(var j=0;j<this.value.length;j++){
          ids.push(this.data[this.value[j]].caseId)
        }
        if(ids.length===0){
          this.$message({type: "warning",message: "请先抽取数据"});
          return
        }
        var submitCaseData={};
        submitCaseData.idList= ids ;
        submitCaseData.batchId=this.search.batchId;
        let _this = this
        submitCase(submitCaseData).then(res=>{
          if(res.code===200){
            if(res.data === "操作成功"){
              _this.data.forEach((item)=>{
                item.disabled=true
              })
              _this.isSubmit=true
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
          this.value=[]
          let _this = this
          randomSamplingCaseByPage(this.search.oId,this.search.batchId).then(res=>{
            if(res.code==200){
              for(var i=0;i<res.data.length;i++){
                var id = res.data[i].caseId
                _this.data.forEach(function(item){
                    if(item.caseId === id){
                      _this.value.push(item.key)
                    }
                })
              }
            }
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
