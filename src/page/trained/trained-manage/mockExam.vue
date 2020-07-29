<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage batch-manage">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="batchManageForm"
          label-width="80px"
          ref="batchManageFormRef"
        >
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="考试名称" prop="teName">
                  <el-input v-model="batchManageForm.teName"  placeholder="考试名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="开始时间" prop="examBegin">
                  <el-date-picker
                    v-model="batchManageForm.examBegin"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择开始时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="examEnd">
                  <el-date-picker
                    v-model="batchManageForm.examEnd"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择结束时间"
                    clearable
                  ></el-date-picker>
                </el-form-item> -->
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getMockExam();"
                  ></el-button>
                  <el-button
                    title="重置"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-zhongzhi"
                    @click="resetLog"
                  ></el-button>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="medium"
                    @click="addMockExamInfo('1')"
                  >新增考试</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-delete-solid"
                    size="medium"
                    @click="deleteExamBatchInfo"
                  >删除考试</el-button>
                </el-form-item>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tablePart">
        <div class="table-wrap">
          <el-table
            :data="tableData"
            resizable
            stripe
            style="width: 100%;height:100%;"
            class="batch-table"
            @selection-change="selectionChange"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label>
              <template slot="header">
                <div class="header-total">全部考试（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <p>
                  <span class="exam-name">{{scope.row.teName}}</span>
                </p>
                <p class="exam-info">
                  <span class="m-r-30">考试类型：模拟考试</span>
                  <span class="m-r-30">考试人数：{{scope.row.teNum}}</span>
                  <span class="m-r-30">发布时间：{{scope.row.modifyTime}}</span>
                  <span class="m-r-30">发起机构：{{scope.row.trainExamName}}</span>
                </p>
                <div>
                  <el-button v-if="scope.row.isConfig !== '1'" type="text" @click="addMockExamInfo('2', scope.row)">修改</el-button>
                  <el-button v-if="scope.row.isConfig !== '1'" type="text" @click="selectPage(scope.row)">试卷选择</el-button>
                  <el-button v-if="scope.row.isConfig === '1'" type="text" @click="pageView(scope.row)">查看试卷</el-button>
                  <el-button type="text" @click="selectPerson(scope.row)">参考人员</el-button>
                  <el-button v-if="scope.row.isConfig !== '1'" type="text" @click="disposeInfo(scope.row)">配置完成</el-button>
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
            :page-sizes="[10, 20, 30, 40, 50]"
            layout="prev, pager, next,sizes,jumper"
            :total="totalPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增考试 -->
    <addExamBatchComp ref="addExamBatchCompRef" @getMockExam="getMockExam"></addExamBatchComp>
    <!-- 选择试卷 -->
    <selectExamPageComp ref="selectExamPageComp" @getMockExam="getMockExam" />
    <!-- 参训人员 -->
    <joinMockExamPerson ref="joinMockExamPersonRef" />
  </div>
</template>
<script>
import addExamBatchComp from './components/addExam';
import selectExamPageComp from './components/selectExamPage';
import joinMockExamPerson from './components/joinMockExamPerson';
import { getMockExamList, deleteMockExam, disposeOverExam } from '@/api/trained';

export default {
  data() {
    return {
      tableData: [],
      batchManageForm: {
        teName: "", // 考试名称
        teType: "", // 考试类型
        examBegin: "", // 开始时间
        examEnd: "" // 结束时间
      },
      selectedExamIdList: [], //选中考试id
      selectList: [], // 选中考试信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false
    };
  },
  components: {
    addExamBatchComp, selectExamPageComp, joinMockExamPerson
  },
  created(){
    this.getMockExam();
  },
  methods: {
    // 配置完成
    disposeInfo(row) {
      this.$confirm("确认配置完成吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在配置",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          disposeOverExam({ teId: row.teId }).then(
            res => {
              loading.close();
              if (res.code === 200) {
                this.$message({ type: "success", message: "配置已完成!" });
                //重新加载页面数据
                this.getMockExam();
              }
            },
            err => {
              loading.close();
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    //根据查询条件查询人员基本信息
    getMockExam() {
      this.tableLoading = true;
      let data = {
        teName: this.batchManageForm.teName,
        teType: this.batchManageForm.teType,
        current: this.currentPage,
        size: this.pageSize
      };
      getMockExamList(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
          this.tableLoading = false;
          const handleExamId = sessionStorage.getItem('SelectedPageTeid');
          if(handleExamId){
            const handleExam = this.tableData.find(item => item.teId === handleExamId);
            if(handleExam){
              this.$refs.selectExamPageComp.showModal(handleExamId);
              sessionStorage.removeItem('SelectedPageTeid');
            }
          }
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    // 新增|修改考试
    addMockExamInfo(type, row) {
      this.$refs.addExamBatchCompRef.showModal(type, row);
    },
    // 删除考试
    deleteExamBatchInfo() {
      if (
        this.selectedExamIdList == undefined ||
        this.selectedExamIdList.length == 0
      ) {
        this.$message({ type: "warning", message: "请选择一条考试信息" });
      } else if (this.selectedExamIdList.length > 1) {
        this.$message({ type: "warning", message: "只能选择一条考试信息" });
      } else {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          deleteMockExam(this.selectedExamIdList[0]).then(
            res => {
              if (res.code === 200) {
                this.$message({ type: "success", message: "删除成功!" });
                //重新加载页面数据
                this.getMockExam();
              }
            },
            err => {
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
      }
    },
    // 试卷选择
    selectPage(row){
      this.$refs.selectExamPageComp.showModal(row.teId);
    },
    // 查看试卷
    pageView(row){
      this.$router.replace({
        name: "viewApplayDetail",
        params: {
          pageId: row.pageId,  
          name: row.pageName,
          type: "view"
        }
      });
    },
    // 选择操作的考试
    selectionChange(val){
      this.selectedExamIdList = val.map(item => item.teId);
    },
    // 参考人员
    selectPerson(row){
      const queryData = { teId: row.teId, isConfig: row.isConfig }
      this.$refs.joinMockExamPersonRef.showModal(queryData);
    },
    // 筛选项重置
    resetLog() {
      this.$refs["batchManageFormRef"].resetFields();
      this.currentPage = 1;
      this.getMockExam();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getMockExam();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMockExam();
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.batch-manage{
  .tablePart{
    height: calc(100% - 120px) !important;
    .table-wrap{
      height: 82%;
    }
  }
  >>>.el-icon-date{
    line-height: 32px;
  }
  .batch-table{
    >>>.el-table__row{
      .el-table-column--selection{
        vertical-align: top;
      }
      td{
        padding: 15px 0;
        &.vertical-top{
          vertical-align: top;
        }
        .exam-status{
          display: inline-block;
          font-size: 15px;
          padding: 0px 6px;
          color: #000;
        }
        .exam-name{
          font-size:18px;
          font-weight: 600;
          color:rgba(32,35,43,1);
        }
        .exam-info{
          margin: 14px 0;
          color: #7B7B7B;
        }
      }
    }
  }
  .m-r-30{
    margin-right: 30px;
  }
}
</style>
