<template>
  <el-dialog
    class="add-question-dialog"
    title="导入试题"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form label-position="right" label-width="100px">
      <el-form-item label="下载模板:">
        <el-button type="primary" size="medium" @click="downTemplate">下载模板</el-button>
      </el-form-item>
      <el-form-item label="选择文件:">
        <el-upload
          action
          :auto-upload="false"
          accept="application/vnd.ms-excel, .xls, .xlsx"
          :file-list="fileList"
          :on-change="fileChange"
          :on-remove="removeFile"
        >
          <el-button slot="trigger" type="info" size="medium">选择文件</el-button>
          <el-button v-if="fileList.length" style="margin-left: 10px;" size="medium" type="success" @click="batchImport">上传试题</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过5M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { downLoadFile } from "@/api/joinExam";

export default {
  data() {
    return {
      visible: false,
      fileList: [],
      currentOutlineId: '',
      uploadSuccess: false
    };
  },
  computed: {},
  created() {},
  methods: {
    showModal(outlineId) {
      this.uploadSuccess = false;
      this.currentOutlineId = outlineId;
      this.visible = true;
    },
    // 下载模板
    downTemplate() {
      this.$store.dispatch("downLoadQuestionTemp").then(
        res => {
          downLoadFile(res.data, res.fileName);
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 上传文件
    batchImport() {
      const formData = new FormData();
      const file = this.fileList[0];
      formData.append("file", file.raw);
      formData.append("outlineId", this.currentOutlineId);
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch('batchImportQuestion', formData).then(res => {
        loading.close();
        if(res.code === 200){
          this.$message({ type: 'success', message: '上传成功' });
          this.uploadSuccess = true;
          this.fileList.splice(0, 1);
        }
      }, err =>{
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    },
    // 选择文件变化
    fileChange(file, fileList) {
      const isGt5M = file.size / 1024 / 1024 > 5;
      if (isGt5M) {
        this.$message({
          message: "上传文件大小不能超过 5MB!",
          type: "warning"
        });
      }
      fileList.splice(0, 1, file);
      this.fileList.splice(0, 1, file);
    },
    // 删除文件
    removeFile(){
      this.fileList.splice(0, 1);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      if(this.uploadSuccess){
        this.$emit('reloadQuestion');
      }
      this.fileList.splice(0, 1);
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-upload__tip{
  line-height: 20px;
}
</style>
