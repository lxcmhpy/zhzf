<template>
  <!-- 考试信息管理 -->
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
              <el-form-item label="考试年份" prop="examYear">
                <el-date-picker
                  v-model="searchForm.examYear"
                  type="year"
                  placeholder="选择年"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="searchForm.name"></el-input>
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
                  @click="currentPage = 1 ;getExamInfoList()"
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
          <el-table-column prop="personName" label="姓名" align="center" min-width="140px"></el-table-column>
          <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
          <template v-for="(header, index) in tableHeader">
            <el-table-column
              :key="header.examId"
              :label="header.examName"
              align="center"
              min-width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.examInfo[index] }}</span>  
              </template>  
            </el-table-column>
          </template>
          <el-table-column prop="examTotalScore" label="考试总成绩" align="center" min-width="140px"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getDetailInfo(scope.row)">
                <i class="iconfont law-eye" />
              </el-button>
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
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "trainInfo",
  data() {
    return {
      getYearList: [],
      searchForm: {
        examYear: "",
        ministerialNo: "",
        name: "",
      },
      pickerOptions: {
        disabledDate: (time) => {
          let currentYear = new Date().getFullYear();
          return time.getFullYear() > currentYear;
        },
      },
      tableHeader: [],
      tableData: [],
      tableLoading: false,
      currentPage: 0,
      totalPage: 0,
      pageSize: 10,
    };
  },
  components: {},
  created() {
    // 查询考试信息列表
    this.getExamInfoList();
  },
  methods: {
    // 根据查询条件查询考试信息列表
    getExamInfoList() {
      this.tableLoading = true;
      let data = Object.assign(this.searchForm, { current: this.currentPage, size: this.pageSize });
      this.$store.dispatch("getJxExamList", data).then(
        (res) => {
          this.tableLoading = false;
          this.tableHeader = res.data;
          this.getTableList(data);
        },
        (err) => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 获取人员考试列表
    getTableList(data){
      this.$store.dispatch("getJxExamMesage", data).then(
        (res) => {
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
          console.log(res);
        },
        (err) => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 查看考勤详情
    getDetailInfo(row) {
      console.log(row);
    },
    // 重置查询
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getExamInfoList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExamInfoList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExamInfoList();
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
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
</style>
