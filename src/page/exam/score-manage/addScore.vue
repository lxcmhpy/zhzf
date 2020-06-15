<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%">
    <el-form :model="scoreManageForm" label-position="right"  label-width="100px" ref="addExamBatchFormRef" :rules="rules">
      <el-row>
        <el-form-item label="姓名：" prop="scorerName" class="form-class">
          <el-input v-model="scoreManageForm.scorerName" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="身份证号：" prop="scorerIdno">
          <el-input v-model="scoreManageForm.scorerIdno" placeholder="请输入身份证号码" maxlength="18"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="所属单位：" prop="scorerOrg" class="form-class">
          <el-input v-model="scoreManageForm.scorerOrg" placeholder="请输入所属单位"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="省份：" prop="scorerPro" class="form-class">
          <el-input v-model="scoreManageForm.scorerPro" placeholder="请输入所在省份"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系方式：" prop="scorerPhone" class="form-class">
          <el-input v-model="scoreManageForm.scorerPhone" placeholder="请输入联系方式" maxlength="11"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div v-if="handelType!=3">
        <el-button  @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { validatePhone } from "@/common/js/validator";
export default {
  data(){
    return{
      examTypeInfo:[],
      examBatchSortInfo:[],
      isDisabled:true,
      visible: false,
      scoreManageForm: {
        scorerId:'',
       scorerName:'',
       scorerIdno:"",
       scorerOrg:'',
       scorerPro:"",
       scorerPhone:"",
      },
      rules: {
        scorerName: [{ required: true, message: "评分人姓名不能为空", trigger: "blur" }],
        scorerIdno: [{ required: true, message: "身份证号不能为空", trigger: "blur" }],
        scorerOrg: [{ required: true, message: "所属单位不能为空", trigger: "blur" }],
        scorerPro: [{ required: true, message: "所在省份不能为空", trigger: "blur" }],
        //scorerPhone: [{ required: true, message: "联系方式不能为空", trigger: "blur" }],
        scorerPhone: [{ required: true,validator: validatePhone, trigger: "blur"}]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2  查看3
    }
  },
  methods:{
    //提交
    submit() {
      let _this = this;
      this.$refs.addExamBatchFormRef.validate((valid) => {
        if (valid) {
                if(_this.handelType==0){
            _this.$store.dispatch("addExamScorer", _this.scoreManageForm).then(res => {
              _this.$emit("getExamBatchListComp");
              _this.$message({ type: "success", message:  "添加成功!" });
              _this.closeDialog();
            }, err => {
              _this.$message({ type: 'error', message: err.msg || '' });
            });
          }else if(_this.handelType==1){
            _this.$store.dispatch("updateExamScorer", _this.scoreManageForm).then(res => {
              _this.$emit("getExamBatchListComp");
              _this.$message({ type: "success",  message:  "修改成功!" });
              _this.closeDialog();
            }, err => {
              _this.$message({ type: 'error', message: err.msg || '' });
            });
          }
        } else {
          this.btnDisabled = false;
          return false;
        }
      });
    
    },
    //点击下拉框的时查询试卷类型
    getDictInfo(name,codeName){
      this.$store.dispatch("findAllDrawerByName",name).then(    //考试类型
        res=>{
          if(res.code===200){
            if(codeName==='examTypeInfo'){
              this.examTypeInfo=res.data;
            }
          }else{
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(row,type) {
      let _this=this
      _this.visible = true;
      _this.handelType = type;
       _this.scoreManageForm.scorerId = '';
        _this.scoreManageForm.scorerName = '';
        _this.scoreManageForm.scorerIdno='';
        _this.scoreManageForm.scorerOrg='';
        _this.scoreManageForm.scorerPro='';
        _this.scoreManageForm.scorerPhone='';
      if(type==0){//新增
        _this.dialogTitle = "新增评分人";
        _this.isDisabled=false;
      }else if(type==1){//修改,查看
        _this.dialogTitle = "修改评分人";
        _this.isDisabled=false;
         _this.scoreManageForm.scorerId = row.scorerId;
        _this.scoreManageForm.scorerName = row.scorerName;
        _this.scoreManageForm.scorerIdno=row.scorerIdno;
        _this.scoreManageForm.scorerOrg=row.scorerOrg;
        _this.scoreManageForm.scorerPro=row.scorerPro;
        _this.scoreManageForm.scorerPhone=row.scorerPhone;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addExamBatchFormRef"].resetFields();
      for(const key in this.addExamBatchForm){
        this.addExamBatchForm[key] = '';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
>>>.el-select, >>>.el-date-editor{
  display: block;
}
>>>.el-date-editor.el-input,
>>>.el-date-editor.el-input__inner{
  display: block;
  width: 100%;
}
</style>
