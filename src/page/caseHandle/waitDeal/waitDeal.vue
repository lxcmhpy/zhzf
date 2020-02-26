<template>
  <div class="com_searchAndpageBoxPadding">
    <div
      :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'"
      id="waitDealBox"
    >
      <caseListSearch
        @showSomeSearch="showSomeSearch"
        @searchCase="getCaseList2"
        :caseState="'waitDeal'"
      ></caseListSearch>

      <div class="tablePart table_tr_overflow">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          @current-change="clickCase"
          height="100%"
        >
          <el-table-column prop="caseNumber" label="案号" align="center"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center"></el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center"></el-table-column>
          <el-table-column prop="currentLinkName" label="当前环节" align="center"></el-table-column>
          <el-table-column prop="caseStatus" label="案件状态" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      hideSomeSearch: true
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch
  },
  methods: {
    goFlowChart(id) {
      this.$router.push({
        name: "flowChart",
        params: {
          id: id
        }
      });
    },
    //获取机构下数据
    getCaseList2(searchData) {
      let data = searchData;
      data.flag = 0;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
    clickCase(row) {
      console.log(row);
      this.$store.commit("setCaseId", row.id);
      console.log(this.$store.state.caseId);
      this.$router.push({
        name: "caseInfo",
        params: {
          caseInfo: row
        }
      });
      let setCaseNumber = row.caseNumber!='' ?  row.caseNumber : '案件'
      this.$store.commit("setCaseNumber", setCaseNumber);

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      console.log("每页显示的条数", val);
      this.pageSize = val;
      this.getCaseList2({});
    },
    //更换页码
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getCaseList2({});
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    }
  },
  created() {
    // let data = {};
    this.getCaseList2({});
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
