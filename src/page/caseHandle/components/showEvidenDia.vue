<template>
  <el-dialog
    title="证据预览"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    top="60px"
    width="400px"
  >
    <div class="eviBox">
      <img :src="srcImg" >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible =false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import { updateEvdenceNameApi } from "@/api/caseHandle";


export default {
  data() {
    return {
      visible: false,
      srcImg:'',
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(data) {
//        console.log(data);
        this.setSrc(data.evPath);
        this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    setSrc(evPath){
       let srcImg = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST +evPath;
//       console.log('srcImg',srcImg);
       this.srcImg = srcImg;
    }
  }
};
</script>
<style lang="scss" scoped>
.eviBox{
    width: 100%;
    max-height: 500px;
    overflow: auto;
}
</style>

