<template>
  <el-dialog
    title="颁发证件"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form :model="addPersonForm" :rules="rules" label-position="right"  label-width="100px" ref="addPersonForm">
      <el-form-item label="证件号码:"  prop="ministerialNo">
        <el-input v-model="addPersonForm.ministerialNo"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPerson()" :disabled="btnDisabled">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      visible: false,
      addPersonForm: {
        personId:"",        // id
        ministerialNo:""    // 证件号码
      },
      tableData: [],        // 表格数据
      errorName: false,     // 添加name时的验证
      btnDisabled: false,
      rules: {
        ministerialNo: [{ required: true, message: "证件号码必须填写", trigger: "blur" }]
      }
    }
  },
  components: {},
  methods:{
    //确认颁发
    submitPerson() {
      let _this = this;
      this.btnDisabled = true;
      console.log(this.addPersonForm)
      _this.$refs.addPersonForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("addPerCertMoudle", this.addPersonForm).then(res => {
            this.visible = false;
            this.btnDisabled = false;
            if(res.code == '200'){
              this.$message({ type: "success", message:  "证件颁发成功!"});
            }else{
              this.$message({type: "error", message:  "证件颁发失败!"});
            }
            this.$emit("getAllPersons");
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
    showModal(personId) {
      this.addPersonForm.personId = personId;
      this.visible = true;
      let data = { personId: personId };
      this.$store.dispatch("getCertNoModul",data).then( res => {
        this.addPersonForm.ministerialNo = res.data;
      }, err => {
        this.$message({type: 'error', message: err.msg || ''});
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addPersonForm"].resetFields();
      this.errorName = false;
    },
  }
}
</script>
<style lang="scss">
>>>.el-input{
  width: 100%;
}
</style>
