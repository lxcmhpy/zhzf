<template>
  <el-dialog
    :title="docData.name"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="860px"
    class="duty-manage-edit-doc"
  >
    <!-- 公路安全隐患告知函 -->
    <HiddenDangerDoc ref="hiddenDangerDocRef" v-if="docData.id === '1'" />
    <!-- 路政巡查监督责令整改通知书 -->
    <InstructRectification ref="instructRectificationRef" v-if="docData.id === '2'" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="saveDoc">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import HiddenDangerDoc from './hiddenDangerDoc.vue';
import InstructRectification from './instructRectification.vue';

export default {
  components: { HiddenDangerDoc, InstructRectification },
  data() {
    return {
      visible: false,
      storagePath: [],
      pdfUrl: "",
      numPages: 0,
      pdfId: "",
      docData: {}
    };
  },
  computed:{ },
  methods: {
    showModal(doc) {
      this.docData = JSON.parse(JSON.stringify(doc));
      this.visible = true;
    },
    // 保存编辑信息
    saveDoc(){
      let refName = '';
      switch(this.docData.id){
        case '1':
          refName = 'hiddenDangerDocRef';
          break;
        case '2':
          refName = 'instructRectificationRef';
          break;
      }
      this.$refs[refName].validateForm().then(res => {
        if(res.code === 200){
          console.log(res.data);
        }
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.duty-manage-edit-doc{
    >>>.el-dialog{
        height: 70%;
    }
    >>>.el-dialog__body{
        position: relative;
        height: calc(100% - 190px);
    }
}
</style>
