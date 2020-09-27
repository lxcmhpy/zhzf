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
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in checkCategoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="检查类型" prop="checkType">
                  <el-select v-model="searchForm.checkType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in checkTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否立案" prop="isCase">
                  <el-select v-model="searchForm.isCase" placeholder="请选择">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
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
                <el-form-item label="执法人员" prop="personName">
                  <el-input v-model="searchForm.personName" placeholder></el-input>
                </el-form-item>
                <el-form-item label="巡查时间" prop="checkTime">
                  <el-date-picker
                    v-model="searchForm.checkTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="checkTimeChange"
                  ></el-date-picker>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="tableHandle">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addRecordFun">新增</el-button>
        <el-button type="info" size="medium" @click="exportRecordFun">
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
          <el-table-column prop="recordNum" label="记录编号" align="left" width="100px" fixed="left"></el-table-column>
          <el-table-column prop="checkTypeName" label="检查类型" align="left" width="100px"></el-table-column>
          <el-table-column prop="checkCategoryName" label="检查门类" align="left" width="100px"></el-table-column>
          <el-table-column prop="inspectionTime" label="巡查时间" align="center" width="220px">
            <template slot-scope="scope" class="person-table-onerow">
              <div >{{scope.row.checkStartTime}}</div>
              <div >{{scope.row.checkEndTime}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="oname" label="单位名称" align="center" min-width="200px"></el-table-column>
          <el-table-column prop="roadName" label="路段名称" align="center" min-width="180px"></el-table-column>
          <el-table-column prop="routeInfo" label="路段信息" align="center" min-width="220px">
            <template slot-scope="scope">
              <div >K{{scope.row.startKilometer}}+{{scope.row.startMeter}}m</div>
              <div >K{{scope.row.endKilometer}}+{{scope.row.endMeter}}m</div>
            </template>
          </el-table-column>
          <el-table-column prop="roadCondition" label="路段情况" align="center" width="100px">
            <template slot-scope="scope">
              <span
                v-if="scope.row.roadCondition === '1'"
                style="color: #05C051;"
              >正常</span>
              <span
                v-else-if="scope.row.roadCondition === '2'"
                style="color: #E84241;"
              >异常</span>
              <span v-else>{{scope.row.roadCondition}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="personNames" label="执法人员" align="center" min-width="160px"></el-table-column>
          <el-table-column prop="isFilingCase" label="是否立案" align="center" width="100px">
            <template slot-scope="scope">
              <span v-if="!scope.row.isCase">否</span>
              <el-button v-else type="text" @click="recordCaseClick(scope.row.recordId)">查看案件</el-button>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <RecordCaseModel ref="RecordCaseModelRef" />
  </div>
</template>
<script>

import RecordCaseModel from '@/page/inspection/dutyManage/components/recordCaseModel';
import { downLoadFile } from "@/api/joinExam";
import { getCheRecordPageListApi, deleteCheRecordByIdsApi, exportCheRecordApi } from '@/api/supervision';
import { getDictListDetailByNameApi } from '@/api/system';

export default {
  data() {
    return {
      isShow: false,
      searchForm: {},
      tableData: [],
      selectList: [],
      tableLoading: false,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      checkCategoryList: [],//检查门类select
      checkTypeList: []//检查类型select
    };
  },
  components: { RecordCaseModel },
  created() {
    this.getRecordList();
    this.initCheckDictData();
  },
  methods: {
    //获取巡查检查门类，检查类型
    async initCheckDictData() {
      const checkCategoryData = await getDictListDetailByNameApi('巡查-检查门类');
      const checkTypeData = await getDictListDetailByNameApi('巡查-检查类型');
      this.checkCategoryList = checkCategoryData.data;
      this.checkTypeList = checkTypeData.data;
    },
    // 获取记录列表
    getRecordList() {
      const queryData = Object.assign(this.searchForm, {
        current: this.currentPage,
        size: this.pageSize,
      });
      const params = JSON.parse(JSON.stringify(queryData));
      params.checkTime = "";
      getCheRecordPageListApi(params).then(
        (res) => {
          if(res.code == 200){
            this.tableData = res.data.records;
            this.total = res.data.total;
          }else{
            this.$message({
              type: "warning",
              message: res
            });
          }
        },
        (err) => {}
      );
    },
    // 新增
    addRecordFun() {
      this.$router.push({
        name: 'record_detail',
        params: { page: 'add', checkCategoryList: this.checkCategoryList, checkTypeList: this.checkTypeList }
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
            const ids = this.selectList.map(s => s.recordId);
            deleteCheRecordByIdsApi({ids}).then(
              res => {
                if(res.code == 200){ 
                  this.$message({
                    type: "success",
                    message: "删除成功！"
                  });
                  this.searchRecordList();
                }else{
                  this.$message({
                    type: "warning",
                    message: res
                  });
                }
              },
              err => {}
            )
            console.log("删除成功",selectIds);
          })
          .catch(() => {});
      }
    },
    //导出excel
    exportRecordFun() {
      const ids = this.selectList.map(s => s.recordId);
      exportCheRecordApi(ids).then(
        res => {
          downLoadFile(res.data, res.fileName);
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
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
      this.$router.push({
        name: 'record_detail',
        params: { page: 'edit', checkCategoryList: this.checkCategoryList, checkTypeList: this.checkTypeList, cheRecord: row }
      });

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
    checkTimeChange(){
      this.searchForm.checkStartTime = this.searchForm.checkTime[0];
      this.searchForm.checkEndTime = this.searchForm.checkTime[1]
    },
    //查看案件点击
    recordCaseClick(recordId) {
      this.$refs.RecordCaseModelRef.showModal(recordId);
    }
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
  &-onerow {
    float: left;
    >div {
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
  }
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
