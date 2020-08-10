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
                <el-form-item label="考试名称" prop="examName">
                  <el-input v-model="batchManageForm.examName"  placeholder="考试名称"></el-input>
                </el-form-item>
                <el-form-item label="考试类型" prop="examType">
                  <el-select
                    v-model="batchManageForm.examType"
                    placeholder="考试类型"
                    remote
                    @focus="getDictInfo('考试管理-考试类型','examTypeInfo')"
                  >
                    <el-option
                      v-for="value in examTypeInfo"
                      :key="value.id"
                      :label="value.name"
                      :value="value.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="examBegin">
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
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getExamBatchList();"
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
                    @click="addExamBatchInfo('','1')"
                  >新增考试</el-button>
                  <el-button
                    style="background-color:#4aafa7;color:white"
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
            @selection-change="selectUser"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="batchId" label>
              <template slot="header">
                <div class="header-total">全部考试（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <p>
                  <span>
                    <span v-if="scope.row.examStatus === '0'" class="exam-status" style="background:rgba(201,201,201, 0.25);color: #7B7B7B;">未开始</span> 
                    <span v-if="scope.row.examStatus === '1'" class="exam-status" style="background:rgba(9,109,217, 0.25);color: #096DD9;">考试中</span> 
                    <span v-if="scope.row.examStatus === '2'" class="exam-status" style="background:rgba(224,110,50, 0.25);color: #E06E32;">已结束</span> 
                    <span v-if="scope.row.examStatus === '3'" class="exam-status" style="background:rgba(24,192,97, 0.25);color: #18c061;">评分结束</span> 
                    <span class="exam-name">{{scope.row.examName}}</span>
                  </span>
                </p>
                <p class="exam-info">
                  <span class="m-r-30">考试类型：{{scope.row.examTypeName}}</span>
                  <span class="m-r-30">考试人数：{{scope.row.examSum}}</span>
                  <span class="m-r-30">发起机构：{{scope.row.oname}}</span>
                  <span class="m-r-30">是否评分：
                    <span v-if="scope.row.isScoring === '0'">是</span>
                    <span v-if="scope.row.isScoring === '1'">否</span>
                  </span>
                </p>
                <p>
                  <el-button v-if="scope.row.isConfigOver === '0'" type="text"  @click="addExamBatchInfo(scope.row,'2')">修改</el-button>
                  <el-button v-if="scope.row.isConfigOver === '0'" type="text" @click="getViewPagelInfo(scope.row,'0')">选择试卷</el-button>
                  <el-button v-if="scope.row.isConfigOver === '1'" type="text" @click="getViewPagelInfo1(scope.row,'0')">查看试卷</el-button>
                  <el-button v-if="scope.row.isConfigOver === '1'" type="text" @click="getInvigilateInfo(scope.row,'0')">监考管理</el-button>
                  <el-button v-if="scope.row.isConfigOver === '1'" type="text" @click="getExamDetailInfo(scope.row,'0')">考试详情</el-button>
                  <el-button v-if="scope.row.isConfigOver === '0'" type="text" @click="getExamPersonInfo(scope.row,'0')">参考人员</el-button>
                  <el-button v-if="scope.row.isConfigOver === '1'" type="text" @click="getSendResultlInfo(scope.row,'0')">报送成绩</el-button>
                  <el-button v-if="scope.row.isConfigOver === '0'" type="text" @click="roomDispathInfo(scope.row,'0')">考场分配</el-button>
                  <el-button v-if="scope.row.isScoring === '0'" type="text" @click="scoreManageInfo(scope.row,'0')">评分人员</el-button>
                  <el-button v-if="scope.row.isConfigOver === '0'" type="text" @click="disposeInfo(scope.row,'0')">配置完成</el-button>
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="examBegin" width="240px" class-name="vertical-top">
              <template slot-scope="scope">
                <span>
                  <i class="el-icon-time" size="small"></i>
                  <span style="font-color:grey">{{scope.row.examBegin}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="examEnd" width="240px" class-name="vertical-top">
              <template slot-scope="scope">
                <span>
                  <i class="el-icon-time" size="small"></i>
                  <span style="font-color:grey">{{scope.row.examEnd}}</span>
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
    <!-- 新增考试 -->
    <addExamBatchComp ref="addExamBatchCompRef" @getExamBatchListComp="getExamBatchList"></addExamBatchComp>
    <addPage ref="addPageCompRef" @getbatchManageComp="getExamBatchList"></addPage>
    <invigilateManage ref="invigilateManageCompRef" @getbatchManageComp="getExamBatchList"></invigilateManage>
    <sendResult ref="sendResultCompRef" @getbatchManageComp="getExamBatchList"></sendResult>
    <examPerson ref="examPersonCompRef" @getbatchManageComp="getExamBatchList"></examPerson>
    <scorePerson ref="scorePersonCompRef" @getbatchManageComp="getExamBatchList"></scorePerson>
    <examDetail ref="examDetailCompRef" @getbatchManageComp="getExamBatchList"></examDetail>
    <roomDispath ref="roomDispathCompRef" @getbatchManageComp="getExamBatchList"></roomDispath>
  </div>
</template>
<script>
import addExamBatchComp from "./addExamBatch";
import addPage from "./addPage";
import invigilateManage from "./invigilateManage";
import examPerson from "./examPerson";
import scorePerson from "./scorePerson";
import sendResult from "./sendResult";
import examDetail from "./examDetail";
import roomDispath from "./roomDispath";
import { mixinPerson } from "@/common/js/personComm";

export default {
  mixins: [mixinPerson],
  data() {
    return {
      // tableData:[{batchId:'批次1',examName:'诺克萨斯测试题',examBegin:'2019-10-10',examEnd:'2020-10-12',examType:'究极考试',examSum:'200',oName:'部级机构'},
      // {batchId:'批次1',examName:'德玛西亚测试题',examBegin:'2019-10-10',examEnd:'2020-10-12',examType:'究极考试',examSum:'200',oName:'部级机构'}
      // ],
      tableData: [],
      examTypeInfo: [], //考试类型列表
      batchManageForm: {
        batchId: "", //批次id
        examName: "", //考试名称
        examType: "", //考试类型
        examTypeName: "", //考试类型名称
        examBegin: "", //开始时间
        examEnd: "", //结束时间
        oid: "", //发起机构id
        oName: "" //机构名称
      },
      selectUserIdList: [], //选中考试id
      selectList: [], //选中考试信息
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      props: {
        label: "label",
        value: "id"
      },
      tableLoading: false
    };
  },
  components: {
    addExamBatchComp,
    addPage,
    invigilateManage,
    sendResult,
    examPerson,
    scorePerson,
    examDetail,
    roomDispath
  },
  methods: {
    //点击下拉框的时查询考试类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //考试类型
        res => {
          if (res.code === 200) {
            if (codeName === "examTypeInfo") {
              this.examTypeInfo = res.data;
              this.examTypeInfo.unshift({ id: "", name: "全部" });
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    //新增人员信息
    addExamBatchInfo(row,type) {
      this.$refs.addExamBatchCompRef.showModal(row, type);
    },
      
    //选择试卷
    getViewPagelInfo(row, param) {
      let _this = this;
      _this.$refs.addPageCompRef.showModal(2, row);
    }, 
    //试卷查看
    getViewPagelInfo1(row) {
      //预览
      let _this = this;
      _this.$store.commit("setPersonInfo", "", "");
      _this.$router.replace({
        name: "viewApplayDetail",
        params: {
          pageId: row.examNum,  
          name: row.pageName,
          type: "view"
        }
      });
    },
    getInvigilateInfo(row, param) {
      //监考管理
      let _this = this;
      _this.$refs.invigilateManageCompRef.showModal(row, param);
    },
    //报送成绩
    getSendResultlInfo(row, param) {
         let _this = this;
         let data ={
           examName:row.examName,
           examType:row.examType,
           examId:row.examId,
           examEnd:row.examEnd
         }
        _this
        .$confirm("确认报送成绩吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          _this.$store.dispatch("setExamResult", data).then(
            res => {
              if (res.code === 200) {
                _this.$message({ type: "success", message: "报送成绩完成!" });
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
    disposeInfo(row, param) {
      //配置完成
      let _this = this;
      let data = {
        examId: row.examId
      };
      _this
        .$confirm("确认配置完成吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          const loading = _this.$loading({
            lock: true,
            text: "正在配置",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          _this.$store.dispatch("disposeInfo", data).then(
            res => {
              loading.close();
              if (res.code === 200) {
                _this.$message({ type: "success", message: "配置已完成!" });
                //重新加载页面数据
                _this.getExamBatchList();
              }
            },
            err => {
              loading.close();
              _this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    getExamDetailInfo(row, param) {
      //考试详情
      let _this = this;
      _this.$refs.examDetailCompRef.showModal(param, row);
    },
    //评分人员
    scoreManageInfo(row,type){
      let _this = this;
      _this.$refs.scorePersonCompRef.showModal(row, type);
    },
    getExamPersonInfo(row, type) {
      //参考人员
      let _this = this;
      _this.$refs.examPersonCompRef.showModal(row, type);
    },
    roomDispathInfo(row) {
      //考场分配
      let _this = this;
      _this.$refs.roomDispathCompRef.showModal(row,1);
    },
    //根据查询条件查询人员基本信息
    getExamBatchList() {
      let _this = this;
      _this.tableLoading = true;
      let data = {
        examName: _this.batchManageForm.examName,
        examType: _this.batchManageForm.examType,
        examTypeName: _this.batchManageForm.examTypeName,
        examBegin: _this.batchManageForm.examBegin,
        examEnd: _this.batchManageForm.examEnd,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("getExamBathListInfo", data).then(res => {
        if (res.code == "200") {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
          _this.tableLoading = false;
        }
      }, err => {
        _this.tableLoading = false;
        _this.$message({ type: 'error', message: err.msg || '' });
      });
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
      this.$refs["batchManageFormRef"].resetFields();
      this.currentPage = 1;
      this.getExamBatchList();
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
