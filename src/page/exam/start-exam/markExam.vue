<template>
  <el-card class="box-card exam-list-card">
    <div class="exam-wrap">
      <!-- 考试列表 -->
      <div class="exam-list">
        <p v-if="!examList.length" class="no-list">暂无可评分考试</p>
        <div
          class="exam-item"
          v-for="exam in examList"
          :key="exam.examId">
          <el-row type="flex" style="align-items: center;">
            <el-col :span="21" class="exam-col exam-info">
              <p class="exam-name">{{ exam.examName }}</p>
              <p class="exam-statis">
                <span>考试人数：{{ exam.examSum }}</span>
                <span>已评分人数：{{ exam.scoringNum }}</span>
                <span>未评分人数：{{ exam.examSum - exam.scoringNum }}</span>
                <span></span>
              </p>
              <p class="exam-time">
                考试时间：{{ exam.examBegin }}
                <span class="split">至</span>
                {{ exam.examEnd }}
              </p>
            </el-col>
            <el-col :span="3" class="exam-col exam-status">
              <el-button type="primary" class="entry-btn" @click="entryMarkList(exam.examId)">待评分</el-button>
              <!-- <span class="entry-btn finish">已评分</span>
              <span class="entry-btn wait">未开始</span> -->
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { setToken } from "@/common/js/auth";

export default {
  data() {
    return {
      examList: []
    };
  },
  computed: {
    scorerInfo(){
      return JSON.parse(sessionStorage.getItem('ScorerUserInfo'));
    }
  },
  created(){
    this.getWaitScoringExam();
  },
  methods: {
    // 获取评分考试
    getWaitScoringExam(){
      const loading = this.$loading({
        lock: true,
        text: "正在获取考试信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store.dispatch('getWaitScoringExam', this.scorerInfo.scorerId).then(res => {
        loading.close();
        if(res.code === 200){
          this.examList = res.data;
        }
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    },
    // 点击待评分进入待评分列表
    entryMarkList(id){
      this.$router.push({
        path: '/waitMark',
        query: {
          examId: id
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-list-card {
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  border: none;
  border-top: 14px solid #4573d0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #fff;
}
.exam-list {
  margin: 26px 126px;
  min-height: 280px;
  .no-list{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .exam-item {
    padding: 20px 30px;
    border-bottom: 1px solid #f0f1f6;
    .exam-name {
      font-size: 20px;
      font-weight: 600;
      color: rgba(32, 35, 42, 1);
      margin: 15px 0 20px;
    }
    .exam-statis {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 420px;
      height: 34px;
      padding: 0 20px;
      color: rgba(123, 123, 123, 1);
      background: rgba(252, 247, 234, 1);
    }
    .exam-time {
      line-height: 34px;
      color: rgba(123, 123, 123, 1);
      margin-top: 10px;
      .split {
        margin: 0 20px;
      }
    }
    .exam-status {
      text-align: center;
      .entry-btn {
        font-size: 14px;
        padding: 12px 40px;
        display: inline-block;
        &.finish {
          background: rgba(74, 175, 167, 0.14);
          color: #4aaf99;
          padding: 13px 41px;
        }
        &.wait {
          background: rgba(201, 201, 201, 0.25);
          color: #a7a7a7;
          padding: 13px 41px;
        }
      }
    }
  }
}
</style>
