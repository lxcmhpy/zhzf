<template>
  <div class="entry-exam">
    <el-row class="invigilator-wrap">
      <el-col :span="7" class="row-col">
        <div class="exam-info" style="padding: 20px 0;">
          <div class="time-info">
            <img src="../../../../static/images/img/exam/clocks.png" alt />
            <span class="time-prompt">距离考试开始</span>
            <span class="count-down">{{m}}</span>
            <span class="count-down">{{s}}</span>
          </div>
          <div class="exam-name">
            <p>考试名称</p>
            <p class="name">{{examInfo.examName}}</p>
          </div>
          <div class="exam-name">
            <p>考场</p>
            <p class="name">{{roomInfo.roomName}}</p>
          </div>
          <div class="exam-name">
            <p>考试时间</p>
            <p class="name">{{examInfo.examBegin}} 至 {{examInfo.examEnd}}</p>
          </div>
          <div class="exam-prompt">
            <p class="title">备注</p>
            <p class="f-s-12">1.考生应自觉服从监考员等考试工作人员管理,不准以任何理由妨碍监考员等考试工作人员履行职责...</p>
            <p class="f-s-12">2.考生凭准考证、有效居民身份证按规定时间参加考试。</p>
            <p class="f-s-12">3.严禁考生携带手机等各种通讯工具、手表、电子存储记忆录放。</p>
          </div>
        </div>
      </el-col>
      <el-col :span="17" class="row-col">
        <div class="exam-info" style="margin-left: 0;">
          <div class="handlePart">
            <el-form :inline="true" :model="searchForm" ref="searchForm">
              <el-form-item prop="idNo">
                <el-input
                  v-model="searchForm.personName"
                  placeholder="请输入姓名或身份证号"
                  style="width: 320px;"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-left:20px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="getExamPerson"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetSearchForm"
                ></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="handle-wrap">
            <div class="handle-btn">
              <el-button
                type="primary"
                icon="el-icon-time"
                size="medium"
                @click="viewRecord('',3)"
              >批量延迟</el-button>
              <el-button type="info" icon="el-icon-edit-outline" size="medium">修改信息</el-button>
            </div>
            <div class="exam-status">
              <el-radio-group v-model="searchForm.status">
                <el-radio :label="0">全部</el-radio>
                <el-radio :label="1">未答题</el-radio>
                <el-radio :label="2">答题中</el-radio>
                <el-radio :label="3">已交卷</el-radio>
              </el-radio-group>
            </div>
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
                <el-table-column prop="personName" label="姓名" align="left" min-width="100px"></el-table-column>
                <el-table-column prop="idNo" label="身份证号" align="center" width="174px"></el-table-column>
                <el-table-column prop="branchName" label="学生状态" min-width="120px" align="center"></el-table-column>
                <el-table-column prop="time" label="答题时间" min-width="100px" align="center"></el-table-column>
                <el-table-column label="操作" min-width="320px" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="viewRecord(scope.row,1)">考场记录</el-button>
                    <el-button type="text" @click="viewRecord(scope.row,2)">强制收卷</el-button>
                    <el-button type="text" @click="viewRecord(scope.row,3)">延迟收卷</el-button>
                    <el-button type="text" @click="viewRecord(scope.row,4)">登录重置</el-button>
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
      </el-col>
    </el-row>
    <!-- 考场记录 -->
    <examRoomRecord ref="examRoomRecord" />
    <windowsPage ref="windowsPage"></windowsPage>
  </div>
</template>

<script>
import examRoomRecord from "./examRoomRecord";
import windowsPage from "./windowsPage";
export default {
  components: { examRoomRecord, windowsPage },
  data() {
    return {
      searchForm: { idNo: "", status: 0 },
      roomInfo: {
        roomId: "",
        roomName: "",
        roomSum: "",
        createTime: ""
      },
      examInfo: {
        examId: "",
        examName: "",
        examType: "",
        examSort: "",
        examSum: "",
        examBegin: "",
        examEnd: "",
        examNum: "",
        examStatus: ""
      },
      examperIds: "",
      d: "",
      h: "",
      m: "",
      s: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [], //列表数据
      tableLoading: false // 列表数据加载
    };
  },
  computed: {
    invigilatorId() {
      return this.$route.query.id;
    },
    invigilatorInfo() {
      return JSON.parse(sessionStorage.getItem("ExamUserInfo"));
    }
  },
  methods: {
    countTime: function() {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var endDate = new Date("2021-05-27 16:23:23");
      var end = endDate.getTime();
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
    // 考场记录
    viewRecord(row, type) {
      let data = {
        invigilatorId: this.invigilatorId,
        examId: this.invigilatorInfo.examManageInfo.examId,
        preDelayedTime: this.examInfo.examEnd,
        examperIds: this.examperIds
      };
      if (row != "") {
        data.examperIds = row.examperId;
      }
      if (type === 1) {
        this.$refs.examRoomRecord.showModal(row, data);
      } else if (type === 2) {
        this.$refs.windowsPage.showModal(row, data, type);
      } else if (type === 3) {
        this.$refs.windowsPage.showModal(row, data, type);
      } else if (type === 4) {
        this.$confirm("确定重置登录吗！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            this.$store.dispatch("signOutSystem", row.idNo).then(res=>{
              if(res.code === '200'){
                   this.$message({ type: "success", message: "重置登录成功！"});
              }
            });
          })
          .catch(() => {});
      }
    },
    // 搜索表单重置
    resetSearchForm() {
      this.$refs["searchForm"].resetFields();
    },
    //考生信息
    getExamPerson() {
      let data = {
        invigilatorId: this.invigilatorId,
        examId: this.invigilatorInfo.examManageInfo.examId
      };
      this.$store.dispatch("examPersonsByInvigilatorId", data).then(
        res => {
          if (res.code == "200") {
            this.tableData = res.data.records;
          }
          this.visible = false;
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //考场信息
    getExamMsg() {
      let data = {
        invigilatorId: this.invigilatorId
      };
      this.$store.dispatch("getExamInfoByInvigilatorInfo", data).then(
        res => {
          if (res.code == "200") {
            this.roomInfo = res.data.roomInfo;
            this.examInfo = res.data.examInfo;
          }
          this.visible = false;
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.examperIds = "";
      val.forEach((item, index) => {
        if ((item.examperId != "") & (item.examperId != null)) {
          if (_this.examperIds == "") {
            _this.examperIds = item.examperId;
          } else {
            _this.examperIds = _this.examperIds + "," + item.examperId;
          }
        }
      });
    }
  },
  mounted() {},
  created() {
    this.countTime();
    this.getExamPerson();
    this.getExamMsg();
  }
};
</script>
<style lang="scss" scoped>
.entry-exam {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../../static/images/img/exam/page_top.png") no-repeat;
  background-size: 32%;
  overflow: scroll;
  .invigilator-wrap {
    height: 100%;
    .row-col {
      height: 100%;
      .exam-info {
        position: relative;
        min-height: 560px;
        margin: 20px;
        padding: 20px;
        background: #fff;
        .time-info {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #cbcbcc;
          .time-prompt {
            font-size: 18px;
            font-weight: 560;
            color: #20232a;
            margin: 0 20px;
          }
          .count-down {
            display: inline-block;
            width: 36px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: rgba(247, 158, 15, 1);
            box-shadow: 0px 1px 3px 0px rgba(101, 70, 20, 0.2);
            border-radius: 2px;
            margin-right: 8px;
          }
        }
        .exam-name {
          margin: 10px 20px 0;
          padding-bottom: 20px;
          line-height: 28px;
          font-size: 16px;
          color: #20232a;
          text-align: center;
          font-weight: 600;
          border-bottom: 1px solid #cbcbcc;
          .name {
            color: #e61111;
          }
        }
        .exam-prompt {
          margin: 20px;
          color: #393939;
          .title {
            text-align: center;
            margin: 10px 0;
          }
          .f-s-12 {
            font-size: 14px;
            line-height: 24px;
          }
        }
      }
    }
    .handle-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tablePart {
      position: relative;
      margin-top: 20px;
      min-height: 450px;
      .table-wrap {
        position: absolute;
        top: 0;
        bottom: 50px;
        width: 100%;
      }
      .paginationBox {
        bottom: 0;
        position: absolute;
        width: 100%;
        margin-top: 10px;
        text-align: center;
        >>> .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }
}
</style>
