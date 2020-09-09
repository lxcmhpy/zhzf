<template>
  <el-dialog
    title="查看附件"
    :visible.sync="showPreview"
    :close-on-click-modal="false"
    width="65%"
    class="review-abnormal-file"
  >
    <div class="abnormal-file-dialog">
      <video v-if="fileType === 'video'" class="video-file-view" :src="fileSrc" controls></video>
      <el-image v-if="fileType === 'img'" :src="fileSrc">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <audio v-if="fileType === 'audio'" :src="fileSrc" autoplay controls></audio>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false,
      fileType: "",
      fileSrc: "",
    };
  },
  methods:{
    showModal(type, src){
      this.fileType = type;
      this.fileSrc = src;
      this.showPreview = true;
    },
    closeDialog(){
      this.fileType = '';
      this.fileSrc = '';
      this.showPreview = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.abnormal-file-dialog {
  position: relative;
  width: 100%;
  height: 100%;
  >>> .el-image,
  video,
  audio {
    width: 100%;
    height: 100%;
    line-height: 100%;
    font-size: 28px;
    background: rgba(69, 115, 208, 0.1);
  }
}
</style>
