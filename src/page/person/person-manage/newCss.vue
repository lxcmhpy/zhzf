<template>
  <div class="new_css">
    <el-form ref="form" :model="personInfoDetailForm" label-width="110px" :rules="rules">
      <div class="float css_left" style="position: absolute;">
        <!-- 左侧内容 style="border:2px dashed #d9d9d9;width:161px;height:161px;margin-left:28px;" -->
         <div class="block" style="margin-top:50px;">
            <el-upload
              style="margin-left:20px;"
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
      <div class="float css_right" style="float:right;"><!-- 右侧表格 -->
        <!--基本信息 -->
        <div class="info_box">
          <div class="info_content float">
            <div class="center_content">
              <span class="titleflag">
              </span>
              <span class="title">基本信息</span>
            </div>
            <div class="info_body">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="真实姓名：" prop="name">
                    <el-input v-model="personInfoDetailForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="name">
                    <!-- {{personInfoDetailForm.idNo}} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别：" prop="sexName">
                    <!-- {{personInfoDetailForm.sexName}} -->
                    <el-input v-model="personInfoDetailForm.sexName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出生日期：" prop="name">
                    <!-- {{personInfoDetailForm.birthDate}} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="民族：" prop="name">
                    <!-- {{personInfoDetailForm.nationName}} -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="参加工作日期：" prop="name">
                    <!-- {{personInfoDetailForm.workDate}} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="政治面貌：" prop="name">
                    <!-- {{personInfoDetailForm.politicalStatusName}} -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="入党日期：" prop="name">
                    <!-- {{personInfoDetailForm.admissionDate}} -->
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imageUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      personInfoDetailForm: {
        name: 'iweuriwaue'
      },
      rules: {
        name: [{ required: true, message: "姓名必须填写", trigger: "blur" }],
        sexName: [{ required: true, message: "性别必须填写", trigger: "blur" }],
      },
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
    },
  }
}
</script>
<style lang="scss" scoped >
@import "@/assets/css/personManageTitle.scss";
@import "@/assets/css/personManage.scss"
</style >