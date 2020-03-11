<template>
  <div class="new_css">
    <el-form ref="form" :model="personInfoDetailForm" label-width="112px" :rules="rules">
      <div class="float css_left">
        <!-- 左侧内容 -->
      </div>
      <div class="float css_right">
        <!-- 右侧表格 -->

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
                  <el-form-item label="姓名：" prop="name">
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
  data() {
    return {
      personInfoDetailForm: {
        name: 'iweuriwaue'
      },
      rules: {
        name: [{ required: true, message: "姓名必须填写", trigger: "blur" }],
        sexName: [{ required: true, message: "性别必须填写", trigger: "blur" }],

      },
    }
  }
}
</script>
<style lang="scss" scoped >
@import "@/assets/css/personManageTitle.scss";
</style >