<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart">
            <el-form :inline="true" :model="searchForm" ref="searchFormRef" class="search-form">
              <el-row>
                <el-form-item label="检查门类" prop="checkCategory">
                  <el-select v-model="searchForm.checkCategory" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="路巡" value="1"></el-option>
                    <el-option label="网巡" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="检查类型" prop="checkType">
                  <el-select v-model="searchForm.checkType" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="路巡" value="1"></el-option>
                    <el-option label="网巡" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否立案" prop="registerCase">
                  <el-select v-model="searchForm.registerCase" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单位名称" prop="companyName">
                  <el-input v-model="searchForm.companyName" placeholder></el-input>
                </el-form-item>
                <el-form-item style="line-height:44px;">
                  <el-button
                    size="medium"
                    class="commonBtn searchBtn"
                    title="搜索"
                    icon="iconfont law-sousuo"
                    @click="searchRecordList();"
                  ></el-button>
                  <el-button
                    size="medium"
                    class="commonBtn searchBtn"
                    title="重置"
                    icon="iconfont law-zhongzhi"
                    @click="resetSearch"
                  ></el-button>
                  <el-button
                    size="medium"
                    class="commonBtn toogleBtn"
                    :title="isShow? '点击收缩':'点击展开'"
                    :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                    @click="isShow = !isShow"
                  ></el-button>
                </el-form-item>
              </el-row>
              <el-row v-if="isShow">
                <el-form-item label="执法人员" prop="lawPerson">
                  <el-input v-model="searchForm.lawPerson" placeholder></el-input>
                </el-form-item>
                <el-form-item label="巡查时间" prop="checkTime">
                  <el-date-picker
                    v-model="searchForm.checkTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="tableHandle">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addRecordFun">新增</el-button>
        <el-button type="info" size="medium">
          <i class="icon-daochu"></i>导出
        </el-button>
        <el-button plain icon="el-icon-delete-solid" size="medium" @click="deleteRecordlFun">删除</el-button>
      </div>
      <div class="tablePart">
        <el-table
          ref="journalTableRef"
          :data="tableData"
          resizable
          stripe
          class="person-table"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%;"
          @selection-change="selectJournal"
        >
          <el-table-column type="selection" align="center" fixed="left"></el-table-column>
          <el-table-column prop="journalNo" label="记录编号" align="left" width="100px" fixed="left"></el-table-column>
          <el-table-column prop="checkType" label="检查类型" align="left" width="100px"></el-table-column>
          <el-table-column prop="checkCategory" label="检查门类" align="left" width="100px"></el-table-column>
          <el-table-column prop="inspectionTime" label="巡查时间" align="center" width="140px"></el-table-column>
          <el-table-column prop="companyName" label="单位名称" align="center" min-width="200px"></el-table-column>
          <el-table-column prop="routeName" label="路段名称" align="center" min-width="180px"></el-table-column>
          <el-table-column prop="routeInfo" label="路段信息" align="center" min-width="220px"></el-table-column>
          <el-table-column prop="routeSituation" label="路段情况" align="center" width="100px">
            <template slot-scope="scope">
              <span
                v-if="scope.row.routeSituation === '正常'"
                style="color: #05C051;"
              >{{scope.row.routeSituation}}</span>
              <span
                v-else-if="scope.row.routeSituation === '异常'"
                style="color: #E84241;"
              >{{scope.row.routeSituation}}</span>
              <span v-else>{{scope.row.routeSituation}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lawPerson" label="执法人员" align="center" min-width="160px"></el-table-column>
          <el-table-column prop="isFilingCase" label="是否立案" align="center" width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.isFilingCase === '0'">否</span>
              <el-button v-else type="text">查看案件</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="opt" label="操作" align="center" width="160px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="checkConcat(scope.row)">新增</el-button>
              <el-button type="text" @click="editJournalInfo(scope.row)">修改</el-button>
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
  data() {
    return {
      isShow: false,
      searchForm: {},
      tableData: [
        {
          journalNo: "111111111",
          checkType: "安全检查",
          checkCategory: "公路巡查",
          inspectionTime: "2020-03-15 09:30 2020-03-15 16:49",
          companyName: "北京市交通运输管理局",
          routeName: "S210 红砖厂路",
          routeInfo: "K100+50m至K100+55m",
          routeSituation: "正常",
          lawPerson: "付明超;刘传敏;李小宇",
          isFilingCase: "0",
        },
        {
          journalNo: "22222222",
          checkType: "日常巡查",
          checkCategory: "服务区巡查",
          inspectionTime: "2020-03-15 09:30 2020-03-15 16:49",
          companyName: "北京市交通运输管理局",
          routeName: "S120  樱花路",
          routeInfo: "K130+105m至K130+115m",
          routeSituation: "异常",
          lawPerson: "付明超；张三",
          isFilingCase: "1",
        },
      ],
      selectList: [],
      tableLoading: false,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
    };
  },
  components: {  },
  created() {},
  methods: {
    // 获取日志列表
    getRecordList() {
      const queryData = Object.assign(this.searchForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      console.log(queryData);
    },
    // 新增
    addRecordFun() {
      this.$router.push({
        name: 'record_detail',
        params: { page: 'add' }
      });
    },
    // 删除
    deleteRecordlFun() {
      if (this.selectList.length === 0) {
        this.$message({ type: "warning", message: "请选择要删除的日志" });
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm",
        })
          .then(() => {
            console.log("删除成功");
          })
          .catch(() => {});
      }
    },
    // 交接班
    handoverFun() {
      this.$router.push({
        name: "journal_handover",
        params: { page: "handover" },
      });
    },
    // 查看交接班
    checkConcat(row) {
      this.$router.push({
        name: "journal_handover",
        params: { page: "handover" },
      });
    },
    // 修改日志
    editJournalInfo(row) {
      console.log(row);
    },
    searchRecordList() {
      this.currentPage = 1;
      this.getRecordList();
    },
    // 重置日志查询
    resetSearch() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getRecordList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRecordList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRecordList();
    },
    // 获取选中的日志
    selectJournal(val) {
      this.selectList = val;
    },
  },
};
</script>

<style  lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
  >>> .el-date-editor,
  >>> .el-input__icon {
    line-height: 32px;
  }
  >>> .el-button.commonBtn.el-button--medium {
    padding: 6px 14px;
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
.tableHandle {
  margin-bottom: 10px;
  .icon-daochu {
    display: block;
    width: 14px;
    height: 14px;
    background: url("../../../../static/images/img/personInfo/icon_daochu.svg")
      no-repeat;
    float: left;
    margin-right: 5px;
  }
}
</style>
