<template>
  <el-card class="box-card mark-card">
    <div class="page-content">
      <div class="top-handle">
        <div class="back-btn" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>返回
        </div>
      </div>
      <!-- 列表内容区域 -->
      <div v-if="tableLoading" class="content-wrap">
        <div v-for="(question, key, index) in questionList" :key="index">
          <div v-for="(item, qIndex) in question" :key="item.resultId">
            <div class="search-wrap">
              <div class="mark-total">{{ key }} {{qIndex + 1}}/{{question.length}}</div>
              <div class="mark-number">
                <div>
                  <span class="number">{{qIndex + 1}}</span>
                  <span class="name">{{ item.questionName }}</span>
                </div>
              </div>
            </div>
            <div class="outline-table">
              <div class="examinne-answer">
                <p>考生答案：</p>
                <p class="text">{{ item.resultAnswer }}</p>
                <div class="answer-result">
                  <span>应得分：{{ item.shouldScore }}分</span>
                  <el-form
                    class="result-form"
                    :model="scoreObj"
                    :rules="rules"
                    :inline="true"
                    label-width="100px"
                  >
                    <el-form-item label="实得分" :prop="item.resultId">
                      <el-input
                        v-if="changeScore"
                        v-model="scoreObj[item.resultId]"
                        @input="setInputVal(item.resultId)"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="question-analysisc">
                <p class="answer">
                  正确答案：
                  <span>{{ item.questionAnwser }}</span>
                </p>
                <p>试题解析：{{ item.questionAnalysis }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-btn">
        <el-button class="edit_btn" type="primary" @click="saveScore">
          <i class="iconfont law-save"></i>
          <br />保存
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { setToken } from "@/common/js/auth";

export default {
  data() {
    return {
      questionList: {},
      tableLoading: true,
      scoreObj: {},
      changeScore: true,
      rules: {}
    };
  },
  computed: {
    examperId() {
      return this.$route.query.examperId;
    },
    scorerInfo() {
      return JSON.parse(sessionStorage.getItem("ScorerUserInfo"));
    }
  },
  created() {
    this.getWaitScoreQuestion();
  },
  methods: {
    // 获取评分试题 examperId参考人ID，scorerId评分人ID
    getWaitScoreQuestion() {
      this.tableLoading = false;
      const loading = this.$loading({
        lock: true,
        text: "正在获取试题信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store
        .dispatch("getWaitScoreQuestion", {
          examperId: this.examperId,
          scorerId: this.scorerInfo.scorerId
        })
        .then(
          res => {
            loading.close();
            if (res.code === 200) {
              this.setTableData(res.data);
            }
          },
          err => {
            loading.close();
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
    },
    // 成绩输入框绑定值
    setInputVal(resultId) {
      this.changeScore = false;
      let actualScore = this.scoreObj[resultId];
      if (actualScore !== undefined && actualScore.length) {
        actualScore = actualScore.match(/\d+(\.\d{0,2})?/)
          ? actualScore.match(/\d+(\.\d{0,2})?/)[0]
          : "0";
        actualScore = `${actualScore - 0}`;
      }
      this.scoreObj[resultId] = actualScore;
      this.changeScore = true;
    },
    // 设置列表数据
    setTableData(data) {
      if (data && data.length) {
        data.forEach(item => {
          const validator = (item) => {
            return (rule, value, callback) => {
              if (this.scoreObj[item.resultId] - item.shouldScore > 0) {
                callback(new Error("应得分不能大于实得分"));
              } else {
                callback();
              }
            };
          };
          if (this.questionList[item.questionTypeName]) {
            this.questionList[item.questionTypeName].push(item);
            this.scoreObj[item.resultId] = item.actualScore;
            this.rules[item.resultId] = [
              { validator: validator(item), trigger: "blur" }
            ];
          } else {
            this.questionList[item.questionTypeName] = [item];
            this.scoreObj[item.resultId] = item.actualScore;
            this.rules[item.resultId] = [
              { validator: validator(item), trigger: "blur" }
            ];
          }
        });
      }
      this.tableLoading = true;
    },
    // 保存成绩
    saveScore() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存成绩",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      let result = "";
      for (const key in this.scoreObj) {
        result += `${key}@@${this.scoreObj[key]}##`;
      }
      result = result.substring(0, result.length - 2);
      this.$store
        .dispatch("saveScoreResult", {
          examperId: this.examperId,
          result: result,
          scorerId: this.scorerInfo.scorerId
        })
        .then(
          res => {
            loading.close();
            if (res.code === 200) {
              this.$message({ type: "success", message: "评分成功" });
              this.$router.go(-1);
            }
          },
          err => {
            loading.close();
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.mark-card {
  width: 100%;
  height: 100%;
  border: none;
  border-top: 14px solid #4573d0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #fff;
  >>> .el-card__body {
    position: relative;
    height: calc(100% - 40px);
    .el-table__body-wrapper {
      padding-bottom: 0;
    }
  }
  .page-content {
    height: 100%;
    position: relative;
    .top-handle {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      .back-btn {
        display: inline-block;
        cursor: pointer;
        color: #7b7b7b;
        .el-icon-arrow-left {
          margin-right: 6px;
        }
        &:hover {
          color: #4573d0;
        }
      }
    }
    .content-wrap {
      margin: 20px 0;
      height: calc(100% - 80px);
      overflow-y: scroll;
      .search-wrap {
        margin-bottom: 10px;
        .mark-total {
          font-size: 18px;
          color: #20232b;
        }
        .mark-number {
          margin: 30px 0;
          .number {
            display: inline-block;
            width: 34px;
            height: 20px;
            margin-right: 10px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            background: rgba(51, 114, 241, 1);
            border-radius: 8px 8px 8px 0px;
            color: #fff;
          }
          .name {
            font-size: 16px;
            font-weight: 600;
            color: rgba(32, 35, 43, 1);
          }
        }
      }
      .outline-table {
        // height: calc(100% - 70px);
        .examinne-answer {
          margin: 0 30px 20px;
          padding-top: 15px;
          border: 1px dashed rgb(151, 151, 151);
          font-size: 16px;
          line-height: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(69, 115, 208, 1);
          > p {
            padding: 0 20px;
          }
          .text {
            margin-bottom: 30px;
            height: 140px;
            overflow-y: scroll;
          }
        }
        .answer-result {
          height: 46px;
          line-height: 46px;
          color: #fff;
          background: rgba(51, 114, 241, 0.85);
          font-size: 14px;
          text-align: right;
          padding-bottom: 15px;
          .result-form {
            display: inline-block;
            >>> .el-form-item {
              margin-bottom: 0;
            }
            >>> .el-form-item__label {
              color: #fff;
              line-height: 46px;
              float: left;
            }
            >>> .el-form-item__content {
              margin-top: 3px;
            }
          }
        }
        .question-analysisc {
          background: #f7f7f7;
          padding: 20px;
          font-size: 14px;
          color: rgba(123, 123, 123, 1);
          line-height: 20px;
          margin-bottom: 30px;
          .answer {
            margin-bottom: 10px;
            > span {
              color: #2ac46d;
            }
          }
        }
      }
    }
    .select-btn {
      text-align: center;
      margin-top: 20px;
      .question-btn {
        padding: 12px 48px;
        border: 1px solid rgba(151, 151, 151, 1);
        font-size: 16px;
        font-weight: 600;
        color: rgba(123, 123, 123, 1);
      }
    }
  }
  .fixed-btn {
    position: fixed;
    right: 74px;
    bottom: 200px;
    .edit_btn {
      width: 48px;
      height: 48px;
      text-align: center;
      padding: 0;
      .iconfont {
        margin-right: 0;
      }
    }
  }
}
</style>
