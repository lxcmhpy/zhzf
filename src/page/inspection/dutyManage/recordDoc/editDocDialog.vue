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
    <HiddenDangerDoc ref="hiddenDangerDocRef" v-if="docData.type === '1'" :caseDocData="docData.caseDocData" />
    <!-- 路政巡查监督责令整改通知书 -->
    <InstructRectification ref="instructRectificationRef" v-if="docData.type === '2'" :caseDocData="docData.caseDocData"/>
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
      let caseDocTypeId = '';
      let name = '';
      let id = this.docData.id || null;
      switch(this.docData.type){
        case '1':
          refName = 'hiddenDangerDocRef';
          caseDocTypeId = '92531b11586dab1eba850aea1c415a4f';
          name = '《公路安全隐患告知函》';
          break;
        case '2':
          refName = 'instructRectificationRef';
          caseDocTypeId = '98499c305c6447988343c33d92f0f23c';
          name = '《路政巡查监督责令整改通知书》';
          break;
      }
      this.$refs[refName].validateForm().then(res => {
        if(res.code === 200){
          console.log(res.data);
          const doc = Object.assign(this.docData,{ caseDocTypeId, name, caseDocData: res.data })
          this.$emit("addDoc", doc);
          this.closeDialog();
        }else{
          this.closeDialog();
        }
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.docData = {};
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
