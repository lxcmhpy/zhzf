<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="home-wrap">
      <div class="top-wrap">
        <el-card class="top-card">
          <div class="current-day">{{ currentDay }}</div>
          <el-row>
            <el-col :span="10">
              <div class="user-info">
                <el-image :src="personImg" class="user-avatar"></el-image>
                <div class="user-work">
                  <p class="name">{{ UserInfo.nickName }}</p>
                  <p class="work">
                    <span>{{ UserInfo.propertyEnName }}</span>
                    <i v-if="UserInfo.propertyEnName" class="split">|</i>
                    <span style="color:#979797;">{{ UserInfo.organName }}</span>
                  </p>
                </div>
              </div>
            </el-col>
            <el-col v-if="pageData.perosnInfo" :span="12" style="margin-top: 20px; text-align:center;">
              <!-- <div class="credits-item">
                <p class="num">{{ pageData.perosnInfo.allRank }}</p>
                <p class="item-title">学分排名</p>
              </div> -->
              <div v-if="pageData.perosnInfo.yearSumScores !== undefined" class="credits-item">
                <p class="num">{{ pageData.perosnInfo.yearSumScores || 0 }}</p>
                <p class="item-title">本年总学分</p>
              </div>
              <div v-if="pageData.perosnInfo.daySumScores !== undefined" class="credits-item">
                <p class="num">{{ pageData.perosnInfo.daySumScores || 0 }}</p>
                <p class="item-title">日常学分</p>
              </div>
              <div v-if="pageData.perosnInfo.trainSumScores !== undefined" class="credits-item">
                <p class="num">{{ pageData.perosnInfo.trainSumScores || 0 }}</p>
                <p class="item-title">培训学分</p>
              </div>
            </el-col>
          </el-row>
          <i class="bottom-circle small"></i>
          <i class="bottom-circle"></i>
        </el-card>
      </div>
      <div class="course-wrap">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="card-title">日常学习</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="jumpAssignPage('/daily-classroom')">更多>>></el-button>
              </div>
              <div
                class="card-content"
                v-loading="lessonLoading"
                element-loading-spinner="car-loading"
                element-loading-text="加载中...">
                <!-- 课程列表 -->
                <div v-if="!pageData.dayStudyInfo || !pageData.dayStudyInfo.length" class="no-data-prompt">暂无数据</div>
                <div
                  v-else
                  class="course-item"
                  v-for="lesson in pageData.dayStudyInfo"
                  :key="lesson.lessonId">
                  <el-row type="flex" :gutter="20" class="item-info">
                    <el-col :span="6">
                      <el-image class="course-cover-img" :src="lesson.lessonPic || lessonDefaultPic">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </el-col>
                    <el-col :span="12">
                      <p class="course-name">{{ lesson.lessonName }}</p>
                      <p class="course-create">
                        <span><i class="create-icon el-icon-user-solid" size="small"></i>{{ lesson.publicUserName }}</span>
                        <span><i class="create-icon iconfont law-shijian" size="small"></i>{{ lesson.publicTime }}</span>
                      </p>
                    </el-col>
                    <el-col :span="5" style="text-align:right;">
                      <el-button type="primary" @click="startStudy(lesson)">开始学习</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="card-title">培训任务</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="jumpAssignPage('/my-training')">更多>>></el-button>
              </div>
              <div
                class="card-content"
                v-loading="lessonLoading"
                element-loading-spinner="car-loading"
                element-loading-text="加载中...">
                <!-- 培训任务 -->
                <div v-if="!pageData.trainInfo || !pageData.trainInfo.length" class="no-data-prompt">暂无数据</div>
                <div
                  v-else
                  class="task-item"
                  v-for="train in pageData.trainInfo"
                  :key="train.trainId">
                  <p class="task-name">{{ train.trainName }}</p>
                  <p class="task-time">
                    <i class="iconfont law-shijian" size="small"></i>
                    <span>{{ train.beginTime }} - {{ train.endTime }}</span>
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getAllDailyLessonPage, getAllTrainPage, getCreditsRanking } from '@/api/trained';

export default {
  components: {},
  data() {
    return {
      currentDay: "",
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      lessonDefaultPic: '@/../static/images/img/trained/lesson_default.jpg',
      lessonTableData: [],
      searchDailyLesson: { current: 1, size: 10, total: 0 },
      lessonLoading: false,
      trainTableData: [],
      searchTrain: { current: 1, size: 10, total: 0 },
      trainLoading: false,
      pageData: {}
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
    baseUrl(){
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created() {
    this.getCurrentDay();
    // this.getDailyLesson();
    // this.getTrainList();
    this.getCreditsRank();
  },
  methods: {
    // 获取当前时间
    getCurrentDay() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var day = date.getDay();
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var week = weeks[day];
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentDay =
        year + "年" + month + "月" + strDate + "日" + "    " + week;
    },
    // 获取学分统计
    getCreditsRank(){
      const loading = this.$loading({
        lock: true,
        text: "正在获取信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      getCreditsRanking({ idNo: this.UserInfo.idNumber }).then(res => {
        loading.close();
        if(res.code === 200){
          if(res.data.dayStudyInfo && res.data.dayStudyInfo.length){
            res.data.dayStudyInfo.forEach(item => {
              if(item.lessonPic){
                item.lessonPic = this.baseUrl + item.lessonPic;
              }
            });
          }
          this.pageData = res.data;
          if(res.data.perosnInfo.picture){
            this.personImg = this.baseUrl + res.data.perosnInfo.picture;
          }
        }
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    },
    // 获取日常课程
    getDailyLesson(){
      this.lessonLoading = true;
      let data = {
        current: this.searchDailyLesson.current,
        size: this.searchDailyLesson.size,
        idNo: this.UserInfo.idNumber
      };
      getAllDailyLessonPage(data).then(
        res => {
          this.lessonLoading = false;
          if (res.code === 200) {
            this.lessonTableData = res.data.data.records;
            this.searchDailyLesson.total = res.data.data.total;
            this.lessonTableData.forEach(item => {
              if(item.lessonPic){
                item.lessonPic = this.baseUrl + item.lessonPic;
              }
            });
          }
        },
        err => {
          this.lessonLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 日常课程开始学习
    startStudy(row){
      this.$router.push({
        name: "CourseDetails",
        params: {
          lessonId: row.lessonId,
          perId: row.personLessonId
        }
      });
    },
    // 获取培训列表
    getTrainList(){
      this.trainLoading = true;
      let data = {
        current: this.searchTrain.current,
        size: this.searchTrain.size,
        idNo: this.UserInfo.idNumber
      };
      getAllTrainPage(data).then(
        res => {
          this.trainLoading = false;
          if (res.code === 200) {
            this.trainTableData = res.data.data;
            this.searchTrain.total = res.data.length;
          }
        },
        err => {
          this.trainLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 查看更多
    jumpAssignPage(path){
      this.$router.push({ path: path });
    }
  }
};
</script>

<style  lang="scss" scoped>
.home-wrap {
  position: relative;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .user-avatar {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px 24px 20px 30px;
  }
  .top-wrap {
    margin-bottom: 20px;
    .user-info{
      display: flex;
      align-items: center;
      .user-work{
        .name{
          font-size: 18px;
          font-weight: bold;
          color: #20232B;
          line-height: 40px;
        }
        .work{
          font-size: 14px;
          color: #20232B;
          .split{
            font-style: initial;
            margin: 0 15px;
            color: #979797;
          }
        }
      }
    }
    .top-card{
      position: relative;
      .current-day{
        background: url('../../../static/images/img/trained/current_day.png') no-repeat;
        width: 174px;
        height: 40px;
        text-align: center;
        padding-left: 28px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
      }
      .credits-item{
        display: flex;
        margin: 20px;
        font-size: 16px;
        color: #7B7B7B;
        display: inline-block;
        .num{
          font-size: 48px;
          color: #FA6400;
          margin-bottom: 10px;
        }
      }
    }
    &::before{
      content: '';
      width: 200px;
      height: 18px;
      display: inline-block;
      position: absolute;
      background: #EBF4FE;
      z-index: 100;
      border-bottom-right-radius: 220%;
    }
    .bottom-circle{
      display: inline-block;
      width: 260px;
      height: 52px;
      position: absolute;
      bottom: -32px;
      background: rgba(224,241,243, .5);
      border-top-right-radius: 100%;
      border-top-left-radius: 100%;
      right: 50px;
      &.small{
        width: 160px;
        right: 460px;
        height: 42px;
      }
    }
  }
  .course-wrap{
    position: relative;
    height: calc(100% - 202px);
    .card-title{
      display: inline-block;
      padding-left: 8px;
      border-left: 4px solid #4573D0;
      font-size: 20px;
      color: #20232B;
      font-weight: bold;
    }
    >>>.el-row, >>>.el-col, >>>.el-card{
      height: 100%;
    }
    >>>.el-card__body{
      height: calc(100% - 98px);
      overflow-y: scroll;
    }
    .card-content{
      min-height: 200px;
      .course-cover-img {
        display: flex;
        width: 100%;
        height: 132px;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      }
      .course-item{
        padding: 20px 0;
        border-bottom: 1px solid #EEF0F5;
        .item-info{
          display: flex;
          align-items: center;
        }
        .course-name{
          font-size: 14px;
          font-weight: bold;
          color: #20222C;
          margin-bottom: 20px;
        }
        .course-create{
          font-size: 14px;
          color: #7B7B7B;
          >span{
            display: inline-block;
            width: 34%;
            margin-right: 20px;
          }
          .create-icon{
            margin-right: 8px;
          }
        }
      }
      .iconfont{
        font-size: 14px;
      }
      .task-item{
        padding: 20px 0;
        font-size: 14px;
        .task-name{
          color: #20222C;
        }
        .task-time{
          color: #7B7B7B;
          margin-top: 10px;
        }
      }
      .no-data-prompt{
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
    }
  }
}
</style>
