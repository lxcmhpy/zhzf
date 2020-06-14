<template>
  <div class="entry-exam">
    <div v-if="!startCountDown" class="page-contain">
      <el-card class="box-card outer-card">
        <el-row>
          <el-col :span="8">
            <div class="examinee-info">
              <div class="examinee-photo">
                <img
                  v-if="examineeData.personInfo && examineeData.personInfo.photoUrl"
                  :src="baseUrl + examineeData.personInfo.photoUrl || personImg"
                  width="214px"
                  height="298px"
                />
                <img v-else :src="personImg" width="214px" height="298px" />
              </div>
              <p
                v-if="examineeData.personInfo && examineeData.personInfo.personName"
                class="name"
              >{{ examineeData.personInfo.personName }}</p>
              <p
                v-if="examineeData.personInfo && examineeData.personInfo.oname"
                class="componey"
              >{{ examineeData.personInfo.oname }}</p>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="exam-info">
              <div class="time-info">
                <img src="../../../../static/images/img/exam/clocks.png" alt />
                <span
                  class="time-prompt"
                >{{ timeInfo.year }}年{{ timeInfo.month }}月{{ timeInfo.day }}日</span>
                <span class="count-down">{{ timeInfo.hours }}</span>
                <span class="count-down">{{ timeInfo.minutes }}</span>
              </div>
              <div class="entry-tip">* 考生可提前30分钟进入相应考试，等待考试开启</div>
              <div class="exam-list">
                <!-- 考试列表 -->
                <div
                  class="exam-item"
                  v-for="exam in examineeData.personExamInfo"
                  :key="exam.examId"
                >
                  <div class="exam-desc">
                    <p class="name">{{ exam.examName }}</p>
                    <p class="time">考试时间：{{ exam.examBegin }} 至 {{ exam.examEnd }}</p>
                  </div>
                  <div class="exam-status">
                    <el-button
                      v-if="exam.examStatus == '1'"
                      type="primary"
                      class="entry-btn"
                      @click="entryExam(exam)"
                    >进入</el-button>
                    <p v-if="exam.examStatus == '2'" class="status-box finish">已交卷</p>
                    <p v-if="exam.examStatus == '0'" class="status-box wait">未开始</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 开始倒计时 -->
    <div v-if="startCountDown" class="count-contain">
      <el-card class="box-card count-card">
        <p class="name">交通运输工程监理工程师执业资格</p>
        <div v-if="startCount" class="time">
          <span>{{ countDownList }}后可进入</span>
        </div>
        <div v-if="!startCount" style="text-align:center;">
          <el-button type="primary" class="start-answer" @click="startAnswer">开始答题</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage.js";

export default {
  data() {
    return {
      examineeData: {},
      startCountDown: false,
      timeInfo: {
        year: "",
        month: "",
        day: "",
        hours: "",
        minutes: ""
      },
      intervalTime: null,
      countDownList: "",
      selectedExam: null,
      startCount: true,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      currentSysTime: new Date().getTime()
    };
  },
  computed: {
    examineeName() {
      return this.$route.query.name;
    },
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created() {
    this.getSystemTime();
    this.getExamineeInfo();
  },
  methods: {
    // 获取系统当前时间
    getSystemTime() {
      this.$store.dispatch("getSystemDate").then(
        res => {
          if (res) {
            this.currentSysTime = res;
            this.currentTimeCount(res);
            console.log(res);
            console.log(new Date().getTime());
            console.log(res - new Date().getTime());
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取考生信息
    getExamineeInfo() {
      this.$store.dispatch("getJoinExamPerson", this.examineeName).then(
        res => {
          if (res.code === 200) {
            this.setExamStatus(res.data.personExamInfo);
            this.examineeData = res.data;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取考试对应考试状态
    setExamStatus(examList) {
      if (examList && examList.length) {
        const promiseAll = [];
        examList.forEach(item => {
          const status = new Promise((resolve, reject) => {
            this.$store
              .dispatch("getPersonExamStatus", {
                examId: item.examId,
                loginName: this.examineeName
              })
              .then(
                res => {
                  if (res.code === 200) {
                    resolve(res.data);
                  } else {
                    reject(false);
                  }
                },
                err => {
                  reject(false);
                }
              );
          });
          promiseAll.push(status);
        });
        Promise.all(promiseAll).then(values => {
          if (values && values.length) {
            examList.forEach((item, index) => {
              item.examStatus = values[index] ? values[index] : "0";
            });
          }
        });
      }
    },
    // 进入考试
    entryExam(exam) {
      this.$store.dispatch("getSystemDate").then(
        res => {
          this.currentSysTime = res || new Date().getTime();
          this.selectedExam = exam;
          clearInterval(this.intervalTime);
          // 获取当前时间，考试结束时间
          let newTime = this.currentSysTime;
          // 对结束时间进行处理渲染到页面
          let endTime = new Date(exam.examEnd).getTime();
          let startTime = new Date(exam.examBegin).getTime();
          let diffTime = endTime - newTime;
          if (diffTime > 0) {
            const timeDiff = startTime - newTime;
            if (timeDiff > 30 * 60 * 1000) {
              this.$message({
                type: "warning",
                message: "只能提前30分钟进入考试"
              });
              return false;
            } else {
              this.startCountDown = true;
              if (timeDiff < 1) {
                this.startCount = false;
              } else {
                this.startCount = true;
                sessionStorage.setItem("StartCount", "true");
                let time = (startTime - newTime) / 1000;
                this.setCountDownTime(time);
                this.countDownFun(exam);
              }
            }
          } else {
            this.$message({ type: "warning", message: "考试已结束" });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 当前时间倒计时
    currentTimeCount(t) {
      const time = new Date(t);
      this.timeInfo.year = time.getFullYear();
      this.timeInfo.month = time.getMonth() + 1;
      this.timeInfo.day = this.timeFormat(time.getDate());
      this.timeInfo.hours = this.timeFormat(time.getHours());
      this.timeInfo.minutes = this.timeFormat(time.getMinutes());
      this.intervalTime = setInterval(() => {
        const currentTime = new Date(this.currentSysTime);
        this.timeInfo.hours = this.timeFormat(currentTime.getHours());
        this.timeInfo.minutes = this.timeFormat(currentTime.getMinutes());
        this.currentSysTime = this.currentSysTime + 10000;
      }, 10000);
    },
    // 倒计时方法
    countDownFun(exam) {
      this.intervalTime = setInterval(() => {
        // 获取当前时间，考试结束时间
        let newTime = this.currentSysTime;
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(exam.examBegin).getTime();
        let diffTime = endTime - newTime;
        this.countDownList = "";
        if (diffTime < 0 || diffTime === 0) {
          this.startCount = false;
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
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt((time % (60 * 60 * 24)) / 3600);
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
      let obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      };
      if (day > 0) {
        this.countDownList += obj.day + "天";
      }
      if (hou > 0) {
        this.countDownList += obj.hou + "时";
      }
      if (min > 0) {
        this.countDownList += obj.min + "分";
      }
      if (sec > 0) {
        this.countDownList += obj.sec + "秒";
      }
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    // 倒计时结束点击开始答题进入答题页面
    startAnswer() {
      this.$store
        .dispatch("checkEntryExam", {
          examperId: this.selectedExam.examperId,
          examId: this.selectedExam.examId
        })
        .then(
          res => {
            if (res.code === 200) {
              this.$router.push({
                path: "/startAnswer",
                query: {
                  pId: this.selectedExam.examperId,
                  eId: this.selectedExam.examId
                }
              });
              sessionStorage.setItem(
                "ExamUserInfo",
                JSON.stringify({
                  personInfo: this.examineeData.personInfo,
                  examInfo: this.selectedExam
                })
              );
              sessionStorage.removeItem("StartCount");
            }
          },
          err => {
            console.log(err);
            this.$message({ type: 'warning', message: err.msg || '' });
          }
        );
    }
  },
  destroyed() {
    clearInterval(this.intervalTime);
    sessionStorage.removeItem("StartCount");
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
}
.page-contain {
  margin: 56px 122px 96px;
  background-color: #fff;
  position: relative;
  .outer-card {
    border: none;
    background-color: #fff;
    background: url("../../../../static/images/img/exam/card_top.png") no-repeat;
    background-size: 25%;
    min-height: 620px;
  }
  .exam-info {
    min-height: 480px;
    .time-info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0 10px;
      .time-prompt {
        font-size: 18px;
        color: #f79e0f;
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
    .entry-tip {
      font-size: 14px;
      color: rgba(230, 17, 17, 1);
      line-height: 20px;
      text-align: center;
    }
    .exam-list {
      padding: 30px;
      .exam-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eef0f5;
        padding: 30px 0;
        .exam-desc {
          line-height: 48px;
          .name {
            font-size: 20px;
            font-weight: 600;
            color: rgba(32, 35, 42, 1);
          }
          .time {
            font-size: 14px;
            color: rgba(123, 123, 123, 1);
          }
        }
        .exam-status {
          .entry-btn {
            padding: 10px 30px;
          }
          .status-box {
            width: 90px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            &.finish {
              color: #4aaf99;
              background: rgba(74, 175, 167, 0.14);
            }
            &.wait {
              color: #7b7b7b;
              background: rgba(201, 201, 201, 0.25);
            }
          }
        }
      }
    }
  }
  .examinee-info {
    margin: 100px auto 80px;
    margin-left: 20px;
    position: relative;
    text-align: center;
    color: #7b7b7b;
    .name {
      font-size: 24px;
      font-weight: 600;
      margin: 30px auto 24px;
    }
    .componey {
      font-size: 20px;
    }
  }
}
.count-contain {
  position: relative;
  height: 100%;
  overflow: hidden;
  min-height: 400px;
  background: url("../../../../static/images/img/exam/count_down_bottom.png")
    no-repeat;
  background-position-y: bottom;
  background-position-x: right;
  background-size: 58%;
  .count-card {
    width: 40%;
    margin: 4% auto 0;
    .name {
      font-size: 32px;
      font-weight: 600;
      color: rgba(32, 35, 42, 1);
      margin: 80px auto 40px;
      text-align: center;
    }
    .time {
      width: 196px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      background: rgba(201, 201, 201, 0.25);
      margin: 20px auto;
      font-size: 16px;
      color: rgba(69, 115, 208, 1);
    }
    .start-answer {
      // margin: 20px auto;
      font-size: 16px;
      padding: 17px 65px;
    }
  }
}
</style>
