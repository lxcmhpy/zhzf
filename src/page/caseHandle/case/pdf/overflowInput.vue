<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="35%">
    <el-form :model="addBannerForm" ref="addBannerForm" label-width="130px">
      <el-input type="textarea" :autosize="{ minRows: 2,}" placeholder="请输入内容" v-model="textarea">
      </el-input>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="overFloeEdit()">确 定</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  data() {
    return {
      visible: false,
      textarea: '',
      addBannerForm: '',
      dialogTitle: "多行编辑",
    }
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
//      console.log(1212);
      this.visible = true;
      this.dialogTitle = "多行编辑"
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addBannerForm"].resetFields();
      //this.errorOrganName = false;
    },
    //确定
    overFloeEdit() {
      //将当前内容传到父组件
      this.$emit("overFloeEditInfo", this.textarea);
      this.visible = false;
    //   this.reload();
    },
  }
}
</script>
