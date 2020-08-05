<!-- 新增 -->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addForm"
      :rules="rules"
      label-position="right"
      label-width="90px"
      ref="addFormRef"
    >
      <el-form-item label="复制数量" prop="copyNum">
        <el-input v-model="addForm.copyNum" maxlength="2" placeholder="请输入复制数量（最大99个）"></el-input>
      </el-form-item>
      <el-form-item label="上级类型" prop="type">
        <el-input v-model="addForm.type" disabled placeholder="锁定带入树形结构中选择的分类"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "新增",
      addForm: {
        copyNum: "",
        type: ""
      },
      rules: {
        copyNum: [{ required: true, message: '请输入复制数量', trigger: 'blur' }],
        type: [{ required: true, message: '请选择上级类型', trigger: 'blur' }]
      }
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
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.saveAddCopyForm();
        } else {
          return false;
        }
      });
    },
    saveAddCopyForm() {
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
      this.$refs["addFormRef"].resetFields();
      this.visible = false;
      this.addForm.copyNum = "";
      this.addForm.type = "";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
