<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">

        <div class="search">
          <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px" :inline="true" >
            <el-form-item label="所属机构">
              <el-select v-model="search.oId" placeholder="请选择"  @change="fetchData" >
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
            <el-transfer width="100%" :titles="['人员列表', '已抽取人员']" v-model="value"
                         :button-texts="['取消', '抽取']" :data="personList"
                         @change="handleChange">
                <span slot-scope="{ option }" >
                    <ul class="transfer-list" >
                        <li><span>姓名:{{ option.staffName }} </span></li>
                        <li><span>证件号:{{ option.maritimeNo }} </span></li>
                    </ul>
                </span>

            </el-transfer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhStaffByPage,randomSamplingStaffByPage,findListVoByBatch,findAllDepartment,submitProStaff,submitStaff} from "@/api/catsAppraisalExamPersonUpload.js";
  import {getCurrentBatchId} from "@/api/catsAppraisalStartUp.js";
  import iLocalStroage from '@/common/js/localStroage';
  import qs from 'qs';

  export default {
    data() {
      return {
        value: [],
        search:{
          oId:"",
          batchId:"",
          current:1,
          size:1000,
          bsStatus:"1"
        },
        personList:[],
        organId:"",
        labelPosition: 'right',
        batchList:[],
        organList:[]

      };
    },
    methods:{
      fetchData(){
        findPykhStaffByPage(this.search).then(res=>{
          // console.info("根据条件分页查询人员列表:",res);
          if(res.code==200){
            var personlist=[];
            for(var i=0;i<res.data.records.length;i++){
              var maritimeNo=res.data.records[i].maritimeNo==null?'':res.data.records[i].maritimeNo+",";
              var provinceNo=res.data.records[i].provinceNo==null?'':res.data.records[i].provinceNo+",";
              var ministerialNo=res.data.records[i].ministerialNo==null?'':res.data.records[i].ministerialNo+",";
              if(res.data.records[i].staffStatus!=0){
                this.value.push(i)
              }
              personlist.push({
                key: i,
                label: res.data.records[i].staffName,
                staffName:res.data.records[i].staffName,
                maritimeNo: maritimeNo+provinceNo+ministerialNo,
                staffId:res.data.records[i].staffId,
                disabled: res.data.records[i].staffStatus==0?false:true
              });
            }
            this.personList=personlist;
          }
          console.info('psersonlist:',this.personList);
        });
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        var ids= [];
        var personList=this.personList;
        console.info("personlist:",personList)
        for(var j=0;j<value.length;j++){
          // ids+="idList="+personList[value[j]].staffId+"&"
          ids.push(personList[value[j]].staffId)
        }
        // console.info("ids:",qs.stringify(ids, { arrayFormat: 'brackets' }))
        var submitProStaffData={};
        submitProStaffData.idList= ids ;
        submitProStaffData.batchId=this.search.batchId;
        let _this = this
        submitStaff(submitProStaffData).then(res=>{
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
      randomSamplingStaff(){
        if(this.search.batchId=="" || this.search.OId=="" ){
          this.$message({
            message: '请先选择机构和考核名称',
            type: 'error'
          })
        }else{
          randomSamplingStaffByPage(this.search.oId,this.search.batchId).then(res=>{
            if(res.code==200){
            var personlist=[];
            for(var i=0;i<res.data.length;i++){
              if(res.data[i].staffStatus!=0){
                this.value.push(i)
              }
              var maritimeNo=res.data[i].maritimeNo==null?'':res.data[i].maritimeNo+",";
              var provinceNo=res.data[i].provinceNo==null?'':res.data[i].provinceNo+",";
              var ministerialNo=res.data[i].ministerialNo==null?'':res.data[i].ministerialNo+",";
              personlist.push({
                key: i,
                label: res.data[i].staffName,
                staffName:res.data[i].staffName,
                maritimeNo: maritimeNo+provinceNo+ministerialNo,
                staffId:res.data[i].staffId
              });
            }
            this.personList=personlist;
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
      console.info("persondata:",this.personData)
    }

  };
</script>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
