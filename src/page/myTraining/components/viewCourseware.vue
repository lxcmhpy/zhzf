<template>
  <div class="class-page">
    <div class="class-page-header">
      <el-row class="header-row">
        <el-col :span="17">
          <a class="back-btn" @click="backCourseList"><i class="el-icon-arrow-left"></i></a>
          <span class="course-name">{{ lessonName }}</span>
        </el-col>
        <el-col :span="7" style="display:flex;justify-content: flex-end;align-items: center;">
          <div v-if="progressData.progress < 100" class="progress-static">
            <p class="progress-text">
              <i class="hand-icon"></i>还需
              <span v-if="progressData.text.hou > 0"><span class="num">{{ progressData.text.hou }}</span>时</span>
              <span v-if="progressData.text.min > 0"><span class="num">{{ progressData.text.min }}</span>分</span>
              <span><span class="num">{{ progressData.text.sec }}</span>秒完成学习，加油!</span>
            </p>
            <p class="progress-inner-bg" :style="{ 'width': `${progressData.progress}%` }"></p>
          </div>
          <span class="progress">已学{{ progressData.progress }}%</span>
        </el-col>
      </el-row>
    </div>
    <div class="class-page-content">
      <coursewarePreview
        ref="coursePreviewRef"
        indexType="progress"
        :list="courseList"
        :setTimer="true"
        @refreshProgress="refreshProgress"/>
    </div>
  </div>
</template>
<script>
import coursewarePreview from "@/page/trained/course-manage/components/coursewarePreview";

export default {
  props: {
    courseList: {
      type: Array,
      default: () => []
    },
    lessonName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progressData: { text: { hou: '', min: '', sec: '' }, progress: 0 }
    };
  },
  components: { coursewarePreview },
  methods: {
    // 返回
    backCourseList(){
      this.$refs.coursePreviewRef.clearAllInterVal();
      this.$emit('closeViewCourse');
    },
    refreshProgress(data){
      if(data.text){
        this.progressData.text.hou =  data.text.hou;
        this.progressData.text.min =  data.text.min;
        this.progressData.text.sec =  data.text.sec;
      }
      this.progressData.progress =  data.progress;
    }
  }
};
</script>

<style  lang="scss" scoped>
.class-page{
  position: relative;
  height: 100%;
  box-sizing: border-box;
  .classroom-wrap,>>>.el-card__body{
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  .class-page-header{
    height: 62px;
    .header-row{
      display: flex;
      align-items: center;
      height: 100%;
      .back-btn{
        display: inline-block;
        cursor: pointer;
        font-size: 20px;
        margin: 0 20px;
      }
      .course-name{
        font-size: 18px;
        font-weight: bold;
        color: #20232B;
      }
      .progress-static{
        display: inline-block;
        color: #2B313F;
        width: 254px;
        height:28px;
        line-height: 28px;
        text-align: center;
        background:rgba(74,175,167,.3);
        border-radius:14px;
        font-size: 14px;
        padding-right: 16px;
        position: relative;
        overflow: hidden;
        .progress-text{
          position: relative;
          z-index: 100;
        }
        .hand-icon{
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 8px;
          background: url('../../../../static/images/img/trained/icon_guli.svg') no-repeat;
          float: left;
        }
        .num{
          color: #E02020;
        }
        .progress-inner-bg{
          height: 28px;
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          background: #4AAFA7;
        }
      }
      .progress{
        margin-left: 20px;
        margin-right: 30px;
        color: #4AAFA7;
        line-height: 28px;
        font-size: 14px;
      }
    }
  }
  .class-page-content{
    height: calc(100% - 62px);
  }
}
</style>
