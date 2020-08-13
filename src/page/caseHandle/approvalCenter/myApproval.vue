<template>
<!-- 待我审批 -->
<div class="com_searchAndpageBoxPadding">
  <div
      :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'"

    >
    <caseListSearch ref="caseListSearch" @showSomeSearch="showSomeSearch"  @searchCase="getMyApprovalCase" :caseState="'myApproval'"></caseListSearch>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
        <el-table-column prop="docApplyDate" label="申请时间" align="center" width="200"></el-table-column>
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
        <el-table-column prop="docApplicant" label="申请人" align="center" width="100"></el-table-column>
        <el-table-column prop="currentLinkName" label="当前环节" align="center" width="100"></el-table-column>
        <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.warType=='1'" placement="top-start" effect="light">
                <div slot="content" class="warn-li" style="color:#FF0000">
                  <li>多行信息</li>
                  <li>第二行信息</li>
                  <li>第二行信息</li>
                </div>
                <div class="warn-box" style="background:#FF0000">警</div>
              </el-tooltip>
              <el-tooltip v-if="scope.row.warType=='2'" placement="top-start" effect="light">
                <div slot="content" class="warn-li" style="color:#FF6600">
                  <li>多行信息</li>
                  <li>第二行信息</li>
                  <li>第二行信息</li>
                </div>
                <div class="warn-box" style="background:#FF6600">警</div>
              </el-tooltip>
              <el-tooltip v-if="scope.row.warType=='3'"  placement="top-start" effect="light">
                <div slot="content"  class="warn-li" style="color:#0084FF">
                  <li>多行信息</li>
                  <li>第二行信息</li>
                  <li>第二行信息</li>
                </div>
                <div class="warn-box" style="background:#0084FF">警</div>
              </el-tooltip>
            </template>
          </el-table-column>
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
      console.log('列表数据row',row)
      this.$store.commit("setCaseId", row.id);
      this.$store.commit("setIsLawEnforcementSupervision", false);
      this.$store.commit("setLawEnforcementSupervisionType", '');
      //设置案件状态为审批中
      this.$store.commit("setCaseApproval", true);
      let setCaseNumber = row.caseNumber!='' ?  row.caseNumber : row.tempNo;
      this.$store.commit("setCaseNumber", setCaseNumber);
      this.$store.commit('setApprovalState', 'approvaling')
      //设置文书数据的id
      this.$store.commit('setDocDataId', row.docId);
      this.$router.push({ name: 'case_handle_myPDF', params: { docId: row.docTypeId } }) 
    }
  },
  created() {
    this.getMyApprovalCase({});
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
