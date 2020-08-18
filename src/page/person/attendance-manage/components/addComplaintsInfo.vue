<!-- 新增投诉 -->
<template>
  <el-dialog
    class="fullscreen"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="48%"
    append-to-body
  >
    <el-form
        ref="addComplaintFormRef"
        v-model="addComplaintForm"
        :rules="rules"
        label-width="140px"
        label-position="right"
        class="add-complaints-from">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="投诉人姓名:" prop="complainantName">
            <el-input v-model="addComplaintForm.complainantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉途径:" prop="complainantChannel">
            <el-input v-model="addComplaintForm.complainantChannel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉人联系方式:" prop="complainantContact">
            <el-input v-model="addComplaintForm.complainantContact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉来源:" prop="complainantSource">
            <el-input v-model="addComplaintForm.complainantSource"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉时间:" prop="complainantTime">
            <el-date-picker
              v-model="addComplaintForm.complainantTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择投诉时间"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="投诉事项:" prop="complainantContent">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入内容"
              v-model="addComplaintForm.complainantContent"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="处理结果:" prop="complainantResult">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入内容"
              v-model="addComplaintForm.complainantResult"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { validatePhone } from "@/common/js/validator";

export default {
  data() {
    return {
      visible: false,
      dialogTitle: "新增投诉",
      addComplaintForm: {
        complainantName: '',
        complainantChannel: '',
        complainantContact: '',
        complainantSource: '',
        complainantTime: '',
        complainantContent: '',
        complainantResult: ''
      },
      rules: {
        complainantName: [{ required: true, message: "投诉人姓名必须填写", trigger: "blur" }],
        complainantChannel: [{ required: true, message: "投诉途径必须填写", trigger: "blur" }],
        complainantContact: [
            { required: true, message: "投诉人联系方式必须填写", trigger: "blur" },
            { validator: validatePhone, trigger: "blur" }
        ],
        complainantSource: [{ required: true, message: "投诉来源必须填写", trigger: "blur" }],
        complainantTime: [{ required: true, message: "投诉时间必须填写", trigger: "blur" }],
        complainantContent: [{ required: true, message: "投诉事项必须填写", trigger: "blur" }],
        complainantResult: [{ required: true, message: "处理结果必须填写", trigger: "blur" }]
      },
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
    },
    //提交
    submit() {
      this.btnDisabled = true;
      this.$refs.addDeviceFormRef.validate((valid) => {
        if (valid) {
          this.saveAddForm();
        } else {
          return false;
        }
      });
    },
    saveAddForm() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)",
      });
      loading.close();
    },
    // 关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addComplaintFormRef"].resetFields();
      this.visible = false;
      for (const key in this.addComplaintForm) {
        this.addComplaintForm[key] = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.add-complaints-from {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
