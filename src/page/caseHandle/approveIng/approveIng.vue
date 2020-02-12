<template>
<div class="com_searchAndpageBoxPadding">
  <div
      :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'"
      
    >
    <caseListSearch @showSomeSearch="showSomeSearch"  @searchCase="getApproveIngCase" :caseState="'approveIng'"></caseListSearch>

    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
        <el-table-column prop="tempNo" label="案号" align="center"></el-table-column>
        <el-table-column prop="vehicleShipId" label="车/船号" align="center"></el-table-column>
        <el-table-column prop="name" label="当事人/单位" align="center"></el-table-column>
        <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
        <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column>
        <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column>
        <el-table-column prop="caseStatus" label="案件状态" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
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
</div>
</template>
<script>

import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true
    };
  },
  mixins:[mixinGetCaseApiList],
  components: {
    caseListSearch,
  },
  methods: {
  
    //获取审批中的数据
    getApproveIngCase(searchData) {
      let data = searchData;
      data.flag = 3;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getUnRecordCase();
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getUnRecordCase();
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    //跳转立案登记
    clickCase(row){
      // this.$router.replace({ 
      //     name: 'filingApproval',
      //     params: {
      //       id: row.id,
      //     }
      // });
    }
  },
  created() {
    this.getApproveIngCase({});
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>