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
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="randomSamplingStaff">新增</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="extractPage">
          <div class="com_extract_top" >
            <el-transfer width="100%" :titles="['案件列表', '已抽取案件']" v-model="value" :data="personData">
                <span slot-scope="{ option }" >
                    <ul class="transfer-list" >
                        <li><span>案件编号{{ option.key }} - {{ option.label }}</span></li>
                        <li><span>案件类型{{ option.key }} - {{ option.label }}</span></li>
                        <li><span>业务领域{{ option.key }} - {{ option.label }}</span></li>
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
  import {findPykhStaffByPage,randomSamplingStaffByPage,findListVoByBatch,findAllDepartment} from "@/api/catsAppraisalExamPersonUpload.js";
  import iLocalStroage from '@/common/js/localStroage';

  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        personData: generateData(),
        value: [1, 4],
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
        console.info("查询参数：",data)
        findPykhStaffByPage(data).then(res=>{
          console.info("根据条件分页查询人员列表:",res);
          if(res.code==200){
            this.personList=res.data.records;
          }
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
        randomSamplingStaffByPage({}).then(res=>{
          console.info("部级随机抽取人员:",res);
        })
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
