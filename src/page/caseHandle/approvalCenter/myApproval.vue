<template>
<!-- 待我审批 -->
<div class="com_searchAndpageBoxPadding">
  <div
      :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'"

    >
    <caseListSearch ref="caseListSearch" @showSomeSearch="showSomeSearch"  @searchCase="getMyApprovalCase" :caseState="'myApproval'"></caseListSearch>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
        <el-table-column prop="applyDate" label="申请时间" align="center" width="200"></el-table-column>
        <el-table-column label="案号" align="center" width="200">
            <template slot-scope="scope">
                <span>{{scope.row.caseNumber ? scope.row.caseNumber : scope.row.tempNo}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="当事人/单位" align="center" width="200"></el-table-column>
        <el-table-column prop="caseCauseName" label="违法行为" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
        <el-table-column prop="applicant" label="申请人" align="center" width="100"></el-table-column>
        <el-table-column prop="currentLinkName" label="当前环节" align="center" width="100"></el-table-column>
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

import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
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

    //获取待我审批的数据
    getMyApprovalCase(searchData) {
      let data = searchData;
      data.flag = 4;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getMyApprovalCase(this.$refs.caseListSearch.caseSearchForm);

    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getMyApprovalCase(this.$refs.caseListSearch.caseSearchForm);
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    //点击进入案件详情
    clickCase(row){
      this.$store.commit("setCaseId", row.id);
      //设置案件状态为审批中
      this.$store.commit("setCaseApproval", true);
      this.$router.replace({
        name: 'case_handle_caseInfo',
        params: {
          caseInfo: row,
          isApproval:true
        }
      });
      let setCaseNumber = row.caseNumber!='' ?  row.caseNumber : '案件'
      this.$store.commit("setCaseNumber", setCaseNumber);
    }
  },
  created() {
    this.getMyApprovalCase({});
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
