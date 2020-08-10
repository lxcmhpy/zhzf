<template>
  <div class="com_searchAndpageBoxPadding">
    <div v-if="!startStudy" class="home-wrap">
      <div class="top-wrap">
        <el-card class="top-card">
          <el-row>
            <el-col :span="18">
              <div class="user-info">
                <el-image :src="lessonDefaultPic" class="course-cover"></el-image>
                <div class="user-work">
                  <p class="name">{{ lessonData.lessonName }}</p>
                  <p class="work">
                    <span>{{ lessonData.publicUserName }}</span>
                    <i class="split">|</i>
                    <span>发布于<span style="margin-left: 6px;">{{ lessonData.publicTime }}</span></span>
                    <i class="split">|</i>
                    <span>
                      已获学分
                      <span class="num">{{ lessonData.score || 0 }}</span>
                    </span>
                    <i class="split">|</i>
                    <span>
                      总学分
                      <span class="num">{{ lessonData.couCredits }}</span>
                    </span>
                  </p>
                  <div v-if="lessonData.progress" class="study-progress">
                    <el-progress :percentage="lessonData.progress"></el-progress>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6" style="margin-top: 20px; text-align:center;">
              <a class="learning-btn" @click="enterStudyPage">开始学习</a>
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
                <span class="card-title">课程目录</span>
              </div>
              <div class="card-content">
                <!-- 课程列表 -->
                <div class="course-item" v-for="(lesson, index) in lessonData.listVo" :key="lesson.couId">
                  <el-row type="flex" :gutter="20" class="item-info">
                    <el-col :span="2" style="display:flex;justify-content: center;">
                      <el-progress
                        type="circle"
                        :percentage="lesson.accProgress ? lesson.accProgress : 0"
                        :width="32"
                        :strokeWidth="4"
                        :format="showIndex(index + 1)"
                      ></el-progress>
                    </el-col>
                    <el-col :span="14">
                      <p class="course-name">{{ lesson.couName }}</p>
                    </el-col>
                    <el-col :span="4">
                      <p class="course-create">
                        <span>
                          <i class="create-icon el-icon-coin" size="small"></i>
                          {{ lesson.accCredit || 0 }}/{{ lesson.couCredits }}
                        </span>
                      </p>
                    </el-col>
                    <el-col :span="4">
                      <p class="course-create">
                        <span>
                          <i class="create-icon iconfont law-shijian" size="small"></i>
                          {{ lesson.couTime }}分钟
                        </span>
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div slot="header" class="clearfix">
                <span class="card-title">课程简介</span>
              </div>
              <div class="card-content">{{ lessonData.lessonComment }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="startStudy" class="course-list-wrap">
      <viewCourseware
        :courseList="lessonCourseList"
        :lessonName="lessonData.lessonName"
        @closeViewCourse="closeStudy" />
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import viewCourseware from './viewCourseware';
import { getDayCourseDetail, setPersonCourseRelation } from "@/api/trained";

export default {
  data() {
    return {
      lessonDefaultPic: "@/../static/images/img/trained/lesson_default.jpg",
      lessonData: {},
      startStudy: false,
      lessonCourseList: []
    };
  },
  components: { viewCourseware },
  computed: {
    queryData() {
      return {
        personLessonId: this.$route.params.perId,
        lessonId: this.$route.params.lessonId,
        idNo: this.UserInfo.idNumber
      };
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    }
  },
  created() {
    this.getCourserInfo();
  },
  methods: {
    // 课程进度显示
    showIndex(index) {
      return () => index;
    },
    // 获取课程信息
    getCourserInfo() {
      const loading = this.$loading({
        lock: true,
        text: "正在获取课程详情",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      getDayCourseDetail(this.queryData).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.lessonData = res.data.data;
            this.setCourseData(res.data.data.listVo);
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 处理课件数据
    setCourseData(data){
      if(data && data.length){
        data.forEach(item => {
          item['personLessonId'] = this.lessonData.personLessonId;
          item['flag'] = '0';
        });
        this.lessonCourseList = data;
      }
    },
    // 开始学习
    enterStudyPage(){
      if(this.lessonData.personLessonId){
        this.startStudy = true;
      }else{
        setPersonCourseRelation({ lessonId: this.lessonData.lessonId, idNo: this.UserInfo.idNumber }).then(res => {
          if(res.code === 200){
            this.setCourseData(res.data.data.listVo);
            this.startStudy = true;
          }
        }, err => {
          this.$message({ type: 'error', message: err.msg || '' });
        })
      }
    },
    // 从学习返回
    closeStudy(){
      this.getCourserInfo();
      this.startStudy = false;
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
  .course-cover {
    display: inline-block;
    width: 220px;
    height: 128px;
    margin: 20px 24px 20px 30px;
  }
  .top-wrap {
    margin-bottom: 20px;
    .user-info {
      display: flex;
      align-items: center;
      .user-work {
        flex: 1;
        .name {
          font-size: 18px;
          font-weight: bold;
          color: #20232b;
          line-height: 40px;
        }
        .work {
          font-size: 14px;
          color: #979797;
          .split {
            font-style: initial;
            margin: 0 15px;
            color: #979797;
          }
          .num {
            color: #fa6400;
            margin-left: 6px;
          }
        }
        .study-progress {
          margin-top: 52px;
          width: 50%;
          >>> .el-progress-bar__outer {
            background: rgba(74, 175, 167, 0.3);
          }
          >>> .el-progress-bar__inner {
            background: rgba(74, 175, 167, 1);
          }
        }
      }
    }
    .top-card {
      position: relative;
      .learning-btn {
        display: inline-block;
        width: 188px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(230, 73, 73, 1);
        color: #fff;
        cursor: pointer;
        margin-top: 44px;
        &:hover {
          background: #d93d3d;
        }
      }
    }
    &::before {
      content: "";
      width: 200px;
      height: 18px;
      display: inline-block;
      position: absolute;
      background: #ebf4fe;
      z-index: 100;
      border-bottom-right-radius: 220%;
    }
    .bottom-circle {
      display: inline-block;
      width: 260px;
      height: 52px;
      position: absolute;
      bottom: -32px;
      background: rgba(224, 241, 243, 0.5);
      border-top-right-radius: 100%;
      border-top-left-radius: 100%;
      right: 50px;
      &.small {
        width: 160px;
        right: 460px;
        height: 42px;
      }
    }
  }
  .course-wrap {
    position: relative;
    height: calc(100% - 238px);
    .card-title {
      display: inline-block;
      padding-left: 8px;
      border-left: 4px solid #4573d0;
      font-size: 20px;
      color: #20232b;
      font-weight: bold;
    }
    >>> .el-row,
    >>> .el-col,
    >>> .el-card {
      height: 100%;
    }
    >>> .el-card__body {
      height: calc(100% - 98px);
      overflow-y: scroll;
    }
    .card-content {
      font-size: 14px;
      color: #20222c;
      line-height: 24px;
      .course-item {
        padding: 14px 0;
        border-bottom: 1px solid #eef0f5;
        .item-info {
          align-items: center;
          font-size: 14px;
          .course-name {
            font-weight: bold;
            color: #20222c;
          }
        }
      }
      .course-create {
        .el-icon-coin {
          font-size: 16px;
          font-weight: bold;
          color: #fa6400;
          margin-right: 8px;
        }
        .iconfont {
          font-size: 16px;
          color: #3fa6f0;
          margin-right: 8px;
        }
      }
    }
  }
}
.course-list-wrap{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
