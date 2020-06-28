<template>
  <div class="question-item">
    <div class="question-stem">
      <el-row>
        <el-col :span="question.questionPicture ? 16 : 24">
          <div class="stem-info">
            <p class="question-num">{{ question.orderNum }}</p>
            <div class="question-cnt">
              <div class="question-desc">
                （{{ question.score }}分）{{ question.questionName }}
              </div>
              <div v-if="question.questionTypeName === '单选题' || question.questionTypeName === '判断题'">
                <div
                  v-for="(item, index) in question.listPo"
                  :key="item.pqOptionId"
                  class="question-option">
                  <div
                    class="answer-radio"
                    @click="answer = index;changeSelect(item,'1')">
                    <i class="radio-icon" :class="{'el-icon-success': answer === index}"></i>
                    <span>{{ `${item.optionNum}：${item.optionName}` }}</span>
                  </div>
                  <div v-if="item.optionPicture" class="option-img">
                    <el-image :src="item.optionPicture"></el-image>
                  </div>
                </div>
              </div>
              <div v-if="question.questionTypeName === '多选题'">
                <el-checkbox-group v-model="defaultChecked">
                  <div
                    v-for="item in question.listPo"
                    :key="item.pqOptionId"
                    class="question-option">
                    <el-checkbox
                      class="checkbox-option"
                      :label="item.pqOptionId"
                      @change="changeSelect(item, '2')">{{ `${item.optionNum}：${item.optionName}` }}</el-checkbox>
                    <div v-if="item.optionPicture" class="option-img">
                      <el-image :src="baseUrl + item.optionPicture"></el-image>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>

              <div v-if="question.questionTypeName === '简答题' || question.questionTypeName === '论述题'" style="width: 100%;">
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
            <el-image :src="baseUrl + question.questionPicture"></el-image>
            <a class="view-img" @click="viewImage(question.questionPicture)">查看大图</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="查看大图" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  name: 'pageDetail',
  props: {
    showAnalysis: {
      type: Boolean,
      default: false
    },
    question: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      answer: '',
      dialogImageUrl: '',
      dialogVisible: false,
      defaultChecked: []
    }
  },
  watch: {
    'question.pqId': function(newVal, oldVal){
      this.shwoDefaultVal();
    }
  },
  created() {
    this.shwoDefaultVal();
  },
  computed: {
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  mounted () {},
  methods: {
    // 选中项回显
    shwoDefaultVal(){
      this.answer = null;
      let answer = [];
      if(this.questionTypeName !== '简答题' && this.questionTypeName !== '论述题'){
        answer = this.question.answer ? this.question.answer.split(',') : [];
      }
      this.defaultChecked.splice(0, this.defaultChecked.length);
      if(this.question.listPo && this.question.listPo.length){
        this.question.listPo.forEach((item, index) => {
          item.optionKey = '0';
          if(answer.length && answer.indexOf(item.optionNum) > -1){
            item.checked = true;
            item.optionKey = '1';
            if(this.question.questionTypeName === '单选题' || this.question.questionTypeName === '判断题'){
              this.answer = index;
            }
            if(this.question.questionTypeName === '多选题'){
              this.defaultChecked.push(item.pqOptionId);
            }
          }
        });
      }
    },
    // 查看大图
    viewImage(src){
      this.dialogImageUrl = this.baseUrl + src;
      this.dialogVisible = true;
    },
    // 选择答案
    changeSelect(row,type){
      let answer = '';
      if(type == '1'){
        this.question.listPo.forEach((item, index) =>{
          item.optionKey = index === this.answer ? '1' : '0';
          item.checked = index === this.answer;
          if(index === this.answer){
            answer = item.optionNum;
          }
        });
      }else if(type === '2'){
        this.question.listPo.forEach(item =>{
          if(item.optionNum == row.optionNum){
            if(item.optionKey == undefined || item.optionKey == '1'){
              item.optionKey = '0';
              item.checked = false;
            }else{
              item.optionKey = '1';
              item.checked = true;
            }
          }
        });
        const checkedOption = this.question.listPo.filter(item => item.checked);
        answer = checkedOption.map(item => item.optionNum).join(',');
      }else if(type === '3'){
        this.question.answer = this.question.answer.trim();
        if(this.question.answer && this.question.answer.length){
          this.$emit('setQuestionStatus', this.question.answer);
          return
        }
      }
      this.$emit('setQuestionStatus', answer);
    },
    clearAnswer(){
      this.answer = '';
    }
  }
 
}
</script>

<style lang="scss" scoped>
.question-item{
  position: relative;
  // border:1px solid #E5E5E5;
  .stem-info{
    display: flex;
    padding: 20px;
    .question-num{
      height:22px;
      line-height: 22px;
      padding: 0 8px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background:rgba(51,114,241,1);
      border-radius:8px 8px 8px 0px;
    }
    .question-cnt{
      width: 100%;
      margin-left: 10px;
      .question-desc{
        font-size: 16px;
        font-weight: 500;
        color: rgba(32,35,43,1);
        line-height: 22px;
        margin-bottom: 10px;
      }
      .question-option{
        margin: 20px 0;
        padding: 4px 0;
        &:hover{
          background:rgba(69,115,208,0.15);
        }
        .radio-option{
          width: 100%;
        }
        .option-img{
          display: inline-block;
          width: 30%;
        }
        .answer-radio{
          cursor: pointer;
          .radio-icon{
            display: inline-block;
            width: 18px;
            height: 18px;
            border:1px solid rgba(195,195,195,1);
            border-radius: 100%;
            vertical-align: bottom;
            margin: 0 4px;
            box-sizing: border-box;
            &.checkbox{
              border-radius: 2px;
            }
            &.el-icon-success{
              font-size: 22px;
              color: #4573D0;
              border: none;
            }
          }
        }
        >>>.el-checkbox{
          width: 100%;
          padding-left: 4px;
          .el-checkbox__inner{
            width: 18px;
            height: 18px;
            &:after{
              height: 10px;
              left: 6px;
            }
          }
          .el-checkbox__label{
            font-size: 16px;
            color: #20232B;
          }
        }
      }
    }
  }
  .stem-img{
    padding: 20px;
    text-align: center;
    .view-img{
      display: inline-block;
      color: #7B7B7B;
      font-size: 12px;
      margin: 10px 0;
      cursor: pointer;
    }
  }
}
</style>