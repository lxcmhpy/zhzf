<template>
  <el-dialog
    title="查看附件"
    :visible.sync="showPreview"
    :close-on-click-modal="false"
    width="65%"
    class="review-abnormal-file"
  >
    <div class="abnormal-file-dialog">
      <img v-if="fileType === 'image' " :src="fileSrc" alt height="500" />
      <video v-else-if="fileType === 'video' || fileType === 'radio'" height="500" controls>
        <source :src="fileSrc" type="video/mp4" />
      </video>
      <object v-else-if="fileType === 'other' ">
        <embed
          class="print_info"
          style="padding:0px;width: 900px;margin:0 auto;height:1000px"
          name="plugin"
          id="plugin"
          :src="fileSrc"
          type="application/pdf"
          internalinstanceid="29"
        />
      </object>
      <span v-else>该文件暂不支持预览</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      showPreview: false,
      fileType: "",
      fileSrc: "",
      // host: iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,
    };
  },
  methods: {
    showModal(attach) {
      this.fileType = this.getFileType(attach.name);

      this.$util.com_getFileStream(attach.storageId).then((res) => {
        this.fileSrc = res;
      });
      this.showPreview = true;
    },
    closeDialog() {
      this.fileType = "";
      this.fileSrc = "";
      this.showPreview = false;
    },
    getFileType(name) {
      // 后缀获取
      let suffix = "";
      // 获取类型结果
      let result = "";
      try {
        const flieArr = name.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        return false;
      }
      suffix = suffix.toLocaleLowerCase();
      // 图片格式
      const imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      result = imglist.find((item) => item === suffix);
      if (result) {
        return "image";
      }
      // 匹配 pdf
      const pdflist = ["pdf"];
      result = pdflist.find((item) => item === suffix);
      if (result) {
        return "pdf";
      }
      // 匹配 视频
      const videolist = [
        "mp4",
        "m2v",
        "mkv",
        "rmvb",
        "wmv",
        "avi",
        "flv",
        "mov",
        "m4v","mp3", "wav", "wmv"
      ];
      result = videolist.find((item) => item === suffix);
      if (result) {
        return "video";
      }
      // 匹配 音频
      const radiolist = ["mp3", "wav", "wmv"];
      result = radiolist.find((item) => item === suffix);
      if (result) {
        return "radio";
      }
      // 其他 文件类型
      return "other";
    },
  },
};
</script>

<style lang="scss" scoped>
.abnormal-file-dialog {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
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
