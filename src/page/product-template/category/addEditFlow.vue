<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
  >
    <el-form
      :model="addFlowForm"
      :rules="rules"
      ref="addFlowForm"
      class="errorTipForm"
      label-width="110px"
    >
      <div class="item">
        <el-form-item label="流程名称" prop="flowName">
          <el-input v-model="addFlowForm.flowName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="流程url" prop="flowUrl">
          <el-input v-model="addFlowForm.flowUrl"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="基本信息页面" prop="basicInfoPage">
          <el-input v-model="addFlowForm.basicInfoPage"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="流程状态" prop="flowStatus">
          <el-switch v-model="addFlowForm.flowStatus" :active-value="0"
                  :inactive-value="1" active-color="#4573D0"></el-switch>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="流程备注" prop="remark">
          <el-input v-model="addFlowForm.remark"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditFlow('addFlowForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEditFlowApi } from "@/api/caseDeploy";
export default {
  data() {
    return {
      visible: false,
      addFlowForm: {
        flowName: "",
        flowUrl: "",
        basicInfoPage:"",
        flowStatus: 0,
        remark: ""
      },
      rules: {
        flowName: [
          { required: true, message: "请输入流程名称", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 ,//添加 0  修改2
      editFlowId: '',

    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        console.log(data);
        this.dialogTitle = "新增流程";
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改流程";
        this.addFlowForm.flowName = data.flowName;
        this.addFlowForm.flowUrl = data.flowUrl;
        this.addFlowForm.basicInfoPage = data.basicInfoPage;
        this.addFlowForm.flowStatus = data.flowStatus;
        this.addFlowForm.remark = data.remark;
        this.editFlowId = data.id;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addFlowForm"].resetFields();
      // this.errorName = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //新增 修改
    addOrEditFlow(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (_this.handelType) {
          //修改
          _this.addFlowForm.id = _this.editFlowId;
          addOrEditFlowApi(_this.addFlowForm).then(
            res => {
              console.log("流程", res);
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.visible = false;
              _this.reload();
            },
            err => {
              console.log(err);
            }
          );
        } else {
          addOrEditFlowApi(_this.addFlowForm).then(
            res => {
              console.log("流程", res);
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.visible = false;
              _this.reload();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    }
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
