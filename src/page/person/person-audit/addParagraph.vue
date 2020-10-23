<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form :model="approveForm" :rules="rules" label-position="right"  label-width="100px" ref="approveForm">
      <el-row style="height:1px;">
        <el-form-item label="id" prop="approveId" v-show="false">
          <el-input v-model="approveForm.approveId"></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-row>
        <el-form-item label="id" prop="approveStatus" v-show="false">
          <el-input v-model="approveForm.approveStatus"></el-input>
        </el-form-item>
      </el-row> -->
      <el-row>
        <el-form-item label="审批意见"  prop="approveInfo">
          <el-input
          maxlength="50"
           v-model="approveForm.approveInfo"  type="textarea" rows="3"></el-input>
        </el-form-item>
      </el-row>
      <el-row ><div style="text-align:center;color:red">附：常用快捷短语</div></el-row>
      <el-row>
        <el-form-item label=" " prop="attached" v-if="status0">
          <el-checkbox-group v-model="message" @change="changeCheckBox">
            <el-checkbox label="信息真实有效" name="message"></el-checkbox>
            <el-checkbox label="上传资料齐全" name="message"></el-checkbox>
            <el-checkbox label="符合发证条件" name="message"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label=" " prop="attached" v-if="status1" >
          <el-checkbox-group v-model="message" @change="changeCheckBox">
            <el-checkbox label="人员信息有误" name="message"></el-checkbox>
            <el-checkbox label="照片不符合规范" name="message"></el-checkbox>
            <el-checkbox label="缺少附件信息" name="message"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPerson()" :disabled="btnDisabled">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {isSpecialChar } from "@/common/js/validator";
export default {
  data(){
    return{
      isSpecialChar: isSpecialChar,
      searchType:[{value:0,label:'本机构'},{value:1,label:'本机构及子机构'}],
      visible: false,
      approveForm: {
        approveId:"",//id
        approveInfo:"", // 审批信息
        approveStatus:"" // 审批状态
      },
      checked:true,
      message:[],//复选框值
      alltMsg: ['信息真实有效', '上传资料齐全', '符合发证条件', '人员信息有误', '照片不符合规范', '缺少附件信息'],
      status0:false,
      status1:false,
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      btnDisabled: false,
      rules: {
        approveInfo: [{ required: true, message: "审核意见必须填写", trigger: "blur" },{ validator: isSpecialChar, trigger: 'blur' }]
      }
    }
  },
  methods:{
    // 复选选中状态
    changeCheckBox(val) {
      let currentText = this.approveForm.approveInfo;
      if(val && val.length){
        this.alltMsg.forEach(item => {
          let addText = currentText.trim().length === 0 ? item : `，${item}`;
          if(currentText.indexOf(item) > -1 && val.indexOf(item) < 0){
            if(currentText.indexOf(item) === 0){addText = item;}
            currentText = currentText.replace(addText, '');
          }
          if(currentText.indexOf(item) < 0 && val.indexOf(item) > -1){
            currentText += addText;
          }
        })
      }else{
        this.alltMsg.forEach(item => {
          const addText = currentText.trim() === item ? item : `，${item}`;
          currentText = currentText.replace(addText, '');
        }) 
      }
      this.approveForm.approveInfo = currentText.replace(/^，/, '');
    },
    remarksFormat(row, column) {
      if (row.remarks === '0') {
        return '男'
      } else if (row.remarks === '1') {
        return '女'
      }
    },
    //提交
    submitPerson() {
      let data = {
        approveId: this.approveForm.approveId,
        approveInfo: this.approveForm.approveInfo,
        approveResult: this.dialogTitle,
      };
      this.btnDisabled = true;
      this.$refs.approveForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("addApproveMoudle", data).then(res => {
            this.btnDisabled = false;
            if(res.code === 200){
              this.$message({ type: "success", message: `${this.dialogTitle}!`});
              this.$emit("getAllPersons");
              this.visible=false;
            }
          }, err => {
            this.btnDisabled = false;
            this.$message({type: 'error', message: err.msg || ''})
          });
        } else {
          this.btnDisabled = false;
          return false;
        }
      });
    },
    showModal(approveId, approveStatus) {
      this.btnDisabled = false;
      this.test = true;
      this.dialogTitle = approveStatus === 'fail' ? '审批未通过' : '审批通过';
      this.approveForm.approveId = approveId;
      this.visible = true;
      if(approveStatus == "adopt"){
        this.status0= true;
        this.status1= false;
      }else if(approveStatus == "fail"){
        this.status1= true;
        this.status0= false;
      }
      this.checked = true;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.message.splice(0, this.message.length);
      this.visible = false;
      this.$refs["approveForm"].resetFields();
      this.errorName = false;
    },
  }
}
</script>
