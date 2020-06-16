<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">

        <div class="search">
          <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px" :inline="true" >
            <el-form-item label="所属机构">
              <el-select v-model="search.OId" placeholder="请选择" >
                <el-option v-for="(item,index) in organList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考核名称">
              <el-select v-model="search.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
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
<!--              <el-button class="transfer-footer" slot="left-header" size="small" @click="leftClick">操作</el-button>-->
<!--              <el-button class="transfer-footer" slot="right-header" size="small" @click="rightClick">操作</el-button>-->

            </el-transfer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhStaffByPage,randomSamplingStaffByPage,findListVoByBatch,findAllDepartment,submitProStaff} from "@/api/catsAppraisalExamPersonUpload.js";
  import iLocalStroage from '@/common/js/localStroage';

  export default {
    data() {
      return {
        value: [],
        search:{
          OId:"",
          batchId:""
        },
        personList:[],
        organId:"",
        labelPosition: 'right',
        batchList:[],
        organList:[]

      };
    },
    methods:{
      fetchData(data){
        data.size=1000;
        data.current=1;
        console.info("查询参数：",data)
        findPykhStaffByPage(data).then(res=>{
          console.info("根据条件分页查询人员列表:",res);
          if(res.code==200){
            var personlist=[];
            for(var i=0;i<res.data.records.length;i++){
              var maritimeNo=res.data.records[i].maritimeNo==null?'':res.data.records[i].maritimeNo+",";
              var provinceNo=res.data.records[i].provinceNo==null?'':res.data.records[i].provinceNo+",";
              var ministerialNo=res.data.records[i].ministerialNo==null?'':res.data.records[i].ministerialNo+",";
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
        var ids=[];
        var personList=this.personList;
        console.info("personlist:",personList)
        // for (var i =0 ;i<personList.length;i++){
        //   for(var j=0;j<value.length;j++){
        //     console.info("抽取号：",value[j])
        //     if(i!=value[j]){
        //       ids.push(personList[i].staffId);
        //     }
        //   }
        // }
        for(var j=0;j<value.length;j++){
          // for (var i =0 ;i<personList.length;i++){
          //   if(i==value[j]){
          //           ids.push(personList[i].staffId);
          //   }
          //   break;
          // }
          ids.push(personList[value[j]].staffId)
        }
        console.info("ids:",ids)
        var submitProStaffData={};
        submitProStaffData.idList=ids;
        submitProStaffData.batchId=this.search.batchId;
        submitProStaff(submitProStaffData,this.search.OId).then(res=>{
          console.info("抽取结果",res);
        });
      },
      resetSearch(){
        this.search={}
      },
      searchData(){

        let data={};
        data.OId=this.search.OId;
        data.batchId=this.search.batchId;
        console.info("this.search:",data)
        this.fetchData(data);
      },
      randomSamplingStaff(){
        if(this.search.batchId=="" || this.search.OId=="" ){
          this.$message({
            message: '请先选择机构和考核名称',
            type: 'error'
          })
        }else{
          randomSamplingStaffByPage(this.search.OId,this.search.batchId).then(res=>{
            console.info("部级随机抽取人员:",res);
          })
        }
      },
      getBatch(){
        let batchData={}
        let nowDate = new Date();
        batchData.batchYear=nowDate.getFullYear();
        findListVoByBatch(batchData).then(res=>{
          console.info("请求批次结果：",res);
          if(res.code=200){
            this.batchList=res.data
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
