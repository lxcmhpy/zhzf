<template>
  <el-dialog
    title="请选择业务类型"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="22%"
    class="fullscreen select-bussiness-type-dialog"
    append-to-body
  >
    <div class="bussiness-type-wrap">
        <el-button type="primary" @click="selectType">发证申请</el-button>
        <el-button type="primary" @click="selectType">发证申请</el-button>
        <el-button type="primary" @click="selectType">发证申请</el-button>
        <el-button type="primary" @click="selectType">发证申请</el-button>
    </div>
  </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                visible: false
            };
        },
        methods: {
            // 打开弹出框
            showModal(){
                this.visible = true;
            },
            // 选择业务类型
            selectType(){
                this.visible = false;
            },
            // 关闭弹窗
            closeDialog(){
                this.visible = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
.select-bussiness-type-dialog {
  >>> .el-dialog {
    min-width: 420px;
  }
  .bussiness-type-wrap{
      margin: auto 85px;
      >>>.el-button{
          margin-left: 0;
          margin-bottom: 24px;
          display: block;
          width: 100%;
      }
  }
}
</style>