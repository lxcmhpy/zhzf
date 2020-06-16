<template>
  <div>
    <p class="border-title">图片</p>
    <el-upload ref="upload" class="upload-demo modle-upload" action="https://jsonplaceholder.typicode.com/posts/" 
    :http-request="saveImg" :on-progress='imgProgress' :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" 
    :before-remove="beforeRemoveImg" multiple :limit="3" :on-exceed="handleExceedImg" :file-list="imgList"
    accept="image/*"
    >
      <el-button size="small" type="primary">上传图片</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div> -->
    </el-upload>
    <p class="border-title">附件</p>
    <!-- {{fileList}} -->
    <el-upload class="upload-demo modle-upload" action="https://jsonplaceholder.typicode.com/posts/" :http-request="saveFile" :on-preview="handlePreviewFile" :on-remove="handleRemoveFile" :before-remove="beforeRemoveFile" multiple :limit="3" :on-exceed="handleExceedFile" :file-list="fileList">
      <el-button size="small" type="primary">选取文件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传word/excle/pdf文件</div> -->
    </el-upload>
  </div>
</template>
<script>
import { uploadMaterial, findFileByIdApi } from "@/api/person.js";
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: ['recordMsg'],
  watch: {
    recordMsg(val, oldVal) {
      debugger
      console.log('监听', this.recordMsg, 'val', val)
      this.recordId = this.recordMsg
      this.uploadAllImg()
      this.uploadAllFile()
    },
  },
  data() {
    return {
      imgList: [],
      fileList: [],
      imgListUpload: [],
      fileListUpload: [],
      currentUserLawId: '',
      recordId: ''
    };
  },
  methods: {
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            console.log('执法人员列表', res)
            let currentUserData = {};
            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                _this.currentUserLawId = item.id;
              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },
    uploadAllImg() {
      debugger
      console.log(this.imgList)
      this.imgListUpload.forEach(element => {
        console.log('element', element)
        debugger
        this.uploadImg(element)
      });
      // this.$refs.upload.submit();
    },
    saveImg(param) {
      debugger
      console.log(param);
      this.imgListUpload.push(param)
    },
    //上传图片
    uploadImg(param) {
      console.log(param);
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", '行政检查');
      fd.append("fileName", param.file.name);
      fd.append('status', '图片')//传记录id
      fd.append('caseId', this.recordId)//传记录id
      fd.append('docId', this.recordId)//传记录id
      uploadMaterial(fd).then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error)
        }
      );
    },
    imgProgress(file, fileList) {
      console.log('imgProgress', file, fileList);
    },
    handleRemoveImg(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewImg(file) {
      console.log(file);
    },
    handleExceedImg(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveImg(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadAllFile() {
      this.fileListUpload.forEach(element => {
        console.log('element', element)
        this.uploadFile(element)
      });
    },
    saveFile(param) {
      console.log(param);
      this.fileListUpload.push(param)
    },
    //上传附件
    uploadFile(param) {
      console.log(param);
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", '行政检查');
      fd.append("fileName", param.file.name);
      fd.append('status', '附件')//传记录id
      fd.append('caseId', this.recordId)//传记录id
      fd.append('docId', this.recordId)//传记录id
      uploadMaterial(fd).then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error)
        }
      );
    },
    handleRemoveFile(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewFile(file) {
      console.log(file);
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  mounted() {
    this.setLawPersonCurrentP()
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>