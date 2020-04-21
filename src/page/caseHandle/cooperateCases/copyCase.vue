<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch @showSomeSearch="showSomeSearch" @caseRecord="caseRecord" @searchCase="getCaseCopy" :caseState="'copy'"></caseListSearch>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="100%">
          <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
          <el-table-column prop="party" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="wfss" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.wfss}}</div>
                <span>{{scope.row.wfss}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="organMb" label="目标机构" align="center" width="150"></el-table-column>
          <el-table-column prop="createTime" :formatter="dataFormat" label="发起时间" align="center" width="150"></el-table-column>
          <el-table-column prop="person" label="申请人" align="center" width="100"></el-table-column>
          <el-table-column prop="state" label="处理状态" align="center" width="100">
            <template slot-scope="scope">
              <div :style="{'color':scope.row.state== 1 ?'#22C058':''}">{{scope.row.state == 1?'已发送':'已完成'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <span class="edit" @click="view(scope.row)">查看</span>
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
import caseListSearch from "@/components/caseListSearch/caseCopyListSearch";
import caseRegisterDiag from "../../caseHandle/unRecordCase/caseRegisterDiag";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { queryCaseCopyListPageApi } from "@/api/caseHandle";
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
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
    caseRegisterDiag
  },
  methods: {
    dataFormat(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc == null || daterc == "") return "";
      let date = new Date(daterc);
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      let formatData = Y + M + D;
      return formatData;
    },

    caseRecord() {
      this.$refs.caseRegisterDiagRef.showModal();
    },
    //获取案件抄告列表
    getCaseCopy(searchData) {
      let copyData = searchData;
      if (copyData.current) {
        this.currentPage = copyData.current;
      }
      copyData.current = this.currentPage;
      copyData.size = this.pageSize;
      queryCaseCopyListPageApi(copyData).then(
        res => {
          console.log('抄告列表', res.data.records)
          this.tableData = res.data.records
          this.total = res.data.total
          console.log('总数', this.total)
        });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseCopy({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseCopy({});
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    // 查看
    view(row) {
      console.log("案号", row.caseNumber)
      this.$router.replace({
        name: "case_handle_caseCopyDentails",
        params: {
          caseInfo: row
        }
      });
      let setCaseNumber = "抄告 : " + row.caseNumber;
      this.$store.commit("setCaseNumber", setCaseNumber);
    }
  },
  created() {
    this.getCaseCopy({});
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
