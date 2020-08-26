<template>
  <!-- 接收的协查列表 -->
  <div class="com_searchAndpageBoxPadding sponsored-case-wrap">
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
                <el-form-item label="案号" prop="caseNumber">
                  <el-input v-model="caseSearchForm.caseNumber"></el-input>
                </el-form-item>
              </div>

              <div class="item">
                <el-form-item label="当事人/单位" prop="party">
                  <el-input v-model="caseSearchForm.party"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="目标机构">
                  <el-input v-model="caseSearchForm.targetOrgan"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                &nbsp;
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="currentPage = 1; getAssistCaseList();"
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
                <el-form-item label="处理状态" prop="handleType">
                  <el-select v-model="caseSearchForm.handleType" placeholder="请选择">
                    <el-option label value></el-option>
                    <el-option label="已发送" :value="1"></el-option>
                    <el-option label="已完成" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="违法行为" prop="illegalActivities">
                  <el-input v-model="caseSearchForm.illegalActivities"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="申请人" prop="applicant">
                  <el-input v-model="caseSearchForm.applicant"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="发起时间" prop="launchTime">
                  <el-date-picker
                    v-model="caseSearchForm.launchTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="switch-filter">
        <span class="switch-filter-label">筛选：</span>
        <el-radio-group v-model="caseSearchForm.assistStatus" size="medium">
          <el-radio-button label="1">待回复</el-radio-button>
          <el-radio-button label="2">已完成</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="100%">
          <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
          <el-table-column prop="party" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="caseCauseNameCopy" label="违法行为" align="center" min-width="200px">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:420px">{{scope.row.caseCauseNameCopy}}</div>
                <span>{{scope.row.caseCauseNameCopy}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="targetOrgan" label="目标机构" align="center" min-width="150"></el-table-column>
          <el-table-column prop="closeDate" label="发起时间" align="center" min-width="150"></el-table-column>
          <el-table-column prop="handler" label="申请人" align="center" min-width="100"></el-table-column>
          <el-table-column prop="handleType" label="处理状态" align="center" min-width="100"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="checkCase(scope.row)">查看</el-button>
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
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getQueryCaseTypeByOrganIdApi } from "@/api/caseHandle";
import { getAssistCaseList } from "@/api/caseHandle";
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
        targetOrgan: "",
        handleType: "",
        illegalActivities: "",
        applicant: "",
        launchTime: "",
        assistStatus: "1",
      },
      caseTypeList: [],
      tableData: [
        {
          caseNumber: "部临〔2020〕00204号",
          party: "张三",
          caseCauseNameCopy: "车辆在公路上擅自超限行驶",
          handleType: "待回复",
        },
      ],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
    };
  },
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {
    // 查询案件类型
    // this.getQueryCaseTypeList();
    // 查询列表
    // this.getAssistCaseList();
  },
  methods: {
    // 查询协查案件列表
    getAssistCaseList() {
      const queryData = Object.assign(this.caseSearchForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      console.log("查询协查列表");
    },
    // 查看协查案件
    checkCase(row) {
      console.log(row);
    },
    // 新增协查
    addAssistCase() {
      sessionStorage.setItem("AssistStep", 0);
      this.$router.push({
        path: "/add-assist-case_JX",
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getAssistCaseList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAssistCaseList();
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
  >>> .el-input__icon {
    line-height: 32px;
  }
}
>>> .el-select {
  margin-right: 0;
  .el-input__inner {
    padding-right: 15px;
  }
}
.sponsored-case-wrap {
  .switch-filter {
    line-height: 32px;
    .switch-filter-label {
      font-size: 14px;
      display: inline-block;
      width: 80px;
      padding-left: 20px;
    }
    >>> .el-radio-button__inner {
      padding: 8px 20px;
    }
    >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #4573d0;
      border-color: #4573d0;
    }
  }
}
</style>
