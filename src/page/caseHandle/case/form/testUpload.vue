<template>

<div>
  <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/" 
  :http-request="uploadFile"
  :show-file-list="false"
  :on-change='fileChange'
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
<el-progress v-if="percentageFlag" :percentage="percentage" class="progress"></el-progress>  
</el-upload>


</div>
</template>

<style  lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .progress{
    .el-progress-bar__outer{
      height: 2px !important;
    }
  }
</style>

<script>
  import {
  uploadEvApi
} from "@/api/upload";
  export default {
    data() {
      return {
        imageUrl: '',
        percentage:'',
        percentageFlag:''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("url",this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
        uploadFile(param) {
          var fd = new FormData()
          fd.append("file", param.file);
          fd.append('caseId', "1111")
          fd.append('docId', "1111");
          uploadEvApi(fd).then(
            res => {
              console.log("res",res);
              if(res.msg=='操作成功'){
              this.percentage=100
              setTimeout(() => {
                this.percentageFlag=false
              }, 2000);
              }
            },
            error => {
              console.log(error)
                this.percentageFlag=false
            }
          );
        },
        fileChange(file){
          console.log('状态状态状态状态状态状态',file.status)
          this.percentage=0
          this.percentageFlag=true
        },
    }
  }
</script>