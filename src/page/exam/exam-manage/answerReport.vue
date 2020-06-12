<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        title="答题报告"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="62%"
      >
        <div v-if="visible" class="question-total">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="answer-total">
                <p class="answer-label">
                  考试名称：
                  <span class="answer-info">{{ reportData.pageInfo.pageName }}</span>
                </p>
                <p class="answer-label">
                  答题人员：
                  <span class="answer-info">{{ queryData.name }}</span>
                </p>
                <div class="score-statistic">
                  <div class="score-info">
                    <p class="score-num total">{{ reportData.pageInfo.score }}</p>
                    <p>总分</p>
                    <i class="split-line"></i>
                  </div>
                  <div class="score-info p-l-20">
                    <p class="score-num qNum">{{ reportData.questionSum }}/{{ reportData.pageSum }}</p>
                    <p>题数</p>
                    <i class="split-line"></i>
                  </div>
                  <div class="score-info p-l-20">
                    <p class="score-num time">{{ reportData.useTime }}</p>
                    <p>答题用时(min)</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="show-score">
                <div class="actual-score">
                  <p class="score">{{ reportData.activeScore }}</p>
                  <p class="label">得分</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="question-table">
          <el-table
            ref="questionTable"
            :data="reportData.resultInfo"
          >
            <el-table-column label="题号" width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="questionLevelName" label="难度" width="80px" align="center"></el-table-column>
            <el-table-column prop="questionTypeName" label="题型" width="100px" align="center"></el-table-column>
            <el-table-column prop="score" label="分值" min-width="80px" align="center"></el-table-column>
            <el-table-column prop="answer" label="正确答案" min-width="120px" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.questionTypeName !== '简答题' && scope.row.questionTypeName !== '论述题'">
                  <span>{{ scope.row.answer }}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="personAnswer" label="考生答案" min-width="120px" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.questionTypeName !== '简答题' && scope.row.questionTypeName !== '论述题'"
                  class="person-answer"
                  :class="{'error': scope.row.personAnswer !== scope.row.answer}">{{ scope.row.personAnswer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="personScore" label="得分" min-width="100px" align="center"></el-table-column>
            <el-table-column label="解析" align="center" width="120px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="toogleExpand(scope.row)"
                >{{ scope.row.expend ? '收起' : '查看' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="scope">
                <div>{{scope.row.questionTypeName}}</div>
                <questionView
                  v-if="scope.row.expend"
                  :question="scope.row"
                  :border="true"
                  :questionType="scope.row.questionTypeName" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import questionView from '@/page/exam/common/questionView'

export default {
  mixins: [mixinPerson],
  data() {
    return {
      visible: false,
      dialogtitle: "",
      queryData: {},
      reportData: {}
    };
  },
  components: { questionView },
  methods: {
    showModal(data) {
      this.queryData = data;
      this.getReport();
    },
    // 获取答题详情
    getReport(){
      const loading = this.$loading({
        lock: true,
        text: "正在获取答题报告",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      const queryData = {
        examId: this.queryData.examId,
        examperId: this.queryData.pId
      }
      this.$store.dispatch('getExamAnswerReport', queryData).then(res => {
        loading.close();
        if(res.code === 200){
          if(res.data.code === 200){
            this.reportData = res.data.data;
            this.visible = true;
          }else{
            this.$confirm(res.data.msg, "提示", {
              confirmButtonText: "确定",
              iconClass: "iconfont law-success",
              customClass: "custom-confirm",
              showCancelButton: false
            })
            .then(() => {})
            .catch(() => {});
          }
        }
      }, err =>  {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' })
      })
    },
    toogleExpand(row) {
      let $table = this.$refs.questionTable;
      row.optionList = row.pageOptionList;
      this.reportData.resultInfo.map(item => {
        if (item.pqId !== row.pqId) {
          item.expend = false;
          $table.toggleRowExpansion(item, false);
        } else {
          item.expend = !item.expend;
        }
      });
      $table.toggleRowExpansion(row);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      // this.getPageAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getPageAllInfo();
    },
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-page-dialog {
  >>> .el-dialog {
    min-width: 976px;
    max-width: 1064px;
  }
  .question-total {
    margin-bottom: 40px;
    .answer-total {
      padding: 0 30px;
      .answer-label {
        font-size: 24px;
        color: #999;
        margin-bottom: 26px;
        .answer-info {
          color: #20232b;
        }
      }
      .score-statistic {
        margin: 40px 0;
        font-size: 16px;
        color: #999;
        .score-info {
          display: inline-block;
          position: relative;
          padding-right: 30px;
          text-align: center;
          &.p-l-20 {
            padding-left: 30px;
          }
          .score-num {
            font-size: 36px;
            margin-bottom: 10px;
            &.total {
              color: #4674d0;
            }
            &.qNum {
              color: #45b536;
            }
            &.time {
              color: #ed7c13;
            }
          }
          .split-line {
            display: inline-block;
            width: 2px;
            background: #f2f2f2;
            height: 32px;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
    .show-score {
      position: relative;
      width: 310px;
      height: 218px;
      margin: 0 auto;
      background: url("../../../../static/images/img/exam/score_bg.png")
        no-repeat;
      background-size: 100%;
      .actual-score {
        position: absolute;
        font-size: 18px;
        color: #fff;
        text-align: center;
        top: 38px;
        width: 96%;
        .score {
          font-size: 72px;
          font-weight: 500;
          margin-bottom: 10px;
        }
      }
    }
  }
  .question-table{
    .person-answer{
      &.error{
        color: #E84241;
      }
    }
  }
}
</style>