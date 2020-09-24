<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      ref="addStationFormRef"
      :model="addStationForm"
      label-position="right"
      label-width="100px"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model="addStationForm.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否执法:" prop="isLce">
          <el-select v-model="addStationForm.isLce" placeholder="是否执法">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="submitStation">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isSpecialChar } from "@/common/js/validator";

export default {
  data() {
    return {
      isDisabled: false,
      visible: false,
      addStationForm: {
        id: "",
        name: "",
        isLce: "",
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改1
      rules: {
        name: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" },
          { validator: isSpecialChar, trigger: "blur" },
        ],
        isLce: [
          { required: true, message: "是否执法不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //提交
    submitStation() {
      let _this = this;
      this.$refs.addStationFormRef.validate((valid) => {
        if (valid) {
          if (_this.handelType == 0) {
            _this.$store.dispatch("getStationAdd", _this.addStationForm).then(
              (res) => {
                _this.$emit("getAddStationPage");
                _this.$message({
                  type: "success",
                  message: "添加成功!",
                });
                _this.visible = false;
              },
              (err) => {
                this.$message({ type: "error", message: err.msg || "" });
              }
            );
          } else if (_this.handelType == 1) {
            _this.$store
              .dispatch("getStationUpdate", _this.addStationForm)
              .then(
                (res) => {
                  _this.$emit("getAddStationPage");
                  _this.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  _this.visible = false;
                },
                (err) => {
                  this.$message({ type: "error", message: err.msg || "" });
                }
              );
          }
        } else {
          return false;
        }
      });
    },
    showModal(row, type) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      _this.isDisabled = false;
      _this.addStationForm.id = "";
      _this.addStationForm.name = "";
      _this.addStationForm.isLce = "";
      if (type == 0) {
        //新增
        _this.dialogTitle = "新增";
      } else if (type == 1) {
        //修改
        _this.dialogTitle = "修改";
        _this.addStationForm.id = row.id;
        _this.addStationForm.name = row.name;
        _this.addStationForm.isLce = row.isLce;
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addStationFormRef"].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
>>> .el-date-editor.el-input,
>>> .el-select {
  width: 100%;
}
</style>
