<template>
<div class="com_searchAndpageBoxPadding">
  <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
    
    <div class="handlePart caseHandleSearchPart">
    <div>
       <router-link :to="{ name: 'case_handle_addProperty', params: { id: 'add' }}">
          <el-button type="primary" size="medium" icon="el-icon-plus">财务登记</el-button>
       </router-link>
    </div>
    <div>
      <el-form :model="searchForm" ref="searchForm" class="caseSearchForm" label-width="110px">
        <div>
          <div class="item">
            <el-form-item label="财务编号">
              <el-input v-model="searchForm.propertyNo"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="财务名称">
              <el-input v-model="searchForm.propertyName"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="关联案件案号">
              <el-input v-model="searchForm.caseNumber"></el-input>
            </el-form-item>
          </div>
          
            <div class="item">&nbsp;
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button
                type
                size="medium"
                :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                @click="showSomeSearch"
                ></el-button>
            </div>
        </div>
        <div :class="{hideSomeSearchClass:hideSomeSearch}">
            <div class="item">
                <el-form-item label="处理方式">
                    <el-select
                        v-model="searchForm.handleWay"
                        placeholder="请选择"
                    >
                        <el-option
                        v-for="(item,index) in handleWayList"
                        :key="index"
                        :label="item"
                        :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="item">
                <el-form-item label="归属人/单位">
                    <el-input v-model="searchForm.propertyBelonger"></el-input>
                </el-form-item>
            </div>
            <div class="item" >
                <el-form-item label="保管单位">
                    <el-input v-model="searchForm.saveUnit"></el-input>
                </el-form-item>
            </div>
            <div class="item" >
                <el-form-item label="保管方式">
                    <el-input v-model="searchForm.saveWay"></el-input>
                </el-form-item>
            </div>

          <div class="item">
            <el-form-item label="剩余期限">
                <el-select
                v-model="searchForm.storagePeriod"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in syqxList"
                  :key="index"
                  :label="item + '天'"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          
        </div>
      </el-form>
    </div>
  </div>
    <el-row>
      <el-button type="primary" size="medium" @click="handleDialog('case')">案件关联/解除</el-button>
      <el-button type="primary" size="medium" @click="handleDialog('property')">财物处理</el-button>
    </el-row>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="propertyNo" label="财务编号" align="center">
          <template slot-scope="scope">
            <router-link :to="{ name: 'case_handle_viewProperty', params: { id: scope.row.id }}">
              <el-button type="text" >{{scope.row.propertyNo}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="propertyName" label="财务名称" align="center"></el-table-column>
        <el-table-column prop="propertyNum" label="财务数量/单位" align="center"></el-table-column>
        <el-table-column prop="caseNo" label="关联案件案号" align="center"></el-table-column>
        <el-table-column prop="propertyBelonger" label="财物归属人/单位" align="center"></el-table-column>
        <el-table-column prop="saveUnit" label="保管单位" align="center"></el-table-column>
        <el-table-column prop="saveWay" label="保管方式" align="center"></el-table-column>
        <el-table-column prop="storagePeriod" label="剩余期限" align="center"></el-table-column>
        <el-table-column prop="op" label="操作" align="center" width="100">
          <template slot-scope="scope">
            <router-link :to="{ name: 'case_handle_addProperty', params: { id: scope.row.id }}">
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox"  v-if="tableData.length > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageSizeChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next,sizes,jumper"
        :total="total"
      ></el-pagination>
    </div>

  </div>

  <propertyDialog ref="dialog" @handle-case-data="handleCaseData"></propertyDialog>
</div>
</template>
<script>

import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import propertyDialog from "./propertyDialog.vue";
import {queryProperty,deletePropertyById} from "@/api/propertyManage";

export default {
  components: {
    propertyDialog
  },
  data() {
    return {
      searchForm:{
          propertyNo:"",
          propertyName:"",
          caseNumber:"",
          handleWay:"",
          propertyBelonger:"",
          saveUnit:"",
          saveWay:"",
          storagePeriod:""
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true,
      handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
      syqxList:[30,90,180,360],
      multipleSelection:[]
    };
  },
  mixins:[mixinGetCaseApiList],
  methods: {
    newAdd() {
      this.$router.push({
        name: 'case_handle_addProperty'
      })
    },
    handleDialog(type) {
        this.$refs.dialog.showModal(
          type,
          {}
          );
    },
    handleCaseData(data){
        debugger;
        console.log("绑定案件信息:"+data);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取已归档的数据
    getDataList(searchData) {
        let data = searchData;
        data.current = this.currentPage;
        data.size = this.pageSize;
        let _this = this;
        queryProperty(data).then(
              res => {
                  _this.totalPage = res.data.total;
                  debugger
                  _this.tableData = res.data.records;
              },
              error => {
                  console.log(error)
              }
        );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList(this.searchForm);
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getDataList(this.searchForm);
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    searchEmit(){
      this.getDataList(this.searchForm);
    }
  },
  created() {
      this.getDataList({});
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
</style>
