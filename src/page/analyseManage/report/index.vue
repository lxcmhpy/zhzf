<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>案件人员专题报告 <a class=‘download‘ :href='downloadhttp' download=""  title="下载">下载</a></span>

    <span slot="footer" class="dialog-footer">
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        downloadhttp:'',
        dialogVisible: true
      }
    },
    methods:{
      download(){

      }
    }
  }
</script>

<style scoped>

</style>
