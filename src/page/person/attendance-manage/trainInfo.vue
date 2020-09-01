<template>
  <!-- 培训信息管理 -->
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
              <el-form-item label="培训年份" prop="year">
                <el-date-picker
                  v-model="searchForm.year"
                  type="year"
                  placeholder="选择年"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="searchForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="branchNo">
                <el-input v-model="searchForm.branchNo"></el-input>
              </el-form-item>
              <el-form-item style="margin-top:1px; margin-left: 15px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getTrainInfoList()"
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
          <el-table-column prop="branchNo" label="执法证号" align="center"></el-table-column>
          <!-- <el-table-column prop="totalExamScore" label="培训总成绩" align="center" min-width="140px;"></el-table-column> -->
         <template v-for="item in trainList">
            <el-table-column :key="item.trainId" :prop="item.trainId" :label="item.trainName" align="center" min-width="140px;">
              <template slot-scope="scope">
                <div>{{ scope.row[item.trainId] }}</div>
              </template>
            </el-table-column>
          </template>
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
        year:"",
        branchNo: '',
        personName: ''
      },
      tableData: [
       
      ],
      tableLoading: false,
      trainList:[],
      currentPage: 0,
      totalPage: 0,
      pageSize: 10,
      pickerOptions: {
        disabledDate: (time) => {
          let currentYear = new Date().getFullYear();
          return time.getFullYear() > currentYear;
        },
      }
    };
  },
  components: {},
  created() {
    let myDate = new Date();
    this.searchForm.year = `${myDate.getFullYear()}`;
    // 查询考勤列表
    this.getTrainInfoList();
  },
  methods: {
    // 根据查询条件查询考情列表
    getTrainInfoList() {
       let _this = this;
      let data = {
        personName:_this.searchForm.personName,
        year:_this.searchForm.year,
        branchNo:_this.searchForm.branchNo,
        current: _this.currentPage,
        size: _this.pageSize
      };
       _this.$store.dispatch("getJxTrainList", data).then(
        res => {
          this.tableLoading = false;
          _this.trainList = res.data;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );

         _this.$store.dispatch("getJxTrainMessage", data).then(
        res => {
          this.tableLoading = false;
          
         // _this.tableData = res.data.records;
           this.setExamScore(res.data.records);
          _this.totalPage = res.data.total;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
      console.log("查询考试信息列表");
      console.log("查询考勤列表");
    },
     // 处理考试成绩
    setExamScore(data){
      if(data && data.length){
        data.forEach(item => {
          if(item.trainInfo && item.trainInfo.length){
            item.trainInfo.forEach(train => {
              item[train.oldTrainId] = train.trainResult;
            })
          }
        });
        console.log(data);
        this.tableData = data;
      }
    },
    // 查看考勤详情
    getDetailInfo(row) {
      console.log(row);
    },
    // 重置查询
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getTrainInfoList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTrainInfoList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrainInfoList();
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
>>> .el-input__icon {
  line-height: 32px;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
</style>
