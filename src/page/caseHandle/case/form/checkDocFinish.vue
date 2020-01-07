<template>
    <el-dialog :title="title" width="30%" :visible.sync="visible" :close-on-click-modal="false">
      <el-row :gutter="20" v-for="item in checkList" :key="item.id">
        <el-col :span="18" class="text_center">
          {{item.name}}
        </el-col>
        <el-col :span="6">
          <i v-if="item.status == '1'" class="el-icon-circle-check"></i>
          <i v-if="item.status == '0' ||item.status == ''" class="el-icon-circle-close"></i>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">确认</el-button>

      </span>
    </el-dialog>

</template>
<script>
export default {
  data() {
    return {
      visible: false,
      checkList: [],
      title: '无法进入下一环节',
    };
  },
  mounted() { },
  inject: ['reload'],
  methods: {
    //新增
    showModal(data) {
      //显示弹框
      this.visible = true;
      this.checkList = data
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.checkList = [];
    },
    // 弹框关闭按钮
    resetForm() {
      this.visible = false;
      //   this.$nextTick(() => {
      //     this.$refs["addUserForm"].resetFields();
      //   });
    },
  }
};
</script>
<style scoped>
.el-row {
  font-size: 18px;
}
.text_center{
    text-align: center;
}
</style>




