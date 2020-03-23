<template>
  <div class="add_dialog">
    <div class="add_dialog_content">
      <div class="step_content">
        <el-steps :active="1" finish-status="success" class="steps">
          <el-step title="选择案件"></el-step>
          <el-step title="抄告详情"></el-step>
        </el-steps>
      </div>
      <div class="border_blue"></div>
      <el-form :model="caseData" :rules="rules" ref="caseData" label-width="100px" class="demo-ruleForm">
        <div class="content_bg">
          <el-form-item label="案号">
            {{caseData.caseNumber}}
            <el-button class="re_select" size="small" @click="reSelect" plain>重新选择</el-button>
          </el-form-item>
          <el-form-item label="案由">
            {{caseData.party}}{{caseData.caseCauseName}}
          </el-form-item>
        </div>
        <el-form-item label="目标机构" class="is-required">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="organType" @change="queryState">
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
                <el-input v-model="caseData.organMb" :disabled=" caseData.organType ? false : true "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="抄告原因" prop="copyReason">
          <el-input v-model="caseData.copyReason"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <!-- appendix -->
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadPaymentVoucher" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <ul>
              <li v-for="item in alreadyLoadPayEvidence" :key="item.id">{{item.fileName}}</li>
            </ul>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="caseData.notes"></el-input>
        </el-form-item>
        <center>
          <el-button type="primary" @click="submitForm('caseData')" style="width:174px;margin-bottom:74px;margin-top:70px">提交</el-button>
        </center>
      </el-form>
    </div>

  </div>
</template>
<script>
import { addEditCopyCaseApi} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import { uploadEvApi, findFileByIdApi } from "@/api/upload";
export default {
  data() {
    return {
      caseData: {
        person: '',
        caseNumber: '',
        caseCauseName: '',
        organType: '',
        organMb: '',
        appendix: '',
        copyReason: '',
        notes: '',
        party: '',
        state: '',
        createTime: new Date()
      },
      files: [],
      fileOptions: [],
      uploadFileList: [],
      alreadyLoadPayEvidence: [], //已上传的附件
      fileList: [],
      rules: {
        organType: [
          { required: true, message: '请选择机构类型', trigger: 'blur' }
        ],
        organMb: [
          { required: true, message: '请输入目标机构', trigger: 'blur' }
        ],
        copyReason: [
          { required: true, message: '请选择抄告原因', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    reSelect() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.replace({
        name: "addCopyOne",
      });
    },
    submitForm(formName) {
      let appendixList= []
      this.alreadyLoadPayEvidence.forEach(element => {
        appendixList.push(element.fileName)
      });
      this.caseData.appendix=appendixList.join(',')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.caseData)
          addEditCopyCaseApi(this.caseData).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$store.dispatch("deleteTabs", this.$route.name);
              this.$router.replace({
                name: "copyCase",
              });
            }
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
    queryState(val){
      if(val == "执法机构"){
        caseData.state = 1;
      }else{
        caseData.state = 2;
      }
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
    },
    //上传附件
    uploadPaymentVoucher(param) {
      console.log(param);
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append('caseId', this.caseData.caseId)
      fd.append('docId', '2c9029e16c753a19016c755fe1340001');
      uploadEvApi(fd).then(
        res => {
          console.log(res);
          this.findPaymentVoucher(res.data, true);
        },
        error => {
          console.log(error)
        }
      );
    },
     //通过附件id 查询附件file
    findPaymentVoucher(id, isAdd) {
      findFileByIdApi(id).then(
        res => {
          console.log(res);
          this.alreadyLoadPayEvidence.push(res.data);
        },
        error => {
          console.log(error)
        }
      );
    }
  },
  mounted() {
    console.log('选择的案件', this.$route.params)
    let datas = this.$route.params.caseData;
    let caseData = this.caseData;
    console.log('数据', datas)
    for (var key in caseData) {
      this.caseData[key] = datas[key]
    }
    this.caseData.caseId = this.$route.params.caseData.id
    this.caseData.person = iLocalStroage.gets("userInfo").username
    // this.caseData.caseNumber = this.$route.params.caseData.caseNumber
    // this.caseData.caseCauseName = this.$route.params.caseData.caseCauseName
    // this.caseData.caseId = this.$route.params.caseData.id
    // this.caseData.createTime = this.$route.params.caseData.createTime
    // this.caseData.acceptTime = this.$route.params.caseData.acceptTime
    // this.caseData.caseStatus = this.$route.params.caseData.caseStatus
    // this.caseData.vehicleShipId = this.$route.params.caseData.vehicleShipId
    // this.caseData.wfxw = this.$route.params.caseData.caseCauseName
    // 
    console.log('表单', this.caseData)
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
