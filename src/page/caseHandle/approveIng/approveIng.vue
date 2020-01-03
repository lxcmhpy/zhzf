<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="waitDealBox">
    <!-- <div class="handlePart">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecord">立案登记</el-button>
    </div> -->
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
        <el-table-column prop="tempNo" label="案号" align="center"></el-table-column>
        <el-table-column prop="" label="车/船号" align="center"></el-table-column>
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

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0 //总页数
    };
  },
  mixins:[mixinGetCaseApiList],
  methods: {
  
    //获取审批中的数据
    getUnRecordCase() {
      let data = {
        flag: 3,
        userId: iLocalStroage.gets("userInfo").id,
        current: this.currentPage,
        size: this.pageSize,
      };
      console.log(data);
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
    this.getUnRecordCase();
  }
};
</script>