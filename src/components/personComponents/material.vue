<template>
    <div>
        <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
            <div style="margin-top:20px;margin-bottom:20px;margin-left:25px;margin-bottom:30px;">
                <font style="font-size:25px;"><span class="titleflag"></span>身份证</font>
            </div>
            <div class="block" style="margin-left:150px;float:left">
                <el-upload
                    style="border:1px dashed #8c939d;border-radius: 8px;"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="block" style="margin-left:100px;float:left">
                <el-upload
                    style="border:1px dashed #8c939d;border-radius: 8px;"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
            <div style="margin-top:20px;margin-bottom:20px;margin-left:25px;margin-bottom:30px;">
                <font style="font-size:25px;"><span class="titleflag"></span>学历证明</font> 
            </div>
            <div class="block" style="margin-left:30px;">
               
            </div>
        </div>
        <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
            <div style="margin-top:20px;margin-bottom:20px;margin-left:25px;margin-bottom:30px;">
                <font style="font-size:25px;"><span class="titleflag"></span>编制证明</font> 
            </div>
            <div class="block" style="margin-left:30px;">
                
            </div>
        </div>
        <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
            <div style="margin-top:20px;margin-bottom:20px;margin-left:25px;margin-bottom:30px;">
                <font style="font-size:25px;"><span class="titleflag"></span>其他证明</font>
            </div>
            <div class="block" style="margin-left:30px;">
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'material',//证明材料
    data(){
        return {
            imageUrl: '',
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
  .titleflag {
                width      : 4px;
                height     : 22px;
                margin-right: 8px;
                display    : inline-block;
                background : #4573D0;
            }

  
</style>