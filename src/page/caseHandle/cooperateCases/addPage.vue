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
      <el-form :model="caseData" :rules="rules" ref="caseData" label-width="100px" class="demo-ruleForm">
        <div class="content_bg">

          <el-form-item label="案号">
            {{caseData.tempNo}}
            <el-button class="re_select" size="small" @click="reSelect" plain>重新选择</el-button>
          </el-form-item>
          <el-form-item label="案由">
            {{caseData.caseCauseName}}
          </el-form-item>
        </div>
        <el-form-item label="目标机构" class="is-required">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="organType">
                <el-select v-model="caseData.organType" placeholder="机构类型">
                  <el-option label="执法机构" value="执法机构"></el-option>
                  <el-option label="公安机关" value="公安机关"></el-option>
                  <el-option label="司法机关" value="司法机关"></el-option>
                  <el-option label="其他部门" value="其他部门"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="17">
              <el-form-item prop="organMb">
                <el-input v-model="caseData.organMb"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="移送原因" prop="copyReason" class="is-required">
          <el-form-item>
            <el-radio v-model="caseData.copyReason" label="重大、疑难案件"></el-radio>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="caseData.copyReason" label="违法行为涉嫌犯罪"></el-radio>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-radio v-model="caseData.copyReason" label="其他原因"></el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item :prop="caseData.copyReason == '其他原因' ? 'otherReason' :''">
                <el-input v-model="caseData.otherReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="附件">
          <!-- zjfj -->
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="uploadFileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">最多上传3个附件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="caseData.notes"></el-input>
        </el-form-item>
        <div class="send_message">
          <div class="left margin_right_66">
            <div class="title">
              <div class="list_icon"> <img src="../../../../static/images/img/personInfo/icon_wenshu.svg" alt=""></div>
              <center class="list_name">文书（{{checkedFiles.length}}/{{fileList.length}}）</center>
              <!-- docs -->
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedFiles" @change="handleCheckedFilesChange">
                <el-checkbox v-for="(item,index) in fileList" :label="item.docName" :key="index">{{item.docName}}
                  <!-- {{item.docNote}}
                  <span v-if="item.docNote==''">{{item.docName}}</span> -->
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="left">
            <div class="title">
              <div class="list_icon"> <img src="../../../../static/images/img/personInfo/icon_zhengju.svg" alt=""></div>
              <center class="list_name">证据附件（0/9）</center>
              <!-- zjfj -->
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
              <el-checkbox-group v-model="checkedFiles2" @change="handleCheckedFilesChange2">
                <el-checkbox v-for="(item,index) in evdenceList" :label="index" :key="index">{{item.fileName}}
                  <!-- {{item.docNote}}
                  <span v-if="item.docNote==''">{{item.docName}}</span> -->
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <center>
          <el-button type="primary" @click="submitForm('caseData')" style="width:174px;margin-bottom:74px;margin-top:70px">提交</el-button>
        </center>
      </el-form>
    </div>

  </div>
</template>
<script>
import { AddEditTransferCaseApi, getFinishDocByIdApi, getFinishEvdenceByIdApi } from "@/api/caseHandle";
import {
  uploadEvApi,
  findFileByIdApi,
} from "@/api/upload";
// const fileOptions = ['上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      caseData: {
        tempNo: '',
        caseCauseName: '',
        organType: '',
        organMb: '',
        copyReason: '',
        otherReason: '',
        docs: '',
        zjfj: '',
      },
      checkAll: false,
      checkAll2: false,
      checkedFiles: [],
      checkedFiles2: [],
      files: [],
      fileOptions: [],
      evdenceOptions: [],
      isIndeterminate: true,
      isIndeterminate2: true,
      uploadFileList: [],
      fileList: [],
      evdenceList: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        organType: [
          { required: true, message: '请选择机构类型', trigger: 'blur' }
        ],
        organMb: [
          { required: true, message: '请输入目标机构', trigger: 'blur' }
        ],
        copyReason: [
          { required: true, message: '请选择移送原因', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        otherReason: [
          { required: true, message: '请填写原因', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    reSelect() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.replace({
        name: "addSelect",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddEditTransferCaseApi(this.caseData).then(res => {
            console.log(res);
            this.modelList = res.data;
          }, err => {
            console.log(err);
          })
        } else {
          this.$message({
            type: "error",
            message: "请完善表单信息"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCheckAllChange(val) {
      this.checkedFiles = val ? this.fileOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckAllChange2(val) {
      this.checkedFiles2 = val ? this.evdenceOptions : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedFilesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.fileList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length;
    },
    handleCheckedFilesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.evdenceList.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.evdenceList.length;
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
  },
  mounted() {
    console.log('选择的案件', this.$route.params)
    this.caseData.tempNo = this.$route.params.caseData.tempNo
    this.caseData.caseCauseName = this.$route.params.caseData.caseCauseName
    this.caseData.caseId = this.$route.params.caseData.id
    console.log('表单', this.caseData)
    getFinishDocByIdApi(this.caseData.caseId).then(res => {
      console.log('文书列表', res.data);
      this.fileList = res.data;
      this.fileOptions = res.data;
      // this.files=res.data;

      // let hash = {};
      // res.data.forEach(curVal => {
      //    hash[curVal.docName] ? '' : hash[curVal.docName] = true && this.fileList.push(curVal); 
      //     console.log(' this.fileList', this.fileList)
      // });
      // let flag = 1;
      // this.fileList.forEach(element => {
      //   element.flag = flag
      //   flag += 1;
      //   console.log(' this.fileList', this.fileList)
      // });

    }, err => {
      console.log(err);
    })
    getFinishEvdenceByIdApi(this.caseData.caseId).then(res => {
      console.log('zhengju', res);
      this.evdenceList = res.data
      this.evdenceOptions = res.data

    }, err => {
      console.log(err);
    })
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
.steps /deep/ .is-process /deep/.el-step__icon {
  background: #4573d0;
  color: #ffffff;
  border-color: #4573d0;
}
.steps /deep/ .el-step__head.is-success {
  color: #4573d0;
  border-color: #4573d0;
}
.steps /deep/ .el-step__title.is-success {
  color: #b2b2b2;
}
.steps /deep/ .el-step__icon /deep/.el-step__icon-inner {
  font-weight: 400;
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
