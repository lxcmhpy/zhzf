<template>
  <!-- 考情信息详情 -->
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage">
      <p class="attendance-top-title">{{year}}年{{month}}月考勤详情</p>
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
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="searchForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo">
                <el-input v-model="searchForm.ministerialNo"></el-input>
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
              <el-form-item style="float: right;">
                <el-button type="primary" size="medium" @click="importAttendance">批量导入</el-button>
                <el-button type="info" size="medium" @click="deductManage">扣分管理</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tablePart">
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
          <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="personNo" label="执法证号" align="center"></el-table-column>
          <el-table-column prop="attendanceDays" label="应出勤天数" align="center" width="120px;"></el-table-column>
          <el-table-column
            prop="actualAttendanceDays"
            label="实际出勤天数"
            align="center"
            min-width="120px"
          ></el-table-column>
          <el-table-column prop="businessTripNum" label="出差" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="lateNum" label="迟到" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="absenteeismNum" label="旷工" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="workOverTime" label="平时加班" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="weekWorkOverTime" label="周末加班" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="holidaySeason" label="节假日加班" align="center" min-width="120px"></el-table-column>
          <el-table-column prop="leaveNum" label="事假" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="sickLeaveNum" label="病假" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="score" label="得分" align="center" min-width="60px"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editAttendanceInfo(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
          <div class="paginationBox">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              background
              :page-sizes="[10, 20, 30, 40]"
              layout="prev, pager, next,sizes,jumper"
              :total="totalPage"
            ></el-pagination>
          </div>
        </div>
    </div>
    <!-- 导入考勤 -->
    <ImportAttendance ref="ImportAttendanceRef" />
    <!-- 扣分管理 -->
    <DeductScore ref="DeductScoreRef" />
    <!-- 信息修改 -->
    <AttendanceEdit ref="AttendanceEditRef" />
  </div>
</template>
<script>
import ImportAttendance from "@/page/person/attendance-manage/components/importAttendance";
import DeductScore from "@/page/person/attendance-manage/components/deductScore";
import AttendanceEdit from "@/page/person/attendance-manage/components/attendanceEdit";
import { getAttendanceList } from "@/api/attendance";

export default {
  data() {
    return {
      searchForm: {
        personName: "",
        ministerialNo: "",
      },
      tableData: [],
      tableLoading: false,
      year: undefined,
      month: undefined,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
    };
  },
  components: { ImportAttendance, DeductScore, AttendanceEdit },
  created() {
    this.year = this.$route.params.year;
    this.month = this.$route.params.month;
    // 查询考勤列表
    this.getAttendanceList();
  },
  methods: {
    // 根据查询条件查询考情列表
    getAttendanceList() {
      console.log("查询考勤列表");
      this.tableLoading = true;
      const data ={ 
        year: this.year,
        month: this.month,
        personName: this.searchForm.personName,
        personNo: this.searchForm.ministerialNo,
        current: this.currentPage,
        size: this.pageSize 
      }
      getAttendanceList(data).then(
        (res) => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
          }
        },
        (err) => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAttendanceList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAttendanceList(val);
    },
    // 修改考情
    editAttendanceInfo(row) {
      console.log(row);
      this.$refs.AttendanceEditRef.showModal(row);
    },
    // 批量导入考勤
    importAttendance() {
      this.$refs.ImportAttendanceRef.showModal();
    },
    // 扣分管理
    deductManage() {
      this.$refs.DeductScoreRef.showModal();
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
.attendance-top-title {
  text-align: center;
  line-height: 52px;
  font-size: 22px;
  font-weight: bold;
}
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
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
</style>
