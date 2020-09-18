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
                <el-form-item label="培训名称" prop="trainName">
                  <el-input v-model="batchManageForm.trainName"></el-input>
                </el-form-item>
                <el-form-item label="培训类型" prop="trainType">
                  <el-select
                    v-model="batchManageForm.trainType"
                    remote
                    @focus="getDictInfo('人员信息-培训类型','trainTypeInfo')"
                  >
                    <el-option
                      v-for="value in trainTypeInfo"
                      :key="value.id"
                      :label="value.name"
                      :value="value.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="beginTime">
                  <el-date-picker
                    v-model="batchManageForm.beginTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择开始时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                  <el-date-picker
                    v-model="batchManageForm.endTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择结束时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getTrainBatchList();"
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
                    @click="editTrained('1')"
                  >新增培训</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-delete-solid"
                    size="medium"
                    @click="deleteExamBatchInfo"
                  >删除培训</el-button>
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
            @selection-change="selectedListChange"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="batchId" label>
              <template slot="header">
                <div class="header-total">全部培训（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <p>
                  <span class="exam-name">{{scope.row.trainName}}</span>
                </p>
                <p class="exam-info">
                  <span class="m-r-30">培训类型：{{scope.row.trainTypeName}}</span>
                  <span class="m-r-30">培训总分：{{scope.row.trainCredit}}</span>
                  <span class="m-r-30">合格分数：{{scope.row.qualifiedCredits}}</span>
                  <span class="m-r-30">发起机构：{{scope.row.trainOName }}</span>
                </p>
                <p>
                  <el-button
                    v-if="scope.row.isConfigOver !== '1'"
                    type="text"
                    @click="editTrained('2', scope.row)"
                  >修改</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver !== '1'"
                    type="text"
                    @click="handleTrained('addCourseRef', scope.row)"
                  >课程选择</el-button>
                  <el-button
                    type="text"
                    @click="handleTrained('joinTrainedPersonRef', scope.row)"
                  >参训人员</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver !== '1'"
                    type="text"
                    @click="handleTrained('selectOrganizationRef', scope.row)"
                  >培训机构</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver !== '1'"
                    type="text"
                    @click="disposeInfo(scope.row)"
                  >配置完成</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver === '1'"
                    type="text"
                    @click="handleTrained('addCourseRef', scope.row)"
                  >查看课程</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver === '1'"
                    type="text"
                    @click="handleTrained('trainedDetailRef', scope.row)"
                  >培训详情</el-button>
                  <el-button
                    v-if="scope.row.isConfigOver === '1'"
                    type="text"
                    @click="getSendResultlInfo(scope.row)"
                  >报送成绩</el-button>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="beginTime"
              width="240px"
              class-name="vertical-top"
            >
              <template slot-scope="scope">
                <span>
                  <i class="el-icon-time" size="small"></i>
                  <span style="font-color:grey">{{scope.row.beginTime}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="endTime" width="240px" class-name="vertical-top">
              <template slot-scope="scope">
                <span>
                  <i class="el-icon-time" size="small"></i>
                  <span style="font-color:grey">{{scope.row.endTime}}</span>
                </span>
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
    <!-- 新增|修改培训 -->
    <addTrained ref="addTrainedRef" @getTrainBatchList="getTrainBatchList" />
    <!-- 课程选择 -->
    <addCourse ref="addCourseRef" @getbatchManage="getTrainBatchList" />
    <!-- 参训人员 -->
    <joinTrainedPerson ref="joinTrainedPersonRef" />
    <!-- 选择机构 -->
    <selectOrganization ref="selectOrganizationRef" @getbatchManage="getTrainBatchList" />
    <!-- 培训详情 -->
    <trainedDetail ref="trainedDetailRef" />
  </div>
</template>
<script>
import addTrained from "./components/addTrained";
import addCourse from "./components/addCourse";
import joinTrainedPerson from "./components/joinTrainedPerson";
import selectOrganization from "./components/selectOrganization";
import trainedDetail from "./components/trainedDetail";
import {
  getTrainedBatchList,
  deleteTrainedBatch,
  disposeOverBatch,
  setTrainResult
} from "@/api/trained";

export default {
  data() {
    return {
      tableData: [],
      trainTypeInfo: [], // 培训类型列表
      batchManageForm: {
        trainName: "", // 培训名称
        trainType: "", // 培训类型
        beginTime: "", // 开始时间
        endTime: "", // 结束时间
      },
      selectTrainIdList: [], //选中培训id
      selectList: [], // 选中培训信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false,
    };
  },
  components: {
    addTrained,
    addCourse,
    joinTrainedPerson,
    selectOrganization,
    trainedDetail,
  },
  created() {
    this.getTrainBatchList();
  },
  methods: {
    // 点击下拉框的时查询培训类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then((res) => {
        if (res.code === 200) {
          if (codeName === "trainTypeInfo") {
            this.trainTypeInfo = res.data;
            this.trainTypeInfo.unshift({ id: "", name: "全部" });
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    // 新增|修改培训
    editTrained(type, row) {
      this.$refs.addTrainedRef.showModal(type, row);
    },
    // 培训操作
    handleTrained(ref, row) {
      this.$refs[ref].showModal(row);
    },
    // 报送成绩
    getSendResultlInfo(row) {
      let _this = this;
      let data = {
        trainName: row.trainName,
        trainType: row.trainType,
        trainId: row.trainId,
        beginTime: row.beginTime,
        endTime: row.endTime,
      };
      _this
        .$confirm("确认报送成绩吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm",
        })
        .then(() => {
          setTrainResult(data).then(
            (res) => {
              console.info("aaa" + JSON.stringify(res));
              if (res.code === 200) {
                this.$message({ type: "success", message: "报送成绩已完成!" });
                //重新加载页面数据
                this.getTrainBatchList();
              }
            },
            (err) => {
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    // 配置完成
    disposeInfo(row) {
      this.$confirm("确认配置完成吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在配置",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });
          disposeOverBatch({ trainId: row.trainId }).then(
            (res) => {
              loading.close();
              if (res.code === 200) {
                this.$message({ type: "success", message: "配置已完成!" });
                //重新加载页面数据
                this.getTrainBatchList();
              }
            },
            (err) => {
              loading.close();
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    // 获取培训批次列表
    getTrainBatchList() {
      this.tableLoading = true;
      let data = {
        trainName: this.batchManageForm.trainName,
        trainType: this.batchManageForm.trainType,
        beginTime: this.batchManageForm.beginTime,
        endTime: this.batchManageForm.endTime,
        current: this.currentPage,
        size: this.pageSize,
      };
      getTrainedBatchList(data).then(
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
    // 选择操作的批次
    selectedListChange(val) {
      this.selectTrainIdList = val.map((item) => item.trainId);
    },
    // 删除培训
    deleteExamBatchInfo() {
      if (
        this.selectTrainIdList == undefined ||
        this.selectTrainIdList.length == 0
      ) {
        this.$message({ type: "warning", message: "请选择一条考试信息" });
      } else if (this.selectTrainIdList.length > 1) {
        this.$message({ type: "warning", message: "只能选择一条考试信息" });
      } else {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm",
        })
          .then(() => {
            deleteTrainedBatch(this.selectTrainIdList[0]).then(
              (res) => {
                if (res.code === 200) {
                  this.$message({ type: "success", message: "删除成功!" });
                  //重新加载页面数据
                  this.getTrainBatchList();
                }
              },
              (err) => {
                this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});
      }
    },
    // 筛选项重置
    resetLog() {
      this.$refs["batchManageFormRef"].resetFields();
      this.currentPage = 1;
      this.getTrainBatchList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTrainBatchList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrainBatchList();
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.batch-manage {
  .tablePart {
    height: calc(100% - 120px) !important;
    .table-wrap {
      height: 82%;
    }
  }
  >>> .el-icon-date {
    line-height: 32px;
  }
  .batch-table {
    >>> .el-table__row {
      .el-table-column--selection {
        vertical-align: top;
      }
      td {
        padding: 15px 0;
        &.vertical-top {
          vertical-align: top;
        }
        .exam-status {
          display: inline-block;
          font-size: 15px;
          padding: 0px 6px;
          color: #000;
        }
        .exam-name {
          font-size: 18px;
          font-weight: 600;
          color: rgba(32, 35, 43, 1);
        }
        .exam-info {
          margin: 14px 0;
          color: #7b7b7b;
        }
        .cell, .el-checkbox{
          display: block;
        }
      }
    }
  }
  .m-r-30 {
    margin-right: 30px;
  }
}
</style>
