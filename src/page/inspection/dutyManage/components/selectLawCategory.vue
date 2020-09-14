<template>
  <!-- 添加日志选择执法门类 -->
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
              :value="item.cateId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {},
  data() {
    return {
      visible: false,
      addJournalForm: {
        businessType: ""
      },
      businessOptions: [],
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
  computed: {},
  created() {
    this.getEnforceLawType();
  },
  methods: {
    // 获取执法门类
    getEnforceLawType() {
      this.$store.dispatch("getEnforceLawType", "1").then(
        (res) => {
          this.businessOptions = res.data;
        },
        (err) => {}
      );
    },
    //提交
    submit() {
      this.$refs.addJournalRef.validate((valid) => {
        if (valid) {
          this.$router.push({
            name: 'add_duty_journal',
            params: { type: this.addJournalForm.businessType, page: 'journal',handelType:"1" }
          });
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
>>> .el-select{
  display: block;
}
</style>
