<template>
  <el-dialog
    title="选泽人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
  >
    <div class="chooseLawPer">
       <div class="choosed">
            
       </div>
       <div class="choose"></div>
    </div>
    
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  inject: ["reload"],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    
  }
};
</script>
