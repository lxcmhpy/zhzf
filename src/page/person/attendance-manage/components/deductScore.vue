<!-- 扣分管理 -->
<template>
  <el-dialog
    class="fullscreen"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="38%"
    append-to-body
  >
    <el-form
      ref="deductScoreFormRef"
      v-model="deductScoreForm"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="deduct-score-form"
    >
      <el-form-item label="迟到扣分:" prop="lateDeduct">
        <el-input-number v-model="deductScoreForm.lateDeduct" :min="1" :max="100" :disabled="true"></el-input-number>
      </el-form-item>
      <el-form-item label="旷工扣分:" prop="absenteeismDeduct">
        <el-input-number v-model="deductScoreForm.absenteeismDeduct" :min="1" :max="100" :disabled="true"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div> -->
  </el-dialog>
</template>
<script>

import { getDeductMarks } from "@/api/attendance";

export default {
  data() {
    return {
      visible: false,
      dialogTitle: "扣分管理",
      deductScoreForm: {
        lateDeduct: 1,
        absenteeismDeduct: 5
      },
      rules: {
        // lateDeduct: [
        //   { required: true, message: "迟到扣分必须填写", trigger: "blur" },
        // ],
        // absenteeismDeduct: [
        //   { required: true, message: "矿工扣分必须填写", trigger: "blur" },
        // ]
      },
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
      this.getDeductMarks();
    },
    //提交
    submit() {
      this.btnDisabled = true;
      this.$refs.deductScoreFormRef.validate((valid) => {
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
      this.$refs["deductScoreFormRef"].resetFields();
      this.visible = false;
      for (const key in this.deductScoreForm) {
        this.deductScoreForm[key] = "";
      }
    },
    getDeductMarks(){
      const that = this;
      getDeductMarks().then(
        (res) => {
          if (res.code === 200) {
            that.deductScoreForm.lateDeduct = res.data.lateDeduct;
            that.deductScoreForm.absenteeismDeduct = res.data.absenteeismDeduct;
          }
        },
        (err) => {
          that.$message({ type: "error", message: err.msg || "" });
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.deduct-score-form {
    >>>.el-input-number__decrease,
    >>>.el-input-number__increase{
        width: 32px;
        height: 30px;
        line-height: 30px;
        top: 4px;
    }
}
</style>
