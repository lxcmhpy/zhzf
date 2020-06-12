<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="refuseStaffInForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="refuseStaffInFormRef"
    >
      <el-row>
        <el-form-item label="拒绝原因:" prop="reason">
          <el-input v-model="refuseStaffInForm.reason"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" :disabled="btnDisabled" @click="submit('addEducationForm')">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      refuseStaffInForm: {
        transferId: "",
        reason: ""
      },
      visible: false,
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2  查看3
      rules: {
        reason: [{ required: true, message: "请输入拒绝原因", trigger: "blur" }]
      },
      btnDisabled: false
    };
  },
  methods: {
    //提交
    submit() {
      let _this = this;
      let data = {
        reason: _this.refuseStaffInForm.reason,
        transferId: _this.refuseStaffInForm.transferId
      };
      _this.$refs["refuseStaffInFormRef"].validate(valid => {
        _this.btnDisabled = true;
        if (valid) {
          _this.$store.dispatch("refuseTransfer", data).then(
            res => {
              _this.btnDisabled = false;
              if (res.code === 200) {
                _this.$message({
                  type: "success",
                  message: "拒绝成功!"
                });
                _this.$emit("getRefuseStaff");
              } else {
                _this.$message({
                  type: "error",
                  message: "拒绝失败!"
                });
              }
              _this.closeDialog();
            },
            err => {
              _this.btnDisabled = false;
              _this.$message({ type: "error", message: err.msg || "" });
            }
          );
        } else {
          this.btnDisabled = false;
          return false;
        }
      });
    },
    showModal(transferId) {
      let _this = this;
      _this.visible = true;
      _this.dialogTitle = "拒绝原因";
      _this.refuseStaffInForm.transferId = transferId;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["refuseStaffInFormRef"].resetFields();
      this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
