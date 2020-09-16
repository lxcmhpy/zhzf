<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form :model="addMaintainOutlineForm" label-position="right"  label-width="100px" ref="addMaintainOutlineFormRef" :rules="rules">
      <el-row>
        <el-form-item label="父级大纲" prop="parentName" class="form-class">
          <el-input v-model="addMaintainOutlineForm.parentName" :disabled='true'></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大纲名称" prop="outlineName" class="form-class">
          <el-input v-model="addMaintainOutlineForm.outlineName" maxlength="25"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div v-if="handelType != 3">
        <el-button  @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submit('addMaintainOutlineForm')">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { isSpecialChar } from "@/common/js/validator";

export default {
  data(){
    return{
      isDisabled:true,
      visible: false,
      addMaintainOutlineForm: {
        parentId: "",
        parentName: "",
        outlineId:"",
        outlineName: ""
      },
      rules: {
        outlineName: [
          { required: true, message: "大纲名称不能为空", trigger: "blur" },
          { validator: isSpecialChar, trigger: 'blur' }
        ],
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2  查看3
    }
  },
  methods:{
    //提交
    submit() {
      let _this = this;
      _this.$refs.addMaintainOutlineFormRef.validate((valid) => {
        if(valid){
          const loading = this.$loading({
            lock: true,
            text: '正在保存',
            spinner: 'car-loading',
            customClass: 'loading-box',
            background: 'rgba(234,237,244, 0.8)'
          });
          if(_this.handelType==1){
            _this.$store.dispatch("addExamOutlineInfo", _this.addMaintainOutlineForm).then(res => {
              _this.$emit("getAllOrgan2", _this.addMaintainOutlineForm.parentId);
              _this.$message({ type: "success", message:  "添加成功!" });
              _this.closeDialog();
              loading.close();
            }, err => {
              loading.close();
              _this.$message({ type: 'warning', message: err.msg || '' });
            });
          }else if(_this.handelType==2){
            _this.$store.dispatch("updateExamOutlineInfo", _this.addMaintainOutlineForm).then(res => {
              _this.$emit("getAllOrgan2", _this.addMaintainOutlineForm.parentId);
              _this.$message({ type: "success", message:  "修改成功!" });
              _this.closeDialog();
              loading.close();
            }, err => {
              loading.close();
              _this.$message({ type: 'warning', message: err.msg || '' });
            });
          }
        }else{
          return false;
        }
      })
    },
    showModal(type,row) {
      let _this=this
      _this.visible = true;
      _this.handelType = type;
      if(type==1){//新增
        _this.dialogTitle = "新增大纲";
        _this.isDisabled=false;
        _this.addMaintainOutlineForm.parentId=row.parentId;
        _this.addMaintainOutlineForm.parentName=row.parentName;
      }else if(type==2){//修改
        _this.dialogTitle = "修改";
        _this.isDisabled=false;
        _this.addMaintainOutlineForm.outlineId=row.outlineId;
        _this.addMaintainOutlineForm.outlineName=row.outlineName;
        _this.addMaintainOutlineForm.parentName=row.parentName;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.addMaintainOutlineForm.outlineId = '';
      this.addMaintainOutlineForm.outlineName = '';
      this.visible = false;
      this.$refs["addMaintainOutlineFormRef"].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
