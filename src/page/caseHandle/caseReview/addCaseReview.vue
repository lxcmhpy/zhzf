<template>
  <!-- 添加案件调阅 -->
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
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
                &nbsp;
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="currentPage = 1; getCaseReviewList();"
                ></el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          height="100%"
          :empty-text="tableEmptyText"
        >
          <el-table-column prop="caseNumber" label="案号" align="center" width="200">
            <template slot-scope="scope">
              <div @click="tableRowClick(scope.row)">{{ scope.row.caseNumber }}</div>
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
          <el-table-column prop="closeDate" label="结案时间" align="center" min-width="120"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" min-width="100"></el-table-column>
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
    <!-- 申请调阅 -->
    <ApplyReview ref="ApplyReviewRef" />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getQueryCaseTypeByOrganIdApi } from "@/api/caseHandle";
import { getCloseCaseList } from "@/api/caseHandle";
import ApplyReview from "@/page/caseHandle/caseReview/applyReview";

export default {
  data() {
    return {
      caseSearchForm: {
        caseNumber: "",
        party: "",
        vehicleShipId: "",
        caseType: "",
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
    tableEmptyText() {
      if (
        !this.caseSearchForm.caseNumber &&
        !this.caseSearchForm.party &&
        !this.caseSearchForm.vehicleShipId
      ) {
        return "请输入案号、当事人/单位、车船号进行查询";
      } else {
        return "暂无数据";
      }
    },
  },
  created() {
    // 查询案件类型
    this.getQueryCaseTypeList();
  },
  methods: {
    // 查询调阅案件列表
    getCaseReviewList() {
      if (
        !this.caseSearchForm.caseNumber &&
        !this.caseSearchForm.party &&
        !this.caseSearchForm.vehicleShipId
      ) {
        this.$alert("请输入案号、当事人/单位名称、车/船号其中一项进行查询", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      const queryData = Object.assign(this.caseSearchForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      getCloseCaseList(queryData).then(
        (res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        },
        (err) => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 申请案件调阅
    tableRowClick(row) {
      this.$refs.ApplyReviewRef.showModal(row, "apply");
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
