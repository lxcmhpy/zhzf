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
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="randomSamplingStaff">随机抽取</el-button>
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
  import {findPykhCaseByPage} from "@/api/catsAppraisalExamCaseUpload.js";
  import {randomSamplingStaffByPage,findAllDepartment} from "@/api/catsAppraisalExamPersonUpload.js";
  import {getCurrentBatchId} from "@/api/catsAppraisalStartUp.js";
  import iLocalStroage from '@/common/js/localStroage';

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
                caseType: res.data.records[i].caseType,
                businessArea:res.data.records[i].businessArea,
                caseCause:res.data.records[i].caseCause,
                disabled: res.data.records[i].caseStatus==0?false:true
              });
            }
            this.data=caseList;
          }
        });
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        var ids= [];
        for(var j=0;j<value.length;j++){
          ids.push(this.data[value[j]].caseId)
        }
        var submitCaseData={};
        submitCaseData.idList= ids ;
        submitCaseData.batchId=this.search.batchId;
        var param=qs.stringify(submitCaseData, { indices: false });
        submitProStaff(param).then(res=>{
          console.info("抽取结果",res);
        });
      },
      randomSamplingStaff(){
        randomSamplingStaffByPage({}).then(res=>{
          console.info("部级随机抽取人员:",res);
        })
      },
      getBatch(){
        getCurrentBatchId().then(res=>{
          console.info("请求批次结果：",res);
          if(res.code=200){
            this.search.batchId=res.data
          }
        });
      },
      getOrgan(){
        findAllDepartment(this.organId).then(res=>{
          console.info("组织机构：",res);
          if(res.code=200){
            this.organList=res.data
          }
        });
      }

    },
    mounted() {
      let userInfo = iLocalStroage.gets("userInfo");
      console.info("userinfo:",userInfo)
      this.organId = userInfo.organId;
      this.getBatch();
      this.getOrgan();
    }

  };
</script>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
