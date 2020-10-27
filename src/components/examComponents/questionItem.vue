<template>
  <div class="question-item">
    <div
      class="question-stem"
      onselectstart="return false"
      oncopy="return false"
    >
      <el-row>
        <el-col :span="question.questionPicture ? 16 : 24">
          <div class="stem-info">
            <p
              class="question-num"
              :style="{ height: fontSize + 'px', lineHeight: fontSize + 'px' }"
            >
              {{ question.orderNum }}
            </p>
            <div class="question-cnt">
              <div class="question-desc" :style="fontStyle">
                {{ question.questionName }}
                <!-- {{ question.questionName }}（{{ question.score }}分） -->
              </div>
              <div
                v-if="
                  question.questionTypeName === '单选题' ||
                  question.questionTypeName === '判断题'
                "
              >
                <div
                  v-for="(item, index) in questionOptioList"
                  :key="item.pqOptionId"
                  class="question-option"
                >
                  <div
                    class="answer-radio"
                    :style="{
                      fontSize: fontSize + 'px',
                      lineHeight: fontSize + 'px',
                    }"
                    @click="
                      answer = index;
                      changeSelect(item, '1');
                    "
                  >
                    <i
                      class="radio-icon"
                      :class="{ 'el-icon-success': answer === index }"
                      :style="{
                        fontSize: fontSize > 18 ? fontSize + 'px' : '18px',
                        width: fontSize > 18 ? fontSize + 'px' : '18px',
                        height: fontSize > 18 ? fontSize + 'px' : '18px',
                      }"
                    ></i>
                    <span>{{ `${item.optionNum}：${item.optionName}` }}</span>
                  </div>
                  <div v-if="item.showPicture" class="option-img">
                    <el-image :src="item.url"></el-image>
                  </div>
                </div>
              </div>
              <div v-if="question.questionTypeName === '多选题'">
                <el-checkbox-group v-model="defaultChecked">
                  <div
                    v-for="item in questionOptioList"
                    :key="item.pqOptionId"
                    class="question-option"
                  >
                    <el-checkbox
                      class="checkbox-option"
                      :label="item.pqOptionId"
                      :style="{
                        fontSize: fontSize + 'px',
                        lineHeight: fontSize + 'px',
                      }"
                      @change="changeSelect(item, '2')"
                    >
                      {{ `${item.optionNum}：${item.optionName}` }}</el-checkbox
                    >
                    <div v-if="item.showPicture" class="option-img">
                      <el-image :src="item.url"></el-image>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
              <div
                v-if="
                  question.questionTypeName === '简答题' ||
                  question.questionTypeName === '论述题'
                "
                style="width: 100%"
              >
                <el-input
                  type="textarea"
                  :rows="8"
                  cols="100%"
                  placeholder="请输入答案"
                  v-model="question.answer"
                  @change="changeSelect(question, '3')"
                ></el-input>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="question.questionPicture" :span="8">
          <div class="stem-img">
            <el-image :src="questionStemImage"></el-image>
            <a class="view-img" @click="viewImage(questionStemImage)"
              >查看大图</a
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="查看大图" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  name: "pageDetail",
  props: {
    showAnalysis: {
      type: Boolean,
      default: false,
    },
    question: {
      type: Object,
      default: () => {},
      required: true,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      answer: "",
      dialogImageUrl: "",
      dialogVisible: false,
      defaultChecked: [],
      questionStemImage: null,
      questionOptioList: []
    };
  },
  watch: {
    "question.pqId": function (newVal, oldVal) {
      this.shwoDefaultVal();
    },
  },
  created() {
    this.shwoDefaultVal();
  },
  computed: {
    fontStyle() {
      return {
        fontSize: this.fontSize + "px",
        lineHeight: this.fontSize + 6 + "px",
      };
    },
  },
  mounted() {},
  methods: {
    // 选中项回显
    shwoDefaultVal() {
      this.answer = null;
      let answer = [];
      if (
        this.questionTypeName !== "简答题" &&
        this.questionTypeName !== "论述题"
      ) {
        answer = this.question.answer ? this.question.answer.split(",") : [];
      }
      if(this.question.questionPicture){
        this.$util.com_getFileStream(this.question.questionPicture).then((res) => {
            this.questionStemImage = res;
        });
      }
      this.defaultChecked.splice(0, this.defaultChecked.length);
      if (this.question.listPo && this.question.listPo.length) {
        let optioLists = JSON.parse(JSON.stringify(this.question.listPo));
        optioLists.forEach((item, index) => {
          item.optionKey = "0";
          item.showPicture = false;
          if (answer.length && answer.indexOf(item.optionNum) > -1) {
            item.checked = true;
            item.optionKey = "1";
            if (
              this.question.questionTypeName === "单选题" ||
              this.question.questionTypeName === "判断题"
            ) {
              this.answer = index;
            }
            if (this.question.questionTypeName === "多选题") {
              this.defaultChecked.push(item.pqOptionId);
            }
          }
          if (item.optionPicture) {
            this.$util.com_getFileStream(item.optionPicture).then((res) => {
              item.url = res;
              item.showPicture = true;
            });
          }
        });
        this.questionOptioList = [].concat(optioLists);
      }
    },
    // 查看大图
    viewImage(src) {
      this.dialogImageUrl = src;
      this.dialogVisible = true;
    },
    // 选择答案
    changeSelect(row, type) {
      let answer = "";
      if (type == "1") {
        this.question.listPo.forEach((item, index) => {
          item.optionKey = index === this.answer ? "1" : "0";
          item.checked = index === this.answer;
          if (index === this.answer) {
            answer = item.optionNum;
          }
        });
      } else if (type === "2") {
        this.question.listPo.forEach((item) => {
          if (item.optionNum == row.optionNum) {
            if (item.optionKey == undefined || item.optionKey == "1") {
              item.optionKey = "0";
              item.checked = false;
            } else {
              item.optionKey = "1";
              item.checked = true;
            }
          }
        });
        const checkedOption = this.question.listPo.filter(
          (item) => item.checked
        );
        answer = checkedOption.map((item) => item.optionNum).join(",");
      } else if (type === "3") {
        this.question.answer = this.question.answer.trim();
        if (this.question.answer && this.question.answer.length) {
          this.$emit("setQuestionStatus", this.question.answer);
          return;
        }
      }
      this.$emit("setQuestionStatus", answer);
    },
    clearAnswer() {
      this.answer = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.question-item {
  position: relative;

  // border:1px solid #E5E5E5;
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
        padding: 4px 0;

        &:hover {
          background: rgba(69, 115, 208, 0.15);
        }

        .radio-option {
          width: 100%;
        }

        .option-img {
          display: inline-block;
          width: 30%;
        }

        .answer-radio {
          cursor: pointer;
          display: block;

          .radio-icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 1px solid rgba(195, 195, 195, 1);
            border-radius: 100%;
            vertical-align: bottom;
            margin: 0 4px;
            box-sizing: border-box;

            &.checkbox {
              border-radius: 2px;
            }

            &.el-icon-success {
              font-size: 22px;
              color: #4573d0;
              border: none;
            }
          }

          > span {
            font-weight: 600 !important;
            word-break: break-all;
            white-space: normal;
          }

          ::marker {
            font-size: 0;
            display: none;
          }
        }

        >>> .el-checkbox {
          width: 100%;
          padding-left: 4px;
          display: flex;
          align-items: center;

          .el-checkbox__inner {
            width: 18px;
            height: 18px;

            &:after {
              height: 10px;
              left: 6px;
            }
          }

          .el-checkbox__label {
            font-size: inherit !important;
            color: #20232b;
            font-weight: 600;
            word-break: break-all;
            white-space: normal;
            line-height: initial;
          }
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
}
</style>
