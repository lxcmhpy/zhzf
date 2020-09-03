<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-journal-dialog"
  >
    <el-form
      :model="addJournalForm"
      label-position="right"
      label-width="110px"
      ref="addJournalRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="选择门类" prop="businessType">
          <el-select v-model="addJournalForm.businessType" placeholder="请选择">
            <el-option
              v-for="item in businessOptions"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  props: {},
  data() {
    return {
      visible: false,
      addJournalForm: {
        businessType: ""
      },
      lawPersonList: [],
      rules: {
        businessType: [
          { required: true, message: "请选择门类", trigger: "change" }
        ]
      },
      dialogTitle: "添加日志", //弹出框title
      handelType: 0, //添加 0  修改2
      schedulingDay: "",
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {
    this.searchLawPerson();
  },
  methods: {
    // 是否用车
    changeUseCar() {
      this.addJournalForm.licensePlate = "";
    },
    // 排班时间变化
    timeChange() {
      console.log(this.addJournalForm.schedulingTime);
    },
    //提交
    submit() {
      this.$refs.addJournalRef.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });
          loading.close();
          this.closeDialog();
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addJournalRef"].resetFields();
      this.addJournalForm.businessType = ""
    },
  },
};
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
  display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  display: block;
  width: 100%;
}
>>> .el-range-editor.el-input__inner {
  display: inline-block;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  .el-range-input {
    height: 28px;
  }
}
</style>
