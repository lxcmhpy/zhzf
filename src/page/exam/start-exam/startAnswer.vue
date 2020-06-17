<template>
  <div class="entry-exam">
    <el-row class="invigilator-wrap">
      <el-col :span="17" class="row-col">
        <div v-if="questionData && questionData.firstQuestion" class="exam-info question">
          <div class="header">
            <span>{{ questionData.firstQuestion.questionTypeName }}</span>
            <el-button
              v-if="!marked"
              type="text"
              icon="icon-sign"
              class="sign-question"
              @click="markedQuestion(true)"
            >标记该题</el-button>
            <el-button
              v-if="marked"
              type="text"
              icon="icon-marked"
              class="sign-question marked"
              @click="markedQuestion(false)"
            >已标记</el-button>
          </div>
          <div class="question-box">
            <questionItem
              ref="questionItem"
              :question="questionData.firstQuestion"
              @setQuestionStatus="setQuestionStatus"
            />
          </div>
          <div class="select-btn">
            <el-button
              class="question-btn"
              :disabled="currentGraph.orderNo === 1"
              @click="nextQuestion('prev')"
            >上一题</el-button>
            <el-button class="question-btn" @click="nextQuestion('next')" :disabled="nextDisabled">下一题</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="7" class="row-col">
        <div class="exam-info" style="padding: 20px 0; margin-left: 0;">
          <div class="answer-statistics">
            <div class="time-info">
              <img src="../../../../static/images/img/exam/clocks.png" alt />
              <span class="time-prompt">距离考试结束</span>
              <span class="count-down">{{ countTime.minutes }}</span>
              <span class="count-unit" style="margin-right:8px;">分</span>
              <span class="count-down">{{ countTime.second }}</span>
              <span class="count-unit">秒</span>
            </div>
            <div v-if="examPerInfo.personInfo" class="time-info pserson-info">
              <div class="examinee-photo">
                <img
                  v-if="examPerInfo.personInfo.photoUrl"
                  :src="baseUrl + examPerInfo.personInfo.photoUrl"
                  width="100px"
                  height="140px"
                />
                <img
                  v-else
                  :src="personImg"
                  width="100px"
                  height="140px"
                />
              </div>
              <div class="exam-person">
                <p class="name">{{ examPerInfo.personInfo.personName }}</p>
                <p class="componey">{{ examPerInfo.personInfo.oname }}</p>
              </div>
            </div>
            <div class="time-info exam-desc">
              <p v-if="examPerInfo.examInfo" class="exam-name">{{ examPerInfo.examInfo.examName }}</p>
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
              <div
                v-for="graph in questionData.graphInfo"
                :key="graph.paragraphId"
                class="question-class"
              >
                <div class="title">{{ graph.paragraphTypeName }}</div>
                <div v-if="graph.examResultList && graph.examResultList.length" class="question-wrap">
                  <a
                    v-for="num in graph.examResultList"
                    class="item"
                    :key="num.resultId"
                    :class="{
                      'sign': num.labelStatue === '1',
                      'finish': num.answer && num.labelStatue !== '1',
                      'current': num.resultId == questionData.firstQuestion.resultId}"
                    @click="currentGraph = num ;nextQuestion('', num.orderNo)"
                  >{{ num.orderNum }}</a>
                </div>
              </div>
            </div>
            <div class="submit-exam">
              <el-button
                type="primary"
                icon="el-icon-document-checked"
                class="entry-btn"
                @click="handPaper"
              >我要交卷</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import questionItem from "@/components/examComponents/questionItem";
import iLocalStroage from "@/common/js/localStroage";

export default {
  components: { questionItem },
  data() {
    return {
      questionData: {},
      marked: false,
      countTime: {
        minutes: "",
        second: ""
      },
      questionNumList: [],
      intervalTime: null,
      nextDisabled: false,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      currentSysTime: new Date().getTime(),
      currentGraph: {}
    };
  },
  computed: {
    examPerInfo() {
      return JSON.parse(sessionStorage.getItem("ExamUserInfo"));
    },
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created() {
    this.getSystemTime();
    this.getQuestionInfo();
  },
  methods: {
    // 获取系统当前时间
    getSystemTime() {
      this.$store.dispatch("getSystemDate").then(
        res => {
          if (res) {
            this.currentSysTime = res;
            this.startCountDown(res);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取考试内容
    getQuestionInfo() {
      const examInfo = {
        examperId: this.$route.query.pId,
        examId: this.$route.query.eId
      };
      const loading = this.$loading({
        lock: true,
        text: "正在获取题目",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store.dispatch("startQuestion", examInfo).then(
        res => {
          loading.close();
          if (res.code === 200 && res.data.firstQuestion) {
            this.questionData = res.data;
            this.questionData.firstQuestion.orderNo = 1;
            this.questionData.firstQuestion.listPo = this.questionData.firstQuestion.option_list;
            delete this.questionData.firstQuestion.option_list;
            this.setAllQuestionNum(res.data.graphInfo);
          }else{
            this.$message({ type: 'error', message: '获取题目失败' });
          }
        },
        err => {
          loading.close();
          this.$alert(err.msg || "获取题目失败", "提示", {
            confirmButtonText: "确定",
            customClass: "custom-confirm"
          })
            .then(() => {
              this.logoutSystem();
            })
            .catch(() => {
              this.logoutSystem();
            });
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
        this.currentGraph = this.questionNumList[0];
        this.currentGraph.answer = this.questionData.firstQuestion.answer;
        this.questionData.firstQuestion.resultId = this.currentGraph.resultId;
        this.questionData.firstQuestion.orderNum = this.currentGraph.orderNum;
      }
    },
    // 开始倒计时
    startCountDown(sysTime) {
      // 获取当前时间，考试结束时间
      let newTime = sysTime;
      // 对结束时间进行处理渲染到页面
      let endTime = new Date(this.examPerInfo.examInfo.examEnd).getTime();
      let diffTime = endTime - newTime;
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
        let newTime = this.currentSysTime;
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(examEnd).getTime();
        let diffTime = endTime - newTime;
        this.countDownList = "";
        if (diffTime < 0 || diffTime === 0) {
          this.$confirm("考试时间结束，当前已强制收卷，不允许作答！", "提示", {
            confirmButtonText: "确定",
            iconClass: "custom-remind",
            customClass: "custom-confirm",
            showCancelButton: false
          })
            .then(() => {
              this.logoutSystem();
            })
            .catch(() => {
              this.logoutSystem();
            });
          clearInterval(this.intervalTime);
        } else {
          let time = diffTime / 1000;
          this.setCountDownTime(time);
        }
        this.currentSysTime = this.currentSysTime + 1000;
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

    // 标记该题
    markedQuestion(mark) {
      this.marked = mark;
      this.currentGraph.labelStatue = mark ? "1" : "0";
    },
    // 下一题
    nextQuestion(dir, orderNo) {
      this.nextDisabled = false;
      this.marked = false;
      const answer = this.handleSubmitData();
      if (dir === "prev") {
        answer.orderNo = this.currentGraph.orderNo - 1;
      }
      if(dir === 'next'){
        if(this.currentGraph.orderNo === this.questionNumList.length){
          answer.orderNo = this.currentGraph.orderNo;
        }else{
          answer.orderNo = this.currentGraph.orderNo + 1;
        }
      }
      answer.preOrNext = `${this.currentGraph.orderNo},${answer.orderNo}`;
      if(orderNo !== undefined && orderNo > 0){
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
      this.$store.dispatch("getpersonExamQuestionNext", answer).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.$refs.questionItem.clearAnswer();
            if (
              res.data.data &&
              JSON.stringify(res.data.data) !== "{}"
            ) {
              this.currentGraph = this.questionNumList[number - 1];
              this.currentGraph.answer = res.data.data.answer;
              res.data.data.listPo = res.data.data.option_list;
              delete res.data.data.option_list;
              this.questionData.firstQuestion = res.data.data;
              this.questionData.firstQuestion.orderNo = number;
              this.questionData.firstQuestion.resultId = this.currentGraph.resultId;
              this.questionData.firstQuestion.orderNum = this.currentGraph.orderNum;
              let answer = res.data.data.answer;
              this.setQuestionStatus(answer);
            }
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 处理当前答题数据
    handleSubmitData() {
      const answer = JSON.parse(
        JSON.stringify(this.$refs.questionItem.question)
      );
      answer["examperId"] = this.$route.query.pId;
      answer["examId"] = this.$route.query.eId;
      answer["pqoList"] = JSON.stringify(answer.listPo);
      const personAnswer = [];
      const optionId = [];
      if (answer.listPo && answer.listPo.length) {
        answer.listPo.forEach(item => {
          if (item.optionKey === "1") {
            personAnswer.push(item.optionNum);
            optionId.push(item.pqOptionId);
          }
        });
        answer["answer"] = personAnswer.join(",");
        answer["optionId"] = optionId.join(",");
      }
      delete answer.listPo;
      return answer;
    },
    // 我要交卷
    handPaper() {
      const answered = this.questionNumList.filter(
        item => item.answer && item.answer.length
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
          this.$store.dispatch("getpersonExamQuestionNext", answer).then(
            res => {
              if (res.code === 200) {
                if (answer.orderNo === this.questionNumList.length) {
                  this.nextDisabled = true;
                }
                this.savePaper(loading);
              }else{
                loading.close();
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
    // 交卷
    savePaper(loading) {
      const submitData = {
        examperId: this.$route.query.pId,
        examId: this.$route.query.eId
      };
      this.$store.dispatch("getexamResultSubmit", submitData).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.$confirm("提交成功，预祝您考试顺利！", "提示", {
              confirmButtonText: "确定",
              iconClass: "iconfont law-success",
              customClass: "custom-confirm",
              showCancelButton: false
            })
              .then(() => {
                sessionStorage.removeItem("ExamUserInfo");
                sessionStorage.removeItem("StartCount");
                this.$router.push({
                  path: "/examineeEntry",
                  query: {
                    name: sessionStorage.getItem("ExamName")
                  }
                });
              })
              .catch(() => {});
          }
        },
        err => {
          loading.close();
          this.$confirm("提交失败，请稍后再试！", "提示", {
            confirmButtonText: "确定",
            iconClass: "custom-remind",
            customClass: "custom-confirm",
            showCancelButton: false
          }).catch(() => {});
        }
      );
    },
    // 左侧题目状态和右侧答题卡联动
    setQuestionStatus(checked) {
      this.currentGraph.answer = "";
      if (!this.marked) {
        this.currentGraph.answer = checked;
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
<style lang="scss">
.icon-sign,
.icon-marked {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  background: url("../../../../static/images/img/exam/sign.png");
  background-size: 100%;
  vertical-align: bottom;
}
.icon-marked {
  background: url("../../../../static/images/img/exam/marked.png");
  background-size: 100%;
}
</style>
<style lang="scss" scoped>
.entry-exam {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: -4px;
  overflow: scroll;
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
            .title {
              font-size: 16px;
              color: #20232a;
              margin-bottom: 20px;
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
          .entry-btn {
            width: 100%;
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
