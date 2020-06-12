<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" >
            <el-form-item label="批次名称">
              <el-input v-model="search.batchName" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="add_openDialog">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <!-- @row-click="handleNodeClick" -->
        <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
          <el-table-column prop="batchName" label="批次名称" align="center"></el-table-column>
          <el-table-column prop="batchYear" label="批次所属年份"  align="center"></el-table-column>
          <el-table-column prop="khjs" label="案件基数" align="center"></el-table-column>
          <el-table-column prop="cqjs" label="案件/抽取基数" align="center"></el-table-column>
          <el-table-column prop="personNum" label="人员基数" align="center"></el-table-column>
          <el-table-column prop="personCq" label="人员抽取数" align="center"></el-table-column>
          <el-table-column prop="personKs" label="人员考试数" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template  slot-scope="scope">
              <el-button type="text" @click.stop @click="update_openDialog(scope.row)">修改</el-button>
              <el-button type="text" @click.stop @click="deletePykhBatchById(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" >
        <div v-if="total/dataList.size > 1">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size="dataList.size"
            layout="prev, pager, next,sizes,jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div class="noMore" v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhBatchByPage,deletePykhBatchById} from "@/api/catsAppraisalStartUp.js";
  import iLocalStroage from '@/common/js/localStroage';
  export default {
    mixins: [mixinsCommon],
    data() {
      return {
        total:0,
        current:1,
        search:{},
        dataList:[]
      };
    },
    methods: {
      fetchData(data){
        findPykhBatchByPage(data).then(res=>{
          console.log("res:",res)
          if(res.code==200){
            console.info("records:",res.data.records);
            this.dataList=res.data.records;
            this.total=res.data.total;
            this.current=res.data.current;
          }
        });
      },
      searchData(){
        let data={}
        data.current=this.current;
        data.size=5;
        data.batchName=this.search.batchName;
        this.fetchData(data);
      },
      add_openDialog(){
        let routerData = {
          type: "0"
        };
        this.$router.push({ name: "catsAppraisalStartUpAdd", params: routerData });
      },
      update_openDialog(data){
        data.type = "1"
        this.$router.push({ name: "catsAppraisalStartUpAdd", params: data });
      },
      deletePykhBatchById(data){
        deletePykhBatchById(data.id).then(res=>{
          if(res.code==200){
            let data={}
            data.current=this.current;
            data.size=5;
            this.fetchData(data);
          }
        })
      },
      resetSearch(){
        this.search={};
      }
    },
    mounted () {
      let data={}
      data.current=this.current;
      data.size=5;
      this.fetchData(data);
    }
  };
</script>
