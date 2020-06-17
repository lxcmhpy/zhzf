<template>
  <div class="entry-exam">
    <el-row class="invigilator-wrap">
      <el-col :span="7" class="row-col">
        <div class="exam-info" style="padding: 20px 0;">
          <div class="time-info">
            <img src="../../../../static/images/img/exam/clocks.png" alt />
            <span class="time-prompt">{{ countText }}</span>
            <span v-if="intervalTime" class="count-down">{{ countTime.minutes }}</span>
            <span style="margin-right: 8px;">分</span>
            <span v-if="intervalTime" class="count-down">{{ countTime.second }}</span>
            <span>秒</span>
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
            <p class="f-s-12">3.严禁考生携带手机等各种通讯工具、手表、电子存储记忆录放等设备。</p>
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
                  @click="currentPage = 1 ;getExamPerson();"
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
              <el-button
                type="info"
                icon="el-icon-edit-outline"
                size="medium"
                @click="editUserInfo"
              >修改信息</el-button>
            </div>
            <div class="exam-status">
              <el-radio-group v-model="searchForm.status" @change="searchByStatus">
                <el-radio label>全部</el-radio>
                <el-radio :label="'0'">未答题</el-radio>
                <el-radio :label="'1'">答题中</el-radio>
                <el-radio :label="'2'">已交卷</el-radio>
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
                <el-table-column prop="examStatue" label="考生状态" min-width="120px" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.examStatue === '0'" style="color: #20232B;">未答题</span>
                    <span v-if="scope.row.examStatue === '1'" style="color: #F19004;">答题中</span>
                    <span v-if="scope.row.examStatue === '2'" style="color: #18C061;">已交卷</span>
                  </template>
                </el-table-column>
                <el-table-column prop="loginTime" label="开始答题时间" min-width="100px" align="center"></el-table-column>
                <el-table-column label="操作" min-width="320px" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="viewRecord(scope.row,1)">考场记录</el-button>
                    <el-button
                      v-if="scope.row.examStatue === '1'"
                      type="text"
                      @click="viewRecord(scope.row,2)"
                    >强制收卷</el-button>
                    <el-button
                      v-if="scope.row.examStatue === '1'"
                      type="text"
                      @click="viewRecord(scope.row,3)"
                    >延迟收卷</el-button>
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
    <windowsPage ref="windowsPage" @reloadTable="currentPage = 1;getExamPerson();"></windowsPage>
    <!-- 修改信息 -->
    <editInvigilator ref="editInvigilator" />
  </div>
</template>

<script>
import examRoomRecord from "./examRoomRecord";
import windowsPage from "./windowsPage";
import editInvigilator from "./editInvigilator";
export default {
  components: { examRoomRecord, windowsPage, editInvigilator },
  data() {
    return {
      searchForm: { idNo: "", status: "" },
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
      countTime: {
        minutes: "",
        second: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [], //列表数据
      tableLoading: false, // 列表数据加载
      intervalTime: null,
      countText: "", // 倒计时显示文字
      differenceTime: 0
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
  created() {
    this.getExamPerson();
    this.getExamMsg();
  },
  methods: {
    // 获取系统当前时间
    getSystemTime() {
      this.$store.dispatch("getSystemDate").then(
        res => {
          this.differenceTime = res - new Date().getTime();
          this.startCountDown();
        },
        err => {
          console.log(err);
        }
      );
    },
    // 开始倒计时
    startCountDown() {
      // 获取当前时间，考试结束时间
      let newTime = new Date().getTime() + this.differenceTime;
      // 对比考试开始时间和结束时间
      let examBegin = new Date(this.examInfo.examBegin).getTime();
      let examEnd = new Date(this.examInfo.examEnd).getTime();
      let diffTime = 0;
      let endTime = 0;
      if (examEnd - newTime < 0) {
        this.countText = "考试已结束";
        clearInterval(this.intervalTime);
        return false;
      }
      if (newTime - examBegin < 0) {
        this.countText = "距离考试开始";
        diffTime = examBegin - newTime;
        endTime = examBegin;
      } else {
        this.countText = "距离考试结束";
        diffTime = examEnd - newTime;
        endTime = examEnd;
      }
      if (diffTime > 0) {
        let time = diffTime / 1000;
        this.setCountDownTime(time);
        this.countDownFun(endTime);
      }
    },
    // 倒计时方法
    countDownFun(examEnd) {
      this.intervalTime = setInterval(() => {
        // 获取当前时间，考试结束时间
        let newTime = new Date().getTime() + this.differenceTime;
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(examEnd).getTime();
        let diffTime = endTime - newTime;
        this.countDownList = "";
        if (diffTime < 0 || diffTime === 0) {
          this.countText = "考试已结束";
          clearInterval(this.intervalTime);
        } else {
          let time = diffTime / 1000;
          this.setCountDownTime(time);
        }
      }, 1000);
    },
    // 设置倒计时显示值
    setCountDownTime(time) {
      // 获取分、秒
      let hou = parseInt((time % (60 * 60 * 24)) / 3600);
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
      if (hou > 0) {
        min = hou * 60 + min;
      }
      this.countTime.minutes = this.timeFormat(min);
      this.countTime.second = this.timeFormat(sec);
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    // 修改信息
    editUserInfo() {
      this.$refs.editInvigilator.showModal(
        this.invigilatorInfo.invigilatorInfo
      );
    },
    // 考场记录
    viewRecord(row, type) {
      let data = {
        invigilatorId: this.invigilatorId,
        examId: this.invigilatorInfo.examManageInfo.examId,
        preDelayedTime: this.examInfo.examEnd,
        examperIds: this.examperIds,
        roomId: this.invigilatorInfo.invigilatorInfo.roomId
      };
      if (row != "") {
        data.examperIds = row.examperId;
      }
      if (type === 1) {
        this.$refs.examRoomRecord.showModal(row, data);
      } else if (type === 2) {
        this.$refs.windowsPage.showModal(row, data, type);
      } else if (type === 3) {
        if (data.examperIds == undefined || data.examperIds.length == 0) {
          this.$message({
            type: "warning",
            message: "请选择一条考生信息"
          });
        } else {
          this.$refs.windowsPage.showModal(row, data, type);
        }
      } else if (type === 4) {
        this.$confirm("确定重置登录吗！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            this.$store.dispatch("signOutSystem", row.idNo).then(res => {
              if (res.code === 200) {
                this.$message({ type: "success", message: "重置登录成功！" });
              }
            });
          })
          .catch(() => {});
      }
    },
    // 搜索表单重置
    resetSearchForm() {
      this.searchForm.personName = "";
      this.searchForm.status = "";
    },
    // 根据考生状态查询
    searchByStatus(val) {
      this.currentPage = 1;
      this.getExamPerson();
    },
    //考生信息
    getExamPerson() {
      let data = {
        invigilatorId: this.invigilatorId,
        examId: this.invigilatorInfo.examManageInfo.examId,
        roomId: this.invigilatorInfo.invigilatorInfo.roomId,
        personName: this.searchForm.personName,
        examStatue: this.searchForm.status,
        current: this.currentPage,
        size: this.pageSize
      };
      this.tableLoading = true;
      this.$store.dispatch("examPersonsByInvigilatorId", data).then(
        res => {
          this.tableLoading = false;
          if (res.code == "200") {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
          }
          this.visible = false;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 考生答题时间
    answerTime(row) {
      if (row.loginTime) {
        const examBegin = new Date().getTime();
        const loginTime = new Date(row.loginTime).getTime();
        const time = examBegin - loginTime;
        if (time > 0) {
          let hou = parseInt((time % (60 * 60 * 24)) / 3600);
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
          if (hou > 0) {
            min = hou * 60 + min;
          }
          return `${min}分钟${sec}秒`;
        }
      } else {
        return "";
      }
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
            this.getSystemTime();
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
      this.getExamPerson();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExamPerson();
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
  destroyed() {
    clearInterval(this.intervalTime);
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
        // min-height: 560px;
        height: calc(100% - 80px);
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
      // min-height: 450px;
      height: calc(100% - 100px) !important;
      .table-wrap {
        position: absolute;
        top: 0;
        bottom: 70px;
        width: 100%;
        >>> .el-table__body-wrapper {
          padding-bottom: 0;
        }
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
