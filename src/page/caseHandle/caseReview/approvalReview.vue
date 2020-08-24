<template>
  <!-- 案卷调阅列表 -->
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <div class="handlePart caseHandleSearchPart">
        <div>
          <el-form
            :model="caseSearchForm"
            ref="caseSearchForm"
            class="caseSearchForm"
            label-width="110px"
          >
            <div>
              <div class="item">
                <el-form-item label="案号">
                  <el-input v-model="caseSearchForm.caseNumber"></el-input>
                </el-form-item>
              </div>

              <div class="item">
                <el-form-item label="当事人/单位">
                  <el-input v-model="caseSearchForm.party"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="车船号">
                  <el-input v-model="caseSearchForm.vehicleShipId"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                &nbsp;
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="currentPage = 1; getCaseReviewList();"
                ></el-button>
                <el-button
                  type
                  size="medium"
                  :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                  @click="hideSomeSearch = !hideSomeSearch"
                ></el-button>
              </div>
            </div>
            <div v-show="!hideSomeSearch">
              <div class="item">
                <el-form-item label="案件类型">
                  <el-select v-model="caseSearchForm.caseType" placeholder="请选择">
                    <el-option label value></el-option>
                    <el-option
                      v-for="item in caseTypeList"
                      :key="item.id"
                      :label="item.typeName"
                      :value="item.typeName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="案卷调阅状态">
                  <el-select v-model="caseSearchForm.consultCaseStatus" placeholder="请选择">
                    <el-option label value></el-option>
                    <el-option label="未审批" value="1"></el-option>
                    <el-option label="未通过" value="2"></el-option>
                    <el-option label="调阅中" value="3"></el-option>
                    <el-option label="已过期" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="100%">
          <el-table-column prop="caseNumber" label="案号" align="center" width="200">
            <template slot-scope="scope">
              <div @click="approvalCaseDialog(scope.row)">{{ scope.row.caseNumber }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="party" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="caseCauseNameCopy" label="违法行为" align="center" min-width="200px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:420px">{{scope.row.caseCauseNameCopy}}</div>
                <span>{{scope.row.caseCauseNameCopy}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="closeDate" label="结案时间" align="center" min-width="150"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" min-width="100"></el-table-column>
          <el-table-column prop="consultStatus" label="案卷调阅状态" align="center" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.consultStatus === 1">未审批</span>
              <span v-if="scope.row.consultStatus === 2">未通过</span>
              <span v-if="scope.row.consultStatus === 3">调阅中</span>
              <span v-if="scope.row.consultStatus === 4">已过期</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <div style="width:120px">
                <el-button type="text" @click="reviewCase(scope.row)">查看案卷</el-button>
              </div>
            </template>
          </el-table-column>
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
    <!-- 申请审批 -->
    <ApplyReview ref="ApprovalReviewRef" />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getQueryCaseTypeByOrganIdApi } from "@/api/caseHandle";
import ApplyReview from "@/page/caseHandle/caseReview/applyReview";
import { getApprovalCaseList } from "@/api/caseHandle";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hideSomeSearch: true,
      caseSearchForm: {
        caseNumber: "",
        party: "",
        vehicleShipId: "",
        caseType: "",
        caseStatus: "",
      },
      caseStateList: [],
      caseTypeList: [],
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
    };
  },
  components: { ApplyReview },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
    ...mapGetters(["openTab"])
  },
  created() {
    // 查询案件类型
    this.getQueryCaseTypeList();
    // 查询申请调阅列表
    this.getCaseReviewList();
  },
  methods: {
    // 查询调阅案件列表
    getCaseReviewList() {
      const queryData = Object.assign(this.caseSearchForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      getApprovalCaseList(queryData).then(
        (res) => {
          if (res.code === 200) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          }
        },
        (err) => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 点击案号进行申请审批
    approvalCaseDialog(row) {
        console.log(row)
      this.$refs.ApprovalReviewRef.showModal(row, "approval");
    },
    // 查看案卷
    reviewCase(row) {
      this.$store.commit("setCaseId", row.caseBasicinfoId);
      this.$store.commit("setIsLawEnforcementSupervision", false);
      this.$store.commit("setLawEnforcementSupervisionType", "");
      //防止出现多个案件tab
      let newOpenTab = this.openTab.filter((item) => {
        return item.isCase == false;
      });
      this.$store.commit("reset_ALLTABS", newOpenTab);
      this.$store.commit("setCaseApproval", true);
      this.$store.commit("setNoOperation", true);
      const Case = JSON.parse(JSON.stringify(row));
      row.id = row.caseBasicinfoId;
      this.$router.push({
        name: "case_handle_caseInfo",
        params: {
          caseInfo: row,
        },
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseReviewList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseReviewList();
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      let organId = this.UserInfo.organId;
      getQueryCaseTypeByOrganIdApi(organId).then(
        (res) => {
          this.caseTypeList = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
>>> .el-select {
  margin-right: 0;
  .el-input__inner {
    padding-right: 15px;
  }
}
</style>
