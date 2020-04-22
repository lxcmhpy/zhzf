<template>
  <div class="com_searchAndpageBoxPadding">
    <div
      :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'"

    >
      <caseListSearch ref="archiveCaseSearch" @showSomeSearch="showSomeSearch" @searchCase="getWaitArchiveCase"
                      :caseState="'waitArchive'"></caseListSearch>

      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row
                  @current-change="clickCase">
          <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center" width="150"></el-table-column>
          <el-table-column prop="closeDate" label="结案时间" align="center" width="100"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-show="total">
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
  import {mixinGetCaseApiList} from "@/common/js/mixins";
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
    mixins: [mixinGetCaseApiList],
    components: {
      caseListSearch,
    },
    methods: {

      //获取待归档的数据
      getWaitArchiveCase(searchData) {
        let data = searchData;
        data.flag = 2;
        data.userId = iLocalStroage.gets("userInfo").id;
        data.current = this.currentPage;
        data.size = this.pageSize;
        this.getCaseList(data);
      },
      //更改每页显示的条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getWaitArchiveCase(this.$refs.archiveCaseSearch.caseSearchForm);
      },
      //更换页码
      handlePageSizeChange(val) {
        this.currentPage = val;
        this.getWaitArchiveCase(this.$refs.archiveCaseSearch.caseSearchForm);
      },
      //展开
      showSomeSearch() {
        this.hideSomeSearch = !this.hideSomeSearch;
      },
      clickCase(row) {
        console.log(row);
        this.$store.commit('setCaseId', row.id);
        //设置案件状态不为审批中
        this.$store.commit("setCaseApproval", false);
        this.$router.push({
          name: "case_handle_archiveCover"
        });
      }
    },
    created() {
      this.getWaitArchiveCase({});
    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/index.scss";
</style>
