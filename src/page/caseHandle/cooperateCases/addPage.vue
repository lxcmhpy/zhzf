<template>
  <div class="add_dialog">
    <div class="add_dialog_content">
      <div class="step_content">
        <el-steps :active="1" finish-status="success" class="steps">
          <el-step title="选择案件"></el-step>
          <el-step title="移送详情"></el-step>
        </el-steps>
      </div>

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
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="date1">
                <el-select v-model="ruleForm.region" placeholder="机构类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="17">
              <el-form-item prop="date2">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
            <div class="title">
              <div class="list_icon"> <img src="../../../../static/images/img/personInfo/icon_wenshu.svg" alt=""></div>
              <center class="list_name">文书（0/21）</center>
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="left">
            <div class="title">
              <div class="list_icon"> <img src="../../../../static/images/img/personInfo/icon_zhengju.svg" alt=""></div>
              <center class="list_name">证据附件（0/9）</center>
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </el-form>
    </div>

  </div>
</template>
<script>
const cityOptions = ['上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊', '北京', '广州', '深圳'];
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
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
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
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import "@/assets/css/caseHandle/index.scss"; */
@import "@/assets/css/documentForm.scss";
</style>
 
<style scoped>
.steps /deep/ .el-step__icon {
  font-size: 18px;
  width: 42px !important;
  height: 42px;
}
.steps /deep/ .el-step__main {
  white-space: normal;
  text-align: left;
  margin-top: -42px;
  margin-left: 42px;
  padding-left: 11px;
  width: 66px;
  z-index: 1;
  position: relative;
}
.steps /deep/ .el-step.is-horizontal .el-step__line {
  height: 2px;
  top: 21px;
  left: 128px;
  right: 26px;
}
.list /deep/ .el-checkbox__input {
  vertical-align: middle;
  position: absolute;
  top: 3px;
}

.list /deep/ .el-checkbox__label {
  width: calc(100% - 22px);
  padding-left: 22px;
  line-height: 20px;
  font-size: 14px;
  color: #20232b;
  font-weight: 600;
}
</style>
