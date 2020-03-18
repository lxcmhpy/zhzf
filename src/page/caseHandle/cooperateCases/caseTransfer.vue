<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch @showSomeSearch="showSomeSearch" @caseRecord="caseRecord" @searchCase="getUnRecordCase" :caseState="'transfer'"></caseListSearch>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCase" height="100%">
          <el-table-column prop="tempNo" label="案号" align="center" width="200"></el-table-column>
          <!-- <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column> -->
          <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="caseType" label="目标机构" align="center" width="150"></el-table-column>
          <el-table-column prop="acceptTime" label="发起时间" align="center" width="150"></el-table-column>
          <el-table-column prop="caseType" label="申请人" align="center" width="100"></el-table-column>
          <el-table-column prop="currentLinkName" label="处理状态" align="center" width="100">
            <template slot-scope="scope">
              <div :style="{'color':scope.row.currentLinkName=='已完成'?'#22C058':''}">{{scope.row.currentLinkName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <span class="edit">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
      </div>
      <caseRegisterDiag ref="caseRegisterDiagRef"></caseRegisterDiag>
    </div>
  </div>
</template>
<script>
import caseListSearch from "@/components/caseListSearch/cooperateCaseListSearch";
import caseRegisterDiag from "../../caseHandle/unRecordCase/caseRegisterDiag";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";

export default {
  data() {
    return {
      // caseSearchForm: {
      //   caseId: "",
      //   caseId2: "",
      //   caseId3: "",
      //   caseId4: "",
      //   caseId5: "",
      //   caseId6: ""
      // },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag
  },
  methods: {
    caseRecord() {
      this.$refs.caseRegisterDiagRef.showModal();
      // this.makeRoute('/inforCollect','/inforCollect2','/inforCollect3','inforCollect','inforCollect2','inforCollect3','信息采集','caseHandle/unRecordCase/inforCollection.vue');
    },
    //获取机构下的未立案数据
    getUnRecordCase(searchData) {
      let data = searchData;
      data.flag = 0;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      console.log(data);
      this.getCaseList(data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getUnRecordCase({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUnRecordCase({});
    },
    //跳转立案登记
    handleCase(row) {
      console.log(row);
      this.$store.commit("setCaseId", row.id);
      this.$router.replace({
        name: "establish"
      });
      let setCaseNumber = row.caseNumber != '' ? row.caseNumber : '案件'
      this.$store.commit("setCaseNumber", setCaseNumber);
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    }
  },
  created() {
    this.getUnRecordCase({});
  }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
<style scoped>
.edit {
  cursor: pointer;
  color: #4573d0;
}
</style>
