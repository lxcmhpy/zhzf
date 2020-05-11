<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form
      :model="updateParamForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="updateParamFormRef">
      <el-row>
        <el-form-item label="参数名称:" prop="paramName">
          <el-input v-model="updateParamForm.paramName" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="参数值:" prop="paramValue">
          <el-input v-if="updateParamForm.paramName !== 'ISSUE_ORG'" v-model="updateParamForm.paramValue"></el-input>
          <elSelectTree
            v-else
            ref="elSelectTreeObj"
            :options="tableDataTree"
            :accordion="true"
            :props="{ label: 'label', value: 'id' }"
            @getValue="hindleChanged">
          </elSelectTree>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="参数说明:" prop="paramComment">
          <el-input type="textarea" v-model="updateParamForm.paramComment" disabled></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitParam">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import elSelectTree from '@/components/elSelectTree/elSelectTree';
export default {
  components: { elSelectTree },
  data(){
    return{
      isDisabled:false,
      visible: false,
      updateParamForm: {
        paramId:'',
        paramName:'',
        paramValue:'',
        paramComment:'',
      },
      dialogTitle: "", //弹出框title
      tableDataTree: [],
      rules: {
        paramValue: [{ required: true, message: "参数值必须填写", trigger: "change" }]
      }
    }
  },
  created(){
    this.searchTable();
  },
  methods:{
    searchTable() {//查询所属机构
      let _this = this
      _this.$store.dispatch("getOriginNoLimit").then(
        res => {
          _this.tableDataTree = res.data;
        },
        err => {
        console.log(err);
        }
      );
    },
    hindleChanged(val) {
      this.$refs.elSelectTreeObj.$children[0].handleClose();
      this.updateParamForm.paramValue = val;
    },
    //提交
    submitParam() {
      let _this = this
      _this.$refs.updateParamFormRef.validate((valid) => {
        if (valid) {
          _this.$store.dispatch("getParamUpdate", _this.updateParamForm).then(res => {
            _this.$emit("getParamPage");
            _this.$message({ type: "success", message:  "修改成功!"});
            _this.visible = false;
          });
        } else {
          return false;
        }
      });
    },
    showModal(row) {
      let _this=this
      _this.visible = true;
      _this.dialogTitle = "修改";
      _this.isDisabled=false;
      _this.updateParamForm.paramId=row.id;
      _this.updateParamForm.paramName=row.paramName;
      _this.updateParamForm.paramValue=row.paramValue;
      _this.updateParamForm.paramComment=row.paramComment;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      let _this = this 
      _this.visible = false;
      _this.$refs["updateParamFormRef"].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
  width: 100%;
}
>>>.el-icon-date{
  line-height: 32px;
}
>>>.el-input.is-disabled .el-input__inner,
>>>.el-textarea.is-disabled .el-textarea__inner{
  color: #606266;
}
</style>
