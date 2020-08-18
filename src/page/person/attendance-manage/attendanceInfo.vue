<template>
  <!-- 考情信息管理 -->
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage">
      <div class="handlePart">
        <el-form
          class="search-form"
          :inline="true"
          :model="searchForm"
          label-width="68px"
          ref="searchFormRef"
        >
          <div>
            <div class="item">
              <el-form-item label="考勤时间" prop="attendanceYear">
                <el-date-picker
                  v-model="searchForm.attendanceYear"
                  type="year"
                  placeholder="选择年"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="margin-top:1px; margin-left: 15px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getAttendanceList()"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetLog"
                ></el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tableWrap">
        <el-table
          :data="tableData"
          resizable
          stripe
          class="person-table"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%;"
        >
          <el-table-column prop="year" label="年" align="center"></el-table-column>
          <el-table-column prop="month" label="月" align="center"></el-table-column>
          <el-table-column prop="businessTripNumTotal" label="出差人数" align="center" width="120px;"></el-table-column>
          <el-table-column prop="businessTripNumRate" label="出差率" align="center" min-width="100px"></el-table-column>
          <el-table-column prop="attendanceDaysTotal" label="出勤总天数" align="center" min-width="140px"></el-table-column>
          <el-table-column prop="attendanceDaysRate" label="出勤率" align="center" min-width="100px"></el-table-column>
          <el-table-column prop="lateNumTotal" label="迟到人数" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="lateNumRate" label="迟到率" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="absenteeismNumTotal" label="旷工人数" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="absenteeismNumRate" label="旷工率" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getDetailInfo(scope.row)">
                <i title="查看详情" class="iconfont law-eye" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getAttendanceList } from "@/api/attendance";

export default {
  name: "attendanceInfo",
  data() {
    return {
      getYearList: [],
      searchForm: {
        attendanceYear: `${new Date().getFullYear()}`
      },
      tableData: [],
      tableLoading: false,
      pickerOptions: {
        disabledDate: (time) => {
          let currentYear = new Date().getFullYear();
          return time.getFullYear() > currentYear;
        }
      },
    };
  },
  components: {},
  created() {
    // 查询考勤列表
    this.getAttendanceList();
  },
  methods: {
    // 根据查询条件查询考情列表
    getAttendanceList() {
      console.log("查询考勤列表");
      this.tableLoading = true;
      getAttendanceList({ year: this.searchForm.attendanceYear }).then(
        res => {
          this.tableLoading = false;
          if(res.code === 200){
            this.tableData = res.data;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: 'error', message: err.msg || '' });
        }
      )

    },
    // 查看考勤详情
    getDetailInfo(row) {
      console.log(row);
      this.$router.push({
        name: "personAttendanceDetail",
      });
    },
    // 重置查询
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getAttendanceList();
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
>>> .el-select {
  margin-right: 0;
}
>>>.el-input__icon{
  line-height: 32px;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
.tableWrap{
  flex-shrink: 1;
  height: calc(100% - 70px) !important;
}
</style>
