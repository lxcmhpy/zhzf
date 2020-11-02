<template>
  <div class="courseware-preview">
    <div v-if="currentCourse.type === '2'" class="course-content">
      <video
        ref="courseVideo"
        id="courseVideo"
        class="course-video"
        :src="currentCourse.src"
        controls
        @canplay="courseVideo"
        @play="play"
        @pause="pause"
        @ended="ended"
        @timeupdate="timeupdate"
      ></video>
    </div>
    <div v-if="currentCourse.type === '1'" class="course-content">
      <!-- <embed
        name="plugin"
        id="plugin"
        :src="currentCourse.src"
        type="application/pdf"
        internalinstanceid="29"
        class="print_info"
        style="padding: 0px; width: 100%; height:100%; position: relative;"
      /> -->
      <iframe
        :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(currentCourse.src)"
        frameborder="0"
        style="padding: 0px; width: 100%; height:100%; position: relative;">
      </iframe>
    </div>
    <div class="course-catalog">
      <div class="drawer-btn-wrap" :class="{'hideDrawer': !drawer}">
        <div class="open-catalog" @click="drawer = !drawer">
          <i class="top-bg el-icon-caret-left"></i>
          <i class="bot-bg el-icon-caret-left"></i>
          <i v-if="!drawer" class="el-icon-s-fold"></i>
          <i v-if="drawer" class="el-icon-s-unfold"></i>
          <span>{{ drawer ? '收起' : '打开' }}</span>
        </div>
      </div>
      <el-drawer
        class="catalog-drawer"
        :visible.sync="drawer"
        :modal="false"
        :show-close="false"
        :withHeader="false"
        size="100%"
        direction="rtl"
      >
        <div class="drawer-content">
          <ul>
            <li
              v-for="(log, index) in list"
              :key="log.cpId"
              class="log-item"
              :class="{'active': log.cpId === currentCourse.cpId}"
              @click="changeCourse(log)">
              <span v-if="indexType === 'number'" class="index">{{ index + 1 }}</span>
              <el-progress
                v-if="indexType === 'progress'"
                type="circle"
                :percentage="25"
                :width="32"
                :strokeWidth="4"
                color="#4573D0"
                :format="showIndex(index + 1)"
              ></el-progress>
              <span class="text">{{ log.couName }}</span>
            </li>
          </ul>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { updateMyCredits } from '@/api/trained';

export default {
  props: {
    indexType: {
      type: String,
      default: "number"
    },
    list: {
      type: Array,
      default: () => []
    },
    setTimer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false,
      videoRef: null,
      playTimeout: null,
      currentCourse: { type: "1", src: "", cpId: "", flag: '', accTime: '', personLessonId: '', couTime: 0, unitTimeCredits: 0 },
      updateInterval: null,
      updateNum: 0,
      viewTime: 0,
      viewInterval: null,
      videoPlayLastTime: 0,
      startUploadVideoCredit: false,
      uploadCredit: false,
      playTime: 0
    };
  },
  components: { },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.videoRef = document.getElementById("courseVideo");
    });
  },
  created() {
    if (this.list.length) {
      this.changeCourse(this.list[0]);
    }
  },
  methods: {
    // 列表展示进度
    showIndex(index) {
      return () => index;
    },
    // 切换课程
    changeCourse(course) {
      this.videoPlayLastTime = 0;
      this.startUploadVideoCredit = false;
      this.viewTime = course.accTime ? course.accTime * 60 * 1000 : 0;
      this.currentCourse.type = course.couType;
      if(course.couType === '2'){
        this.$nextTick(() => {
          this.videoRef = document.getElementById("courseVideo");
        });
      }
      this.currentCourse.cpId = course.cpId;
      this.currentCourse.couId = course.couId;
      this.$util.com_getFileStream(course.path).then( res => {
        this.currentCourse.src = res;
      });

      this.currentCourse.flag = course.flag;
      this.currentCourse.accTime = course.unitTime;
      this.currentCourse.trainperId = course.trainperId;
      this.currentCourse.personLessonId = course.personLessonId;
      this.currentCourse.couTime = course.couTime;
      this.currentCourse.unitTimeCredits = course.unitTimeCredits;

      this.setCoursewareProgress();
      if(this.setTimer && course.couType === '1' && course.accTime < course.couTime){
        this.updateCredits();
        this.recoreViewTime();
      }
    },
    // 切换课件初始化倒计时和学习进度
    setCoursewareProgress(){
      this.clearAllInterVal();
      const courseTotalTime = this.currentCourse.couTime * 60 * 1000;
      const surplusTime = courseTotalTime - this.viewTime;
      const viewPercentage = Math.floor((this.viewTime / courseTotalTime) * 100);
      if(surplusTime < 0){
        this.$emit('refreshProgress', { text: null, progress: 100 });
      }else{
        const surplusText = this.setCountDownTime(surplusTime);
        this.$emit('refreshProgress', { text: surplusText, progress: viewPercentage });
      }
    },
    // 更新学分
    updateCredits(){
      clearInterval(this.updateInterval);
      this.updateNum = Math.ceil(this.currentCourse.couTime / this.currentCourse.accTime);
      this.updateInterval = setInterval(() => {
        this.updateNum -= 1;
        let last = this.updateNum === 0;
        this.sendUpdateCredits(last);
      }, this.currentCourse.accTime * 60 * 1000)
    },
    // 发送更新学分请求
    sendUpdateCredits(last){
      const params = JSON.parse(JSON.stringify(this.currentCourse));
      delete params.type;
      delete params.src;
      delete params.couTime;
      if(last){
        params.lastFlag = '1';
        clearInterval(this.updateInterval);
      }
      updateMyCredits(params).then(res => {
        console.log(res);
        if(res.code === 200 && last){
          this.$message({ type: 'success', message: '学习完成!' });
        }
      }, err => {
        // this.$message({ type: 'error', message: err.msg });
      })
      if(this.uploadCredit){
        const openUpload = setTimeout(() => {
          this.uploadCredit = false;
          clearTimeout(openUpload);
        }, 2000);
      }
    },
    // 统计课件浏览时长
    recoreViewTime(){
      const courseTotalTime = this.currentCourse.couTime * 60 * 1000;
      this.viewInterval = setInterval(() => {
        const surplusTime = courseTotalTime - this.viewTime;
        const viewPercentage = Math.floor((this.viewTime / courseTotalTime) * 100);
        this.playTime = viewPercentage;
        if(surplusTime < 0){
          this.$emit('refreshProgress', { text: null, progress: 100 });
          clearInterval(this.viewInterval);
        }
        const surplusText = this.setCountDownTime(surplusTime);
        this.viewTime += 1000;
        this.$emit('refreshProgress', { text: surplusText, progress: viewPercentage });
      }, 1000);
    },
    // 设置倒计时显示值
    setCountDownTime(diffTime) {
      const time = (diffTime - 0) / 1000;
      // 获取分、秒
      let hou = parseInt((time % (60 * 60 * 24)) / 3600);
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);

      let timeObj = {
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      };
      return timeObj;
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },

    // 获取视频时长和播放进度
    courseVideo() {
      console.log(this.videoRef.duration);
    },
    // 视频播放
    play() {
      if(this.setTimer){
        const currentTime = Math.round(this.videoRef.currentTime) * 1000;
        if(currentTime === this.viewTime){
          this.recoreViewTime();
          this.startUploadVideoCredit = true;
        }
      }
    },
    // 快进或倒退
    timeupdate(){
      const current = this.videoRef.currentTime;
	    if(current - this.videoPlayLastTime > 2) {
	      this.videoRef.currentTime = this.videoPlayLastTime;
	    } else {
		    this.videoPlayLastTime = current;
      }
      const currentSec = Math.round(current) * 1000;
      if(this.startUploadVideoCredit && currentSec < this.viewTime){
        this.startUploadVideoCredit = false;
        this.clearAllInterVal();
      }
      if(!this.startUploadVideoCredit && currentSec === this.viewTime){
        this.recoreViewTime();
        this.startUploadVideoCredit = true;
      }
      const last = Math.round(this.videoPlayLastTime) * 1000;
      const accTime = this.currentCourse.accTime * 60 * 1000;
      if(!this.uploadCredit){
        if(currentSec > 0 && last === this.viewTime && currentSec % accTime === 0){
          this.sendUpdateCredits();
          this.uploadCredit = true;
        }

      }
    },
    // 暂停播放
    pause() {
      this.clearAllInterVal();
    },
    // 播放结束
    ended() {
      this.clearAllInterVal();
      this.sendUpdateCredits(true);
      this.$emit('refreshProgress', { text: '', progress: 100 });
    },
    clearAllInterVal(){
      clearInterval(this.updateInterval);
      clearInterval(this.viewInterval);
    }
  },
  destroyed() {
    this.pause();
    clearInterval(this.updateInterval);
    clearInterval(this.viewInterval);
  }
};
</script>
<style lang="scss" scoped>
.courseware-preview {
  position: relative;
  width: 100%;
  height: 100%;
  .catalog-drawer {
    position: absolute;
    left: 70%;
    // border-left: 2px solid #20222C;
    >>> .el-drawer {
      background: rgba(43, 49, 64, 1);
    }
  }
  .course-content {
    position: relative;
    height: 100%;
    background: #000;
    padding-right: 34px;
    .course-video {
      position: relative;
      width: 100%;
      height: 100%;
      background: #000;
    }
  }
  .drawer-btn-wrap {
    width: 34px;
    height: 100%;
    position: absolute;
    right: 30%;
    top: 0;
    background: transparent;
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: right 0.4s;
    &.hideDrawer {
      right: 0;
      transition: right 0.2s;
    }
  }
  .open-catalog {
    width: 34px;
    height: 120px;
    text-align: center;
    color: #fff;
    background: #20222c;
    position: relative;
    cursor: pointer;
    > i {
      font-size: 24px;
      margin-top: 40px;
    }
    > i.el-icon-caret-left {
      margin-top: 0;
      position: absolute;
      margin-top: 0;
      color: #20222c;
      font-size: 98px;
      left: -30px;
      &.top-bg {
        top: -48px;
      }
      &.bot-bg {
        bottom: -48px;
      }
    }
  }
  .drawer-content {
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
    .log-item {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #50576b;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      color: #a0aecf;
      .index {
        color: #4573d0;
      }
      &.active,
      &:hover {
        color: #4573d0;
      }
      .text {
        margin-left: 20px;
      }
      >>> .el-progress__text {
        color: #4573d0;
      }
    }
  }
}
</style>