<template>
  <div class="question-item" :class="{'noBorder': border}">
    <!-- 单选题 -->
    <div class="question-stem">
      <el-row :gutter="15">
        <el-col :span="question.questionPicture ? 16 : 24">
          <div class="stem-info">
            <p class="question-num" v-if="questionIndex !== undefined">{{questionIndex}}</p>
            <div class="question-cnt">
              <div class="question-desc">
                <span
                  v-if="questionLevel"
                  class="level-name"
                  :class="`level-${questionLevelNume.indexOf(questionLevel)}`"
                >{{questionLevel}}</span>
                {{question.questionName}}
              </div>
              <div
                class="question-option"
                v-for="(itemSon, index) in questionOptioList"
                :key="itemSon.optionNum"
              >
                <el-row>
                  <el-col :span="itemSon.optionPicture ? 16 : 24">
                    <!-- 单选&判断 -->
                    <el-radio
                      v-if="questionTypeTxt === 'radio'"
                      v-model="answer"
                      :label="itemSon.optionKey"
                      disabled
                    >{{itemSon.optionNum}}:{{itemSon.optionName}}</el-radio>
                    <!-- 复选 -->
                    <el-checkbox
                      v-if="questionTypeTxt === 'checkbox'"
                      :checked="itemSon.optionKey == '1'? true : false"
                      disabled
                    >{{itemSon.optionNum}}:{{itemSon.optionName}}</el-checkbox>
                  </el-col>
                  <el-col v-if="itemSon.showPicture" :span="8">
                    <div>
                      <el-image :src="itemSon.optionPicture" :key="index"></el-image>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-if="questionTypeTxt === 'essays'" style="width: 100%;">
                <el-input
                  v-if="question.personAnswer"
                  type="textarea"
                  :rows="8"
                  cols="100%"
                  v-model="question.personAnswer"
                  disabled
                ></el-input>
                <el-input
                  v-else
                  type="textarea"
                  :rows="8"
                  cols="100%"
                  v-model="question.answer"
                  disabled
                ></el-input>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="question.questionPicture" :span="8">
          <div class="stem-img">
            <el-image :src="questionPicture"></el-image>
            <a class="view-img" @click="viewImage(questionPicture)">查看大图</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="question-analysisc">
      <p class="answer">
        参考答案：
        <span>{{ getoptionKey(question) }}</span>
      </p>
      <p>试题解析：{{question.questionAnalysis}}</p>
      <div v-if="editable" class="edit-question" :class="{'isLocked': question.isLock !== '0'}">
        <div v-show="question.isLock === '0'" class="edit-btn">
          <span class="btn" @click="randomReplace">随机替换</span>
          <i class="split"></i>
        </div>
        <div v-show="question.isLock === '0'" class="edit-btn">
          <span class="btn" @click="selectReplace">选择替换</span>
          <i class="split"></i>
        </div>
        <div class="edit-btn">
          <span class="btn" @click="locked">{{ question.isLock === '0' ? '锁定' : '已锁定' }}</span>
        </div>
      </div>
    </div>
    <el-dialog title="查看大图" :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  name: "questionView",
  props: {
    question: {
      type: Object,
      default: () => {},
      required: true
    },
    questionType: {
      type: String,
      default: ""
    },
    questionIndex: {
      type: Number
    },
    border: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    questionLevel: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      answer: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      questionLevelNume: ["简单", "一般", "困难"],
      questionPicture: '',
      questionOptioList: []
    };
  },
  computed: {
    questionTypeTxt() {
      let txt = "radio";
      let type = this.questionType;
      switch (this.questionType) {
        case "单选题":
        case "判断题":
          txt = "radio";
          break;
        case "多选题":
          txt = "checkbox";
          break;
        case "简答题":
        case "论述题":
          txt = "essays";
          break;
      }
      return txt;
    },
  },
  mounted() {
    this.getImageUrl();
  },
  methods: {
    // 获取题目图片
    getImageUrl(){
      if (this.question.questionPicture) {
        this.$util.com_getFileStream(this.question.questionPicture).then( res => {
          this.questionPicture = res;
        });
      }
      if(this.question.optionList && this.question.optionList.length){
        let optionLists = JSON.parse(JSON.stringify(this.question.optionList));
        optionLists.forEach(item => {
          item.showPicture = false;
          if(item.optionPicture){
            this.$util.com_getFileStream(item.optionPicture).then( res => {
              item.optionPicture = res;
              item.showPicture = true;
            });
          }
        })
        this.questionOptioList = [].concat(optionLists);
      }
    },
    // 获取题目选项图片
    async getOptipnImageUrl(imgId){
      try{
        let imgUrl = await this.$util.com_getFileStream(imgId);
        return imgUrl;
      }catch(err){
        return '';
      }
    },
    // 查看大图
    viewImage(src) {
      this.dialogImageUrl = src;
      this.dialogVisible = true;
    },
    // 获取正确答案
    getoptionKey(item) {
      let answer = [];
      if (
        this.questionTypeTxt === "radio" ||
        this.questionTypeTxt === "checkbox"
      ) {
        if (item.optionList && item.optionList.length) {
          item.optionList.forEach(option => {
            if (option.optionKey === "1") {
              answer.push(option.optionNum);
            }
          });
        }
        if (item.answer) {
          return item.answer;
        } else {
          return answer.join(", ");
        }
      } else {
        return item.answer;
      }
    },
    // 随机替换
    randomReplace() {
      if (this.question.isLock === "1") {
        this.$alert(res.message, "该试题已被锁定，不能替换!", {
          confirmButtonText: "确定"
        });
        return false;
      }
      this.$confirm(`确认随机替换该试题?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: `正在随机替换`,
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          this.$store
            .dispatch("randomQuestion", { pqId: this.question.pqId })
            .then(
              res => {
                loading.close();
                if (res.code === 200) {
                  this.$emit("randomSuccess", {
                    pqId: this.question.pqId,
                    data: res.data
                  });
                  this.$message({ type: "success", message: `替换成功!` });
                } else {
                  this.$message({ type: "error", message: `替换失败!` });
                }
              },
              err => {
                loading.close();
                // this.$message({ type: "error", message: err.msg || "" });
              }
            );
        })
        .catch(() => {});
    },
    // 选择替换
    selectReplace() {
      this.$emit("randomQuestion", this.question);
    },
    // 锁定
    locked() {
      let type = this.question.isLock !== "0";
      let tipTxt = type ? "解锁" : "锁定";
      this.$confirm(`确认${tipTxt}该试题?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: `正在${tipTxt}`,
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          this.$store
            .dispatch("changeQuestionLock", {
              pqId: this.question.pqId,
              unLock: type
            })
            .then(
              res => {
                loading.close();
                if (res.code == "200") {
                  this.question.isLock = type ? "0" : "1";
                  this.$message({ type: "success", message: `${tipTxt}成功!` });
                } else {
                  this.$message({ type: "error", message: `${tipTxt}失败!` });
                }
              },
              err => {
                loading.close();
                // this.$message({ type: "error", message: err.msg || "" });
              }
            );
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.question-item {
  position: relative;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  &.locked {
    border: 1px solid red;
  }
  &.noBorder {
    border: none;
    margin-bottom: 0;
  }
  .stem-info {
    display: flex;
    padding: 20px;
    .question-num {
      height: 22px;
      line-height: 22px;
      padding: 0 8px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: rgba(51, 114, 241, 1);
      border-radius: 8px 8px 8px 0px;
    }
    .question-cnt {
      width: 100%;
      margin-left: 10px;
      .question-desc {
        font-size: 16px;
        font-weight: 600;
        color: rgba(32, 35, 43, 1);
        line-height: 22px;
        margin-bottom: 10px;
      }
      .question-option {
        margin: 20px 0;
        >>> .el-radio,
        >>> .el-checkbox {
          color: #000;
          width: 100%;
          font-size: 16px;
          font-weight: bold !important;
          .el-radio__input{
            vertical-align: top;
          }
          .el-radio__label{
            display: inline-block;
            width: calc(100% - 30px);
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: break-spaces;
          }
        }
        >>> .el-radio__input.is-disabled + span.el-radio__label,
        >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
          font-size: 16px;
          color: #000;
        }
        >>> .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
          &:after {
            border-color: #20232b;
          }
        }
        >>> .el-radio__input {
          .el-radio__inner {
            width: 16px;
            height: 16px;
            &:after {
              width: 6px;
              height: 6px;
              background-color: #20232b;
            }
          }
        }
        .option-img {
          display: inline-block;
          width: 30%;
        }
      }
    }
  }
  .question-analysisc {
    background: #f7f7f7;
    padding: 20px;
    font-size: 14px;
    color: rgba(123, 123, 123, 1);
    line-height: 20px;
    .answer {
      margin-bottom: 10px;
      > span {
        color: #2ac46d;
      }
    }
    .edit-question {
      height: 38px;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: rgba(74, 175, 167, 0.85);
      &.isLocked {
        background: rgba(224, 32, 32, 0.85);
        text-align: center;
      }
      .edit-btn {
        display: inline-block;
        width: 33%;
        text-align: center;
        line-height: 38px;
        color: #fff;
        .btn {
          display: inline-block;
          padding: 0px 30%;
          cursor: pointer;
          &:hover {
            color: #000;
          }
        }
        .split {
          display: inline-block;
          width: 1px;
          height: 18px;
          background: #fff;
          float: right;
          margin-top: 10px;
        }
      }
    }
  }
  .stem-img {
    padding: 20px;
    text-align: center;
    .view-img {
      display: inline-block;
      color: #7b7b7b;
      font-size: 12px;
      margin: 10px 0;
      cursor: pointer;
    }
  }
  .level-name {
    display: inline-block;
    width: 44px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(238, 238, 238, 1);
    color: #fff;
    &.level-0 {
      background: rgba(244, 178, 142, 1);
    }
    &.level-1 {
      background: rgba(250, 84, 28, 1);
    }
    &.level-2 {
      background: rgba(135, 20, 0, 1);
    }
  }
}
</style>