<template>
  <div class="entry-exam">
    <el-row class="invigilator-wrap">
      <el-col :span="17" class="row-col">
        <div v-if="firstQuestion && firstQuestion.pqId" class="exam-info question">
          <div class="header">
            <span>{{ firstQuestion.questionTypeName }}</span>
          </div>
          <div class="question-box">
            <questionItem
              ref="questionItem"
              :question="firstQuestion"
              @setQuestionStatus="setQuestionStatus"
            />
          </div>
          <div class="select-btn">
            <el-button class="question-btn" style="float: left;" @click="viewResolution">查看解析</el-button>
            <div style="float: right;">
              <div
                v-if="!currentGraph.labelStatue"
                class="sign-btn sign"
                @click="markedQuestion(true)"
              >
                <i class="icon-sign"></i>
                <span style="margin-left:45px;">标记该题</span>
              </div>
              <div
                v-if="currentGraph.labelStatue"
                class="sign-btn marked"
                @click="markedQuestion(false)"
              >
                <i class="icon-marked"></i>
                <span style="margin-left:50px;">已标记</span>
              </div>
              <el-button
                class="question-btn"
                :disabled="currentGraph.orderNo === 1"
                @click="nextQuestion('prev')"
              >上一题</el-button>
              <el-button
                class="question-btn"
                @click="nextQuestion('next')"
                :disabled="nextDisabled"
              >下一题</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7" class="row-col">
        <div class="exam-info" style="padding: 20px 0; margin-left: 0;">
          <div class="answer-statistics">
            <div class="time-info">
              <img src="../../../../static/images/img/exam/clocks.png" alt />
              <span class="count-down" style="margin-left: 20px;">{{ countTime.hours }}</span>
              <span class="count-down">{{ countTime.minutes }}</span>
              <span class="count-down">{{ countTime.second }}</span>
              <a class="suspend-exam-btn" @click="timeoutAnswer">暂停</a>
            </div>
            <div v-if="personInfo.personId" class="time-info pserson-info">
              <div class="examinee-photo">
                <img
                  v-if="personInfo.photoUrl"
                  :src="personInfo.photoUrl"
                  width="100px"
                  height="140px"
                />
                <img v-else :src="personImg" width="100px" height="140px" />
              </div>
              <div class="exam-person">
                <p class="name">{{ personInfo.personName }}</p>
                <p class="componey">{{ personInfo.oname }}</p>
              </div>
            </div>
            <div class="time-info exam-desc">
              <p v-if="examPerInfo.examInfo" class="exam-name">{{ $route.query.teName }}</p>
              <p class="exam-answer">答题卡</p>
              <div class="status-box">
                <span class="status">
                  <i class="exam-status wait"></i>未答
                </span>
                <span class="status">
                  <i class="exam-status sign"></i>标记
                </span>
                <span class="status">
                  <i class="exam-status finish"></i>已答
                </span>
              </div>
            </div>
            <div class="question-total">
              <div v-for="graph in graphInfo" :key="graph.paragraphId" class="question-class">
                <div class="question-title-type">{{ graph.paragraphTypeName }}</div>
                <div
                  v-if="graph.examResultList && graph.examResultList.length"
                  class="question-wrap"
                >
                  <a
                    v-for="num in graph.examResultList"
                    class="item"
                    :key="num.questionId"
                    :class="{
                      'sign': num.labelStatue,
                      'finish': num.perAnswer && !num.labelStatue,
                      'current': num.questionId == firstQuestion.questionId}"
                    @click="currentGraph = num ;nextQuestion('', num.orderNo)"
                  >{{ num.orderNum }}</a>
                </div>
              </div>
            </div>
            <div class="submit-exam">
              <el-button
                type="default"
                icon="iconfont law-icon_baocun1"
                class="entry-btn"
                style="color:#4573D0;"
                @click="svaeProgress"
              >保存进度</el-button>
              <el-button
                type="primary"
                icon="el-icon-document-checked"
                class="entry-btn"
                style="margin-left:0;"
                @click="handPaper"
              >我要交卷</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 题目解析 -->
    <el-dialog title="题目解析" :visible.sync="resolutionDialog" width="40%">
      <div style="font-size: 16px; line-height: 22px;">
        <p>参考答案：{{ resolution.answer }}</p>
        <p>试题解析：{{ resolution.questionAnalysis }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resolutionDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import questionItem from "@/components/examComponents/questionItem";
import iLocalStroage from "@/common/js/localStroage";
import { enterMockExam, getQuestionNext, submitMockExam, saveQuestionProgress } from "@/api/trained";

export default {
  components: { questionItem },
  data() {
    return {
      marked: false,
      countTime: {
        hours: '',
        minutes: "",
        second: ""
      },
      graphInfo: {},
      personInfo: {},
      firstQuestion: {},
      questionNumList: [],
      intervalTime: null,
      nextDisabled: false,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      currentSysTime: new Date().getTime(),
      currentGraph: {},
      resolution: { answer: "", questionAnalysis: "" },
      resolutionDialog: false,
      timeLength: 0
    };
  },
  computed: {
    examPerInfo() {
      return JSON.parse(sessionStorage.getItem("ExamUserInfo"));
    },
  },
  created() {
    this.getQuestionInfo();
  },
  methods: {
    // 获取用户照片
    getPersonPhoto() {
      if (this.personInfo.photoUrl) {
        this.$util.com_getFileStream(this.personInfo.photoUrl).then((res) => {
          this.personInfo.photoUrl = res;
        });
      }
    },
    // 获取考试内容
    getQuestionInfo() {
      const loading = this.$loading({
        lock: true,
        text: "正在获取题目",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      enterMockExam(this.$route.query).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.graphInfo = res.data.graphInfo;
            this.personInfo = res.data.personInfo;
            this.firstQuestion = res.data.firstQuestion;
            this.firstQuestion["listPo"] = this.firstQuestion.option_list;
            delete this.firstQuestion.option_list;
            this.resolution.answer = this.firstQuestion.answer;
            this.resolution.questionAnalysis = this.firstQuestion.questionAnalysis;
            this.firstQuestion.answer = this.firstQuestion.perAnswer;
            this.setAllQuestionNum(res.data.graphInfo);
            this.timeLength = res.data.userTime || 0;
            this.countDownFun();
            this.getPersonPhoto();
          } else {
            this.$message({ type: "error", message: "获取题目失败" });
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: "获取题目失败" });
        }
      );
    },
    // 右侧试题分类统计
    setAllQuestionNum(graph) {
      if (graph && graph.length) {
        graph.forEach(item => {
          if (item.examResultList && item.examResultList.length) {
            this.questionNumList = this.questionNumList.concat(
              item.examResultList
            );
          }
        });
        this.currentGraph = this.questionNumList[this.firstQuestion.orderNo - 1];
        this.currentGraph.perAnswer = this.firstQuestion.answer;
        // this.firstQuestion.resultId = this.currentGraph.resultId;
        this.firstQuestion.orderNum = this.currentGraph.orderNum;
      }
    },
    // 暂停答题
    timeoutAnswer(){
      clearInterval(this.intervalTime);
      this.$alert('<div style="text-align:center; font-size:16px;">考试已暂停</div>', '提示', {
        dangerouslyUseHTMLString: true,
        showClose: false,
        confirmButtonText: '继续答题'
      }).then(() => {
        this.countDownFun();
      });
    },
    // 倒计时方法
    countDownFun() {
      this.timeLength = this.timeLength - 0;
      this.intervalTime = setInterval(() => {
        this.timeLength = this.timeLength + 1;
        this.setCountDownTime();
      }, 1000);
    },
    // 设置倒计时显示值
    setCountDownTime() {
      const time = this.timeLength - 0;
      // 获取分、秒
      let hou = parseInt((time % (60 * 60 * 24)) / 3600);
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);

      this.countTime.hours = this.timeFormat(hou);
      this.countTime.minutes = this.timeFormat(min);
      this.countTime.second = this.timeFormat(sec);
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },

    // 查看解析
    viewResolution() {
      this.resolutionDialog = true;
    },
    // 标记该题
    markedQuestion(mark) {
      this.currentGraph.labelStatue = mark;
    },
    // 下一题
    nextQuestion(dir, orderNo) {
      this.nextDisabled = false;
      this.marked = false;
      const answer = this.handleSubmitData();
      if (dir === "prev") {
        answer.orderNo = this.currentGraph.orderNo - 1;
      }
      if (dir === "next") {
        if (this.currentGraph.orderNo === this.questionNumList.length) {
          answer.orderNo = this.currentGraph.orderNo;
        } else {
          answer.orderNo = this.currentGraph.orderNo + 1;
        }
      }
      answer.preOrNext = `${this.currentGraph.orderNo},${answer.orderNo}`;
      if (orderNo !== undefined && orderNo > 0) {
        answer.preOrNext = `${answer.orderNo},${orderNo}`;
        answer.orderNo = orderNo;
      }
      let number = answer.orderNo;
      const loading = this.$loading({
        lock: true,
        text: "正在获取题目",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      getQuestionNext(answer).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.$refs.questionItem.clearAnswer();
            if (res.data && JSON.stringify(res.data) !== "{}") {
              this.currentGraph = this.questionNumList[number - 1];
              this.currentGraph.perAnswer = res.data.perAnswer;
              res.data.listPo = res.data.option_list;
              delete res.data.option_list;
              this.firstQuestion = res.data;
              this.firstQuestion.orderNo = number;
              this.firstQuestion.orderNum = this.currentGraph.orderNum;
              
              this.resolution.answer = this.firstQuestion.answer;
              this.resolution.questionAnalysis = this.firstQuestion.questionAnalysis;
              this.firstQuestion.answer = this.firstQuestion.perAnswer;

              let answer = res.data.perAnswer;
              this.setQuestionStatus(answer);
              if (number === this.questionNumList.length) {
                this.$message({ type: "info", message: "已到最后一题" });
                this.nextDisabled = true;
              }
            }
          }
        },
        err => {
          loading.close();
          this.quitExam(err.msg);
        }
      );
    },
    // 处理当前答题数据
    handleSubmitData() {
      const answer = JSON.parse(
        JSON.stringify(this.$refs.questionItem.question)
      );
      const saveAnswer = { pqId: answer.pqId, orderNum: answer.orderNum, orderNo: answer.orderNo };
      const personAnswer = [];
      const optionId = [];
      if (answer.listPo && answer.listPo.length) {
        answer.listPo.forEach(item => {
          if (item.optionKey === "1") {
            personAnswer.push(item.optionNum);
            optionId.push(item.pqOptionId);
          }
        });
        saveAnswer["answer"] = personAnswer.join(",");
        saveAnswer["optionIds"] = optionId.join(",");
      }
      saveAnswer['teperId'] = this.$route.query.teperId;
      saveAnswer['teId'] = this.$route.query.teId;
      delete answer.listPo;
      return saveAnswer;
    },
    // 保存进度
    svaeProgress(){
      this.$confirm("确定保存当前答题进度吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        }
      )
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在保存进度",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          const answer = this.handleSubmitData();
          answer.preOrNext = `${this.currentGraph.orderNo},${this.currentGraph.orderNo}`;
          if(answer.answer){
            getQuestionNext(answer).then(
              res => {
                if (res.code === 200) {
                  if (answer.orderNo === this.questionNumList.length) {
                    this.nextDisabled = true;
                  }
                  this.submitProgress(loading);
                } else {
                  loading.close();
                }
              },
              err => {
                loading.close();
                // this.$message({ type: "error", message: err.msg || "" });
                this.quitExam(err.msg);
              }
            );
          }else{
            this.submitProgress(loading);
          }
        })
        .catch(() => {});
    },
    // 交卷
    submitProgress(loading) {
      const submitData = {
        teperId: this.$route.query.teperId,
        teId: this.$route.query.teId,
        useTime: this.timeLength
      };
      saveQuestionProgress(submitData).then(
        res => {
          loading.close();
          this.quitExam("进度保存成功!");
        },
        err => {
          loading.close();
          this.$confirm("保存失败", "提示", {
            confirmButtonText: "确定",
            iconClass: "custom-question",
            customClass: "custom-confirm",
            showCancelButton: false
          }).then(() => {
            this.closeAnswerPage();
          }).catch(() => {
            this.closeAnswerPage();
          });
        }
      );
    },
    // 我要交卷
    handPaper() {
      const answered = this.questionNumList.filter(
        item => item.perAnswer && item.perAnswer.length
      );
      this.$confirm(
        `已答${answered.length}道题，还有${this.questionNumList.length -
          answered.length}道未答，您确认交卷吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        }
      )
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在交卷",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          const answer = this.handleSubmitData();
          answer.preOrNext = `${this.currentGraph.orderNo},${this.currentGraph.orderNo}`;
          if(answer.answer){
            getQuestionNext(answer).then(
              res => {
                if (res.code === 200) {
                  if (answer.orderNo === this.questionNumList.length) {
                    this.nextDisabled = true;
                  }
                  this.savePaper(loading);
                } else {
                  loading.close();
                }
              },
              err => {
                loading.close();
                // this.$message({ type: "error", message: err.msg || "" });
                this.quitExam(err.msg);
              }
            );
          }else{
            this.savePaper(loading);
          }
        })
        .catch(() => {});
    },
    // 交卷
    savePaper(loading) {
      const submitData = {
        teperId: this.$route.query.teperId,
        teId: this.$route.query.teId
      };
      submitMockExam(submitData).then(
        res => {
          loading.close();
          if(res.data && res.data.data){
            this.successSubmitPage("交卷成功，您的得分是", res.data.data);
          }else{
            this.quitExam("提交成功！", true);
          }
        },
        err => {
          loading.close();
          this.$confirm("提交失败，请稍后再试！", "提示", {
            confirmButtonText: "确定",
            iconClass: "custom-question",
            customClass: "custom-confirm",
            showCancelButton: false
          }).then(() => {
          }).catch(() => {
          });
        }
      );
    },
    // 关闭当前页签
    closeAnswerPage(){
      this.$store.dispatch("deleteTabs", 'startAnswerMockExam');
      this.$router.push({ name: 'MyMockExam' });
    },
    // 获取题目失败或被强制收卷跳转页面
    quitExam(msg, closePage) {
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        iconClass: "iconfont law-success",
        customClass: "custom-confirm",
        showCancelButton: false
      })
        .then(() => {
          if(closePage){
            this.closeAnswerPage();
          }
        })
        .catch(() => {
          if(closePage){
            this.closeAnswerPage();
          }
        });
    },
    // 交卷成功后显示成绩
    successSubmitPage(msg, score){
      let messageHtml = msg;
      if (score !== undefined && score !== null) {
        messageHtml = `<div style="text-align:center;"><p style="font-weight:560;">${msg}</p>
          <p style="font-size: 58px;font-weight:600;;color:#17C062; margin-top:30px;">${score}</p></div>`;
      }
      this.$confirm(messageHtml, "提示", {
        confirmButtonText: "确定",
        iconClass: score !== undefined && score !== null ? "" : "iconfont law-success",
        customClass: "custom-confirm",
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          if(closePage){
            this.closeAnswerPage();
          }
        })
        .catch(() => {
          if(closePage){
            this.closeAnswerPage();
          }
        });
    },
    // 左侧题目状态和右侧答题卡联动
    setQuestionStatus(checked) {
      this.currentGraph.perAnswer = "";
      if (!this.marked) {
        this.currentGraph.perAnswer = checked;
      }
    },
    // 退出考试系统
    logoutSystem() {
      this.$store
        .dispatch("signOutSystem", sessionStorage.getItem("ExamName"))
        .then(
          res => {
            this.$router.push("/examLogin");
          },
          err => {
            this.$message({ type: "error", message: err.msg || "" });
            this.$router.push("/examLogin");
          }
        );
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
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  .invigilator-wrap {
    height: 100%;
    min-height: 600px;
    .row-col {
      height: 100%;
      position: relative;
      .exam-info {
        position: absolute;
        margin: 20px;
        background: #fff;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
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
          .suspend-exam-btn {
            display: inline-block;
            width: 50px;
            height: 28px;
            padding-left: 16px;
            line-height: 28px;
            margin-left: 20px;
            text-align: center;
            border: 1px solid #4573d0;
            color: #4573d0;
            font-size: 14px;
            border-radius: 2px;
            background: url("../../../../static/images/img/trained/icon_suspend.svg")
              no-repeat 10px center;
            cursor: pointer;
            box-sizing: content-box;
            &:hover {
              color: #4d89ff;
              border: 1px solid #4d89ff;
            }
          }
        }
        .pserson-info {
          display: flex;
          align-items: center;
          margin-top: 20px;
          justify-content: inherit;
          padding-left: 30px;
          .exam-person {
            margin-left: 10px;
            color: #20232a;
            line-height: 28px;
            .name {
              font-size: 16px;
            }
            .componey {
              font-size: 14px;
            }
          }
        }
        .exam-desc {
          display: block;
          padding: 0 20px 6px;
          .exam-name,
          .exam-answer {
            margin: 20px 0 10px;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: rgba(32, 35, 42, 1);
          }
          .status-box {
            text-align: right;
            .status {
              display: inline-block;
              color: #999;
              font-size: 12px;
              margin-right: 10px;
              .exam-status {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 8px;
                float: left;
                &.wait {
                  border: 1px solid #999;
                }
                &.sign {
                  border: 1px solid #e61111;
                }
                &.finish {
                  border: 1px solid #4573d0;
                  background: rgba(69, 115, 208, 1);
                }
              }
            }
          }
        }
        .question-total {
          position: absolute;
          overflow-y: scroll;
          top: 400px;
          bottom: 68px;
          left: 20px;
          right: 0;
          padding-right: 20px;
          .question-class {
            .question-title-type {
              font-size: 16px;
              color: #20232a;
              margin: 20px 0;
              font-weight: 600;
            }
            .question-wrap {
              display: flex;
              flex-wrap: wrap;
              // justify-content: space-around;
              > .item {
                display: inline-block;
                width: 34px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: rgba(255, 255, 255, 1);
                border-radius: 2px;
                border: 1px solid rgba(217, 217, 217, 1);
                margin: 0 12px 10px 0;
                cursor: pointer;
                &:hover {
                  background: #ebebeb;
                }
                &.current {
                  color: #4573d0;
                  border: 1px solid #4573d0;
                }
                &.sign {
                  color: #e61111;
                  border: 1px solid #e61111;
                }
                &.finish {
                  color: #fff;
                  background: #4573d0;
                }
              }
            }
          }
        }
        .submit-exam {
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          .entry-btn {
            width: 50%;
            height: 58px;
            font-size: 18px;
          }
        }
      }
      .question {
        .header {
          height: 60px;
          width: 100%;
          padding: 0 30px;
          background: rgba(249, 249, 249, 1);
          border-bottom: 1px solid #ebebeb;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sign-question {
            color: #7b7b7b;
            &.marked {
              color: #e61111;
            }
          }
        }
        .question-box {
          padding: 0 10px;
          height: calc(100% - 180px);
          overflow-y: scroll;
        }
        .select-btn {
          position: absolute;
          bottom: 46px;
          right: 66px;
          left: 20px;
          .question-btn {
            margin-right: 30px;
            padding: 12px 40px;
            font-size: 16px;
            font-weight: 500;
            color: rgba(123, 123, 123, 1);
            &:hover {
              background: rgba(69, 115, 208, 1);
              color: #fff;
            }
            &.is-disabled {
              color: rgba(123, 123, 123, 1);
              background: rgba(201, 201, 201, 0.25);
              border: 1px solid rgba(201, 201, 201, 0.25);
            }
          }
          .sign-btn {
            display: inline-block;
            padding-left: 0;
            padding-right: 0;
            width: 130px;
            height: 40px;
            line-height: 40px;
            margin-right: 30px;
            font-size: 16px;
            font-weight: 500;
            position: relative;
            text-align: inherit;
            border: 1px solid #ddd;
            color: #7b7b7b;
            cursor: pointer;
            .icon-sign,
            .icon-marked {
              display: inline-block;
              width: 18px;
              height: 18px;
              background: url("../../../../static/images/img/exam/sign.png");
              background-size: 100%;
              position: absolute;
              left: 20px;
              top: 11px;
            }
            .icon-marked {
              background: url("../../../../static/images/img/exam/marked.png");
              background-size: 100%;
              color: #e61111;
            }
            &.sign:hover {
              background: rgba(221, 221, 221, 0.2);
            }
            &.marked {
              color: #e61111;
              border: 1px solid #e61111;
              &:hover {
                background: rgba(230, 17, 17, 0.1);
              }
            }
          }
        }
      }
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
    }
  }
}
</style>
