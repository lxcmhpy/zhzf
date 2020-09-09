<template>
  <div class="review-abnormal-file">
    <div
      class="abnormal-file-thumbnail"
      v-for="(file, index) in abnormalFileList"
      :key="index"
      @click="viewAbnormalFile(file)"
    >
      <!-- 图片文件 -->
      <el-image v-if="file.type === 'img'" :src="file.src">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <!-- 音频文件 -->
      <el-image v-if="file.type === 'audio'" :src="musicFileUrl" fit="none"></el-image>
      <!-- 视频文件 -->
      <div v-if="file.type === 'video'" class="video-file-panel" @click="viewAbnormalFile(file)">
        <video class="abnormal-video" :src="file.src"></video>
        <span class="abnormal-video-play">
          <i class="el-icon-caret-right"></i>
        </span>
      </div>
      <p class="abnormal-file-name">{{ file.name }}</p>
    </div>
    <!-- 查看附件 -->
    <ReviewAbnormalFile ref="ReviewAbnormalFileRef" />
  </div>
</template>

<script>
import ReviewAbnormalFile from "@/page/inspection/dutyManage/components/reviewAbnormalFile.vue";

export default {
  components: { ReviewAbnormalFile },
  props: {
    abnormalFileList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 查看附件
    viewAbnormalFile(file) {
      this.$refs.ReviewAbnormalFileRef.showModal(file.type, file.src);
    },
  },
};
</script>

<style lang="scss" scoped>
.review-abnormal-file {
  margin-top: 20px;
  .abnormal-file-thumbnail {
    display: inline-block;
    width: 188px;
    margin-right: 20px;
    margin-bottom: 20px;
    >>> .el-image,
    .video-file-panel {
      width: 188px;
      height: 110px;
      text-align: center;
      line-height: 110px;
      font-size: 28px;
      background: rgba(69, 115, 208, 0.1);
      cursor: pointer;
    }
    .abnormal-file-name {
      color: #7b7b7b;
      line-height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .video-file-panel {
      position: relative;
      > video {
        width: 100%;
        height: 100%;
      }
      .abnormal-video-play {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        background: rgba(0, 0, 0, 0.36);
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -18px;
      }
    }
  }
}
</style>
