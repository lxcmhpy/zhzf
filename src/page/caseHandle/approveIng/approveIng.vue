<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch @showSomeSearch="showSomeSearch" @searchCase="getApproveIngCase" :caseState="'approveIng'"></caseListSearch>

      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="clickCase">
          <el-table-column label="案号" align="center" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.caseNumber">{{scope.row.caseNumber}}</span>
              <span v-else>{{scope.row.tempNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="150"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center" width="200"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center" width="150"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
          <el-table-column prop="caseStatus" label="案件状态" align="center" width="100"></el-table-column>
          <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-tooltip  v-if="scope.row.warContent" placement="top-start" effect="light">
                <div slot="content" class="warn-li">
                  <li v-for="(item,index) in scope.row.warContent" :key="index">
                    <span v-if="item.warType=='1'"  style="color:#FF0000"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    <span v-if="item.warType=='2'"  style="color:#FF6600"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    <span v-if="item.warType=='3'"  style="color:#0084FF"><i class="iconfont law-yuan"></i>{{item.warContent}}</span>
                    </li>
                </div>
                <div class="warn-box" v-if="scope.row.warType=='1'" style="background:#FF0000">警</div>
                <div class="warn-box" v-if="scope.row.warType=='2'" style="background:#FF6600">警</div>
                <div class="warn-box" v-if="scope.row.warType=='3'" style="background:#0084FF">警</div>
              </el-tooltip>
              <div v-if="!scope.row.warType" style="color:#2B313E">-</div>
            </template>
        </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageSizeChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
      </div>

    </div>
    <tansferAtentionDialog ref="tansferAtentionDialogRef"></tansferAtentionDialog>
  </div>
</template>
<script>

import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import tansferAtentionDialog from "@/page/caseHandle/components/tansferAtentionDialog.vue";
import { mapGetters } from "vuex";

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
    caseListSearch, tansferAtentionDialog
  },
  computed: {
        ...mapGetters(["openTab"])
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
      this.getApproveIngCase({});
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getApproveIngCase({});
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    //跳转立案登记
    clickCase(row) {
      if (row.caseStatus === '已移送') {
        let message = '该案件正在移送中，移送完成后才可与继续办理'
        this.$refs.tansferAtentionDialogRef.showModal(message, '移送中');
      }
      else {
        this.$store.commit("setCaseId", row.id);
        this.$store.commit("setIsLawEnforcementSupervision", false);
        this.$store.commit("setLawEnforcementSupervisionType", '');
        //防止出现多个案件tab
        let newOpenTab = this.openTab.filter(item => {return item.isCase == false })
        this.$store.commit("reset_ALLTABS", newOpenTab);
        //设置案件状态不为审批中
        this.$store.commit("setCaseApproval", false);
        console.log(this.$store.state.caseId);
        this.$router.push({
          name: "case_handle_caseInfo",
          params: {
            caseInfo: row
          }
        });
        let setCaseNumber = row.caseNumber != '' ? row.caseNumber : row.tempNo;
        this.$store.commit("setCaseNumber", setCaseNumber);
      }
    }
  },
  created() {
    this.getApproveIngCase({});
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
