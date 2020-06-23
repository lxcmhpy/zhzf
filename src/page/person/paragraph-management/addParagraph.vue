<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form :model="addEnfForm" :rules="rules" label-position="right"  label-width="90px" ref="addParagraph">
      <el-form-item label="paramId" prop="paramId" v-show="false" >
        <el-input v-model="addEnfForm.paramId"></el-input>
      </el-form-item>
      <el-form-item label="执法机构:" prop="oid">
        <elSelectTree
          v-if="visible && handelType === 0"
          ref="elSelectTreeObj"
          :options="tableDataTree"
          :accordion="true"
          :props="{label: 'label', value: 'id'}"
          @getValue="hindleChanged">
        </elSelectTree>
        <el-input v-else v-model="addEnfForm.oname" disabled></el-input>
      </el-form-item>
      <el-form-item label="号段起:" prop="sectionBegin">
        <el-input v-model="addEnfForm.sectionBegin" maxlength="6" @input="setionChange('sectionBegin')">
          <template slot="prepend">{{provinceCode.start}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="号段止:" prop="sectionEnd">
        <el-input v-model="addEnfForm.sectionEnd" maxlength="6" @input="setionChange('sectionEnd')">
          <template slot="prepend">{{provinceCode.end}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="addEnfForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPerson" :disabled="btnDisabled">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import elSelectTree from '@/components/elSelectTree/elSelectTree';
export default {
  components: {elSelectTree},
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data(){
    const NumReg = /^[0-9]*$/;
    const validateSectionBegin = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入号段起'));
      } else {
        if (!NumReg.test(value)){
          callback(new Error('号段起只能输入数字'));
        } else if (this.addEnfForm.sectionEnd) {
          const diffVal = value - this.addEnfForm.sectionEnd;
          if (diffVal > -1) {
            callback(new Error('号段起必须小于号段止'));
          } else {
            this.$refs.addParagraph.clearValidate('sectionEnd');
            callback();
          }
        } else {
          callback();
          this.$refs.addParagraph.validateField('sectionEnd');
        }
      }
    };
    const validateSectionEnd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入号段止'));
      } else {
        if (!NumReg.test(value)){
          callback(new Error('号段止只能输入数字'));
        } else if (this.addEnfForm.sectionBegin) {
          const diffVal = value - this.addEnfForm.sectionBegin;
          if (diffVal <= 0) {
            callback(new Error('号段止必须大于号段起'));
          } else {
            this.$refs.addParagraph.clearValidate('sectionBegin');
            callback();
          }
        }
      }
    }
    return{
      imageUrl: '',
      visible: false,
      oidInfo:[],
      branchInfo:[],
      addEnfForm: {
        paramId:'',
        oid:'',
        sectionBegin:'',
        sectionEnd:'',
        remark:''
      },
      handelType:'',
      dialogTitle:'',
      provinceCode: { start: '', end: '' },
      rules: {
        oid: [{ required: true, message: '请选择执法机构', trigger: 'change' }],
        sectionBegin: [{ required: true, validator: validateSectionBegin, trigger: 'blur' }],
        sectionEnd: [{ required: true, validator: validateSectionEnd, trigger: 'blur' }]
      },
      tableDataTree: [],
      btnDisabled: false
    }
  },
  created(){
    this.getOidTreeData();
  },
  methods:{
    // 获取机构树
    getOidTreeData() {
      let _this = this
      _this.$store.dispatch("findOrganTreeByCurrUser").then(
        res => {
        _this.tableDataTree = res.data;
      },
      err => {
        console.log(err);
      });
    },
    // 所属机构切换
    hindleChanged(val) {
      this.addEnfForm.oid = val;
      this.$refs.elSelectTreeObj.$children[0].handleClose();
    },
    //提交
    submitPerson() {
      this.btnDisabled = true;
      this.$refs.addParagraph.validate((valid) => {
        if (valid) {
          this.savePersonForm();
        } else {
          this.btnDisabled = false;
          return false;
        }
      });
    },
    savePersonForm() {//  
      let _this = this;
      const loading = this.$loading({
        lock: true,
        text: '正在保存',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      const formData = JSON.parse(JSON.stringify(_this.addEnfForm));
      delete formData.oname;
      if(_this.handelType==0){
        _this.$store.dispatch("getEnfAdd", formData).then(res => {
          _this.btnDisabled = false;
          loading.close();
          _this.$emit("getEnfPageList");
          _this.$message.success("添加成功!");
          _this.closeDialog();
        }, err => {
          loading.close();
          _this.btnDisabled = false;
          this.$message({ type: 'error', message: err.msg || '' });
        });
      }else if(_this.handelType==1){
        formData.sectionBegin = `${_this.provinceCode.start}${formData.sectionBegin}`;
        formData.sectionEnd = `${_this.provinceCode.start}${formData.sectionEnd}`;
        _this.$store.dispatch("getEnfUpdate", formData).then(res => {
          _this.btnDisabled = false;
          loading.close();
          if(res.code === 200){
            _this.$emit("getEnfPageList");
            _this.$message({ type: "success", message:  "修改成功!" });
            _this.closeDialog();
          }
        }, err => {
          this.btnDisabled = false;
          loading.close();
          this.$message({ type: 'error', message: err.msg || '' });
        });
      }
    },
    showModal(row,type) {
      let _this = this 
      _this.visible = true;
      _this.handelType = type;
      if(type==0){//新增
        _this.dialogTitle = "新增执法号段";
        _this.provinceCode.start = this.code;
        _this.provinceCode.end = this.code;
      }else if(type==1){//修改
        _this.dialogTitle = "修改执法号段";
        _this.addEnfForm.paramId=row.oid;
        _this.addEnfForm.oid=row.oid;
        _this.addEnfForm.oname=row.oname;
        _this.addEnfForm.sectionBegin=`${row.sectionBegin}`.substr(2);
        _this.addEnfForm.sectionEnd=`${row.sectionEnd}`.substr(2);
        _this.addEnfForm.remark=row.remark;
        _this.addEnfForm.id=row.id;
        _this.provinceCode.start = `${row.sectionBegin}`.substr(0, 2);
        _this.provinceCode.end = `${row.sectionEnd}`.substr(0, 2);
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs['addParagraph'].resetFields();
      this.visible = false;
      this.addEnfForm.oid = '';
      this.addEnfForm.oname = '';
      this.addEnfForm.sectionBegin = '';
      this.addEnfForm.sectionEnd = '';
      this.addEnfForm.remark = '';
      this.addEnfForm.id = '';
      this.errorName = false;
    },
    // 号段只能输入数字
    setionChange(name) {
      this.addEnfForm[name] = this.addEnfForm[name].replace(/[^\d]/g, '');
    }
  }
}
</script>
<style lang="scss" scoped>
>>>.el-select{
  display: block;
}
</style>
