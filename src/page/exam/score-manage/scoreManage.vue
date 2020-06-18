<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage batch-manage">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="scoreManageForm"
          label-width="80px"
          ref="scoreManageFormRef"
        >
          <div>
            <div class="item">
                <el-form-item label="姓名" prop="scorerName">
                  <el-input v-model="scoreManageForm.scorerName" placeholder="评分人姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="scorerIdno">
                  <el-input v-model="scoreManageForm.scorerIdno" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="所属单位" prop="scorerOrg">
                  <el-input v-model="scoreManageForm.scorerOrg" placeholder="所属单位"></el-input>
                </el-form-item>
                 <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1;getExamBatchList();"
                  ></el-button>
                  <el-button
                    title="重置"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-zhongzhi"
                    @click="resetLog"
                  ></el-button>
                  <el-button
                  size="medium"
                  class="commonBtn toogleBtn"
                  :title="isShow? '点击收缩':'点击展开'"
                  :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                  @click="isShow = !isShow"
                ></el-button>
                </el-form-item>
             </div>    
             <div class="item" v-show="isShow">
                <el-form-item label="省份" prop="scorerPro">
                  <el-input v-model="scoreManageForm.scorerPro" placeholder="省份"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="scorerPhone">
                  <el-input v-model="scoreManageForm.scorerPhone" placeholder="联系方式"></el-input>
                </el-form-item>
              </div> 
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="medium"
                    @click="addExamBatchInfo('','0')"
                  >新增评分人</el-button>
                  <!-- <el-button
                    style="background-color:#4aafa7;color:white"
                    icon="el-icon-delete-solid"
                    size="medium"
                    @click="deleteExamBatchInfo"
                  >删除评分人</el-button>-->
                </el-form-item>
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
            @selection-change="selectUser"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <!-- <el-table-column type="selection" align="center"></el-table-column> -->
            <el-table-column prop="scorerName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="scorerIdno" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="scorerOrg" label="所属单位" align="center"></el-table-column>
            <el-table-column prop="scorerPro" label="省份" align="center"></el-table-column>
            <el-table-column prop="scorerPhone" label="联系电话" align="center"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="addExamBatchInfo(scope.row,'1')">修改</el-button>
                <el-button type="text" @click="deleteScore(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-box">
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
    <addScoreComp ref="addScoreCompRef" @getExamBatchListComp="getExamBatchList"></addScoreComp>
  </div>
</template>
<script>
import addScoreComp from "./addScore";
import { mixinPerson } from "@/common/js/personComm";

export default {
  mixins: [mixinPerson],
  data() {
    return {
      tableData: [],
      examTypeInfo: [], //考试类型列表
      scoreManageForm: {
        scorerName: "", //
        scorerIdNo: "", //
        scorerOrg: "", //
        scorerPro: "", //
        scorerPhone: ""
      },
      isShow: false,
      selectUserIdList: [], //选中考试id
      selectList: [], //选中考试信息
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      // props: {
      //   label: "label",
      //   value: "id"
      // },
      tableLoading: false
    };
  },
  components: {
    addScoreComp
  },
  methods: {
    deleteScore(row) {
      let _this = this;
      _this
        .$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          _this.$store.dispatch("deleteExamScorerById", row.scorerId).then(
            res => {
              if (res.code === 200) {
                _this.$message({ type: "success", message: "删除成功!" });
                //重新加载页面数据
                _this.getExamBatchList();
              }
            },
            err => {
              _this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    updateScore() {},
    //新增评分人
    addExamBatchInfo(row, type) {
      this.$refs.addScoreCompRef.showModal(row, type);
    },

    //根据查询条件查询人员基本信息
    getExamBatchList() {
      let _this = this;
      //_this.tableLoading = true;
      let data = {
        scorerName: _this.scoreManageForm.scorerName,
        scorerIdno: _this.scoreManageForm.scorerIdno,
        scorerOrg: _this.scoreManageForm.scorerOrg,
        scorerPro: _this.scoreManageForm.scorerPro,
        scorerPhone: _this.scoreManageForm.scorerPhone,
        current: _this.currentPage,
        size: _this.pageSize
      };
       _this.getPageList("getExamScorerList", data);
    },
    //删除考试
    deleteExamBatchInfo() {
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({
          type: "warning",
          message: "请选择一条考试信息"
        });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message({
          type: "warning",
          message: "只能选择一条考试信息"
        });
      } else {
        let examId = _this.selectUserIdList[0];
        let data = {
          examId: examId
        };
        _this
          .$confirm("确认删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            iconClass: "el-icon-question",
            customClass: "custom-confirm"
          })
          .then(() => {
            _this.$store.dispatch("deleteExamBantch", data).then(
              res => {
                if (res.code === 200) {
                  _this.$message({ type: "success", message: "删除成功!" });
                  //重新加载页面数据
                  _this.getExamBatchList();
                }
              },
              err => {
                _this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});
      }
    },
    // 日志重置
    resetLog() {
      this.$refs["scoreManageFormRef"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExamBatchList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExamBatchList();
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectList = val;
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.examId);
      });
    }
  },
  created() {
    this.getExamBatchList();
  }
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
        .exam-name {
          font-size: 18px;
          font-weight: 600;
          color: rgba(32, 35, 43, 1);
        }
        .exam-info {
          margin: 14px 0;
          color: #7b7b7b;
        }
      }
    }
  }
  .m-r-30 {
    margin-right: 30px;
  }
} .pagination-box{
    margin-top: 20px;
    text-align: center;
  }
</style>
