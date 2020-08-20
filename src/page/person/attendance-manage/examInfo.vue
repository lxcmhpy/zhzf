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
                <el-select
                  v-model="searchForm.examYear"
                  placeholder="年份"
                  remote
                  @focus="getYear()"
                >
                  <el-option
                    v-for="value in getYearList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
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
          <el-table-column prop="name" label="姓名" align="center" min-width="140px"></el-table-column>
          <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
          <el-table-column prop="examTotalScore" label="考试总成绩" align="center" min-width="140px;"></el-table-column>
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
        ministerialNo: '',
        name: ''
      },
      tableData: [
        {
          name: "2020",
          ministerialNo: '12345678',
          examTotalScore: '100'
        },
      ],
      tableLoading: false,
      currentPage: 0,
      totalPage: 0,
      pageSize: 10
    };
  },
  components: {},
  created() {
    // 查询年份下拉
    this.getYear();
    // 查询考试信息列表
    this.getExamInfoList();
  },
  methods: {
    // 获取年份下拉选项
    getYear() {
      if (this.getYearList.length > 0) {
        return false;
      }
      this.$store.dispatch("getYearMoudle", "年份").then((res) => {
        if (res.code === 200) {
          this.getYearList = [];
          for (let i = res.data.minYear; i <= res.data.maxYear; i++) {
            this.getYearList.push({ id: i, name: i });
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    // 根据查询条件查询考试信息列表
    getExamInfoList() {
      let _this = this;
      let data = {
        year:'2020'
      }
       _this.$store.dispatch("getJxExamList", data).then(
        res => {
          this.tableLoading = false;
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );

         _this.$store.dispatch("getJxExamMessage", data).then(
        res => {
          this.tableLoading = false;
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
      console.log("查询考试信息列表");
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
    }
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
