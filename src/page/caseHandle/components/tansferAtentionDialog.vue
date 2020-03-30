<template>
  <el-dialog class="dialog" title="提示" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="420px">
    <div>
      <p>
        <i v-if="flag=='移送中'" class="el-icon-warning" style="color:#e6a23c"></i>
        <i v-if="flag=='移送'" class="el-icon-question" style="color:#f56c6c"></i>
        {{message}}</p>
    </div>
    <span slot="footer" class="dialog-footer" >
      <el-button type="primary" size="medium" @click="visible = false">确认</el-button>
      <el-button size="medium" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      visible: false,
      message: '',
      flag: ''
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data, flag) {
      console.log(data);
      this.message = data
      this.flag = flag
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

  },
  mounted() { }
};
</script>
<style lang="css" scoped>
.dialog /deep/ .el-dialog__footer{
    border-top: 1px solid #E9EDF6;
}
</style>

