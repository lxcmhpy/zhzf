<template>
<div>
  <div class="new_css" v-show="isShowAddPerson">
    <el-form ref="form" :model="personInfoDetailForm" label-width="110px" :rules="rules">
      <div class="float css_left" style="position: absolute;height:965px;"><!-- 左侧内容 -->
        <div class="block" style="margin-top:50px;">
            <el-upload
              style="margin-left:20px;width:178px;height:178px;"
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
                <el-col :span="12" class="form_class">
                  <el-form-item label="真实姓名" prop="personName" class="form_class">
                    <el-input v-model="personInfoDetailForm.personName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="身份证号" prop="idNo" class="form_class">
                    <el-input v-model="personInfoDetailForm.idNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="性别" prop="sex" class="form_class">
                     <el-select v-model="personInfoDetailForm.sex" placeholder="性别" style="width:435px;">
                          <el-option :value='0' label="男"></el-option>
                          <el-option :value='1' label='女'></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="出生日期" prop="birthDate" class="form_class">
                    <el-input v-model="personInfoDetailForm.birthDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="民族" prop="nationName" class="form_class">
                    <el-input v-model="personInfoDetailForm.nationName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="参加工作日期" prop="workDate" class="form_class">
                    <el-date-picker v-model="personInfoDetailForm.workDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        style="width: 430px;" placeholder="请选择参加工作日期"  clearable >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="政治面貌" prop="politicalStatusName" class="form_class">
                    <el-input v-model="personInfoDetailForm.politicalStatusName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="入党日期" prop="admissionDate" class="form_class">
                    <el-date-picker v-model="personInfoDetailForm.admissionDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        style="width: 430px;" placeholder="请选择入党日期" :disabled='isDisabled' clearable >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- 学历 -->
        <div class="info_box">
          <div class="info_content float">
            <div class="center_content">
              <span class="titleflag">
              </span>
              <span class="title">学历信息</span>
            </div>
            <div class="info_body">
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="学历" prop="degree" class="form_class">
                    <el-input v-model="personInfoDetailForm.degree"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="毕业学校" prop="school" class="form_class">
                    <el-input v-model="personInfoDetailForm.school"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="毕业专业" prop="major" class="form_class">
                     <el-select v-model="personInfoDetailForm.major" placeholder="毕业专业" style="width:435px;">
                          <el-option :value='0' label="男"></el-option>
                          <el-option :value='1' label='女'></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="毕业证书编号" prop="graduationNo" class="form_class">
                    <el-input v-model="personInfoDetailForm.graduationNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="分配渠道" prop="disChannelName" class="form_class">
                    <el-input v-model="personInfoDetailForm.disChannelName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!--  工作信息 -->
        <div class="info_box">
          <div class="info_content float">
            <div class="center_content">
              <span class="titleflag">
              </span>
              <span class="title">工作信息</span>
            </div>
            <div class="info_body">
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="岗位" prop="personName" class="form_class">
                    <el-input v-model="personInfoDetailForm.personName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="职务" prop="post" class="form_class">
                    <el-input v-model="personInfoDetailForm.post"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="执法领域" prop="sex" class="form_class">
                     <el-select v-model="personInfoDetailForm.sex" placeholder="请选择执法领域" style="width:435px;">
                          <el-option :value='0' label="男"></el-option>
                          <el-option :value='1' label='女'></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="执法区域" prop="area" class="form_class">
                    <el-input v-model="personInfoDetailForm.area"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="省内执法证号" prop="provinceNo" class="form_class">
                    <el-input v-model="personInfoDetailForm.provinceNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form_class">
                  <el-form-item label="海事执法证号" prop="maritimeNo" class="form_class">
                     <el-input v-model="personInfoDetailForm.maritimeNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="form_class">
                  <el-form-item label="部级执法证号" prop="ministerialNo" class="form_class">
                    <el-input v-model="personInfoDetailForm.ministerialNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-left:950px;"> 
                 <el-button class="edit_save" type="primary" @click="savePersonPage">保存</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
  <div class="dentail_info_box" v-show="!isShowAddPerson">
    <el-form ref="form" :model="personInfoDetailForm" label-width="112px">
      <el-button class="edit_btn" type="primary" @click="editPersonPage">修改</el-button>
      <!--基本信息 -->
      <el-row>
      <div class="info_box">
        <hr class="line" />
        <div class="info_content float" style="float:left">
          <div class="center_content">
            <span class="titleflag">
            </span>
            <span class="title">历史查验</span>
          </div>
          <div class="info_body">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name">
                  {{personInfoDetailForm.personName}}
                  <!-- <el-input v-model="personInfoDetailForm.name"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="name">
                  {{personInfoDetailForm.idNo}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别：" prop="name">
                  {{personInfoDetailForm.sexName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期：" prop="name">
                  {{personInfoDetailForm.birthDate}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="民族：" prop="name">
                  {{personInfoDetailForm.nationName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参加工作日期：" prop="name">
                  {{personInfoDetailForm.workDate}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="政治面貌：" prop="name">
                  {{personInfoDetailForm.politicalStatusName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入党日期：" prop="name">
                  {{personInfoDetailForm.admissionDate}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 照片 -->
        <div class="img_box float">
          <img :src="imageUrl" alt="">
        </div>
      </div>
      </el-row>
      <!-- 学历信息 -->
      <el-row>
      <div class="info_box">
        <hr class="line" />
        <div class="info_content">
          <div class="center_content">
            <span class="titleflag">
            </span>
            <span class="title">学历信息</span>
          </div>
          <div class="info_body">
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历：" prop="name">
                  {{personInfoDetailForm.degreeName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业学校：" prop="name">
                  {{personInfoDetailForm.school}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="毕业专业：" prop="name">
                  {{personInfoDetailForm.majorName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业证书编号：" prop="name">
                  {{personInfoDetailForm.graduationNo}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分配渠道：" prop="name">
                  {{personInfoDetailForm.disChannelName}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      </el-row>
      <!-- 工作信息 -->
      <div class="info_box">
        <hr class="line" />

        <div class="info_content">
          <div class="center_content">
            <span class="titleflag">
            </span>
            <span class="title">工作信息</span>
          </div>
          <div class="info_body">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属机构：" prop="name">
                  {{personInfoDetailForm.oidName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="岗位：" prop="name">

                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="岗位状态：" prop="name">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职务：" prop="name">
                  {{personInfoDetailForm.oidName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人员编制：" prop="name">
                  {{personInfoDetailForm.staffingName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="执法领域：" prop="name">
                  {{personInfoDetailForm.certNo}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执法区域：" prop="name">
                  {{personInfoDetailForm.area}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="省内执法证号：" prop="name">
                  {{personInfoDetailForm.provinceNo}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="海事执法证号：" prop="name">
                  {{personInfoDetailForm.maritimeNo}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="部级执法证号：" prop="name">
                  {{personInfoDetailForm.ministerialNo}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证件办理状态：" prop="name">
                  {{personInfoDetailForm.certStatusName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="当前证件状态：" prop="name">
                  {{personInfoDetailForm.certStatusName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注：" prop="name">
                  {{personInfoDetailForm.note}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
  </div>
</template>
<script>
export default {
  name: "personDetailInfo",//人员基本信息组件
  data() {
    return {
      imageUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      isDisabled: true,
      isShowAddPerson: this.$route.params.pageStatus == '0' ? false : true,
      personInfoDetailForm: {
        personId: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.personId : '',
        orgName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.orgName : '',
        school: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.school : '',
        branchName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.branchName : '',
        branchIdName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.branchIdName : '',
        personName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.personName : '',
        sex: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.sex : '',
        sexName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.sexName : '',
        nation: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.nation : '',
        degree: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.degree : '',
        idNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.idNo : '',
        birthDate: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.birthDate : '',
        workDate: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.workDate : '',
        enfoceDate: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.enfoceDate : '',
        major: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.major : '',
        graduationNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.graduationNo : '',
        disChannel: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.disChannel : '',
        post: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.post : '',
        area: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.area : '',
        provinceNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.provinceNo : '',
        ministerialNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.ministerialNo : '',
        maritimeNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.maritimeNo : '',
        staffing: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.staffing : '',
        certNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.certNo : '',
        qualificationNo: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.qualificationNo : '',
        politicalStatus: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.politicalStatus : '',
        admissionDate: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.admissionDate : '',
        certStatus: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.certStatus : '',
        personStatus: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.personStatus : '',
        note: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.note : '',
        attached: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.attached : '',
        nationName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.nationName : '',
        degreeName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.degreeName : '',
        oidName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.oidName : '',
        branchIdName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.branchIdName : '',
        politicalStatusName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.politicalStatusName : '',
        staffingName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.staffingName : '',
        postName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.postName : '',
        certStatusName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.certStatusName : '',
        disChannelName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.disChannelName : '',
        personStatusName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.personStatusName : '',
        majorName: this.$route.params.pageStatus == '0' ? this.$route.params.personInfo.majorName : '',
      },
      rules: {
        personName: [{ required: true, message: "姓名必须填写", trigger: "blur" }],
        idNo: [{ required: true, message: "身份证号必须填写", trigger: "blur" }],
        nationName: [{ required: true, message: "民族必须填写", trigger: "blur" }],
        workDate: [{ required: true, message: "参加工作时间必须填写", trigger: "blur" }],
        politicalStatus: [{ required: true, message: "政治面貌必须填写", trigger: "blur" }],
        degree: [{ required: true, message: "学历必须填写", trigger: "blur" }],
        post: [{ required: true, message: "职务必须填写", trigger: "blur" }],
        certNo: [{ required: true, message: "岗位必须填写", trigger: "blur" }],
      },
    }
  },
  methods: {
    editPersonPage() {
      this.isShowAddPerson = true;
    },
    savePersonPage() {
      //修改
      this.$store.dispatch("updatePersonInfo", this.personInfoDetailForm).then(res => {
        this.$emit("getAllPersons");
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //this.$refs["addPersonForm"].resetFields();
        //this.visible = false;
        this.isShowAddPerson = false;
      });
      err => {
        console.log(err);
      };
    },
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

<style lang="scss" scoped>
@import "@/assets/css/personManageTitle.scss";
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
  .el-input{
    width:80%;
  }
</style>
