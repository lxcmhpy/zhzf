<template>
  <div class="add_dialog">
    <div class="add_dialog_content">
      <el-steps :active="1" finish-status="success" class="steps">
        <el-step title="选择案件"></el-step>
        <el-step title="移送详情"></el-step>
      </el-steps>
      <div class="border_blue"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="content_bg">
          <el-form-item label="案号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="案由" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="目标机构" prop="region">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-select v-model="ruleForm.region" placeholder="机构类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="移送原因" prop="resource">
          <el-form-item prop="resource">
            <el-radio v-model="ruleForm.resource" label="重大、疑难案件"></el-radio>
          </el-form-item>
          <el-form-item prop="resource">
            <el-radio v-model="ruleForm.resource" label="违法行为涉嫌犯罪"></el-radio>
          </el-form-item>
          <el-form-item prop="resource">
            <el-radio v-model="ruleForm.resource" label="其他原因"></el-radio>
          </el-form-item>
          <el-form-item prop="resource">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="附件" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <div class="send_message">
          <div class="left margin_right_66">
            <div class="title"></div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="left">
            <div class="title"></div>

          </div>
        </div>
      </el-form>
    </div>

  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  }
}
</script>
<style lang="scss" scoped>
/* @import "@/assets/css/caseHandle/index.scss"; */
@import "@/assets/css/documentForm.scss";
</style>
