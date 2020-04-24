<template>
  <el-dialog
    title="证据预览"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    top="60px"
    width="900px"
  >
    <div class="eviBox">
      <!--<img v-if="details.evType&&details.evType.indexOf('image') >= 0" :src="srcImg">-->
      <!--<embed :src="srcImg" :type="details.evType" width="100%" height="100%">-->
      <iframe :src='srcImg' width='100%' height='100%' frameborder='1'>
      </iframe>
      <!--<audio v-else-if="details.evType&&details.evType.indexOf('audio') >= 0" autoplay="autoplay">-->
      <!--<source :src="srcImg" type="audio/wav"/>-->
      <!--</audio>-->
      <!--<a v-else :href="srcImg"  target="_blank">-->
      <!--点击此处来预览 {{details.evName}}-->
      <!--</a>-->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible =false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import iLocalStroage from "@/common/js/localStroage";
  import {mapGetters} from "vuex";
  import {updateEvdenceNameApi} from "@/api/caseHandle";


  export default {
    data() {
      return {
        visible: false,
        srcImg: '',
        details: {}
      };
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(["caseId"])},
    methods: {
      showModal(data) {
        console.log(data);
        this.srcImg = ''
        this.details = JSON.parse(JSON.stringify(data))
        this.setSrc(data.evPath);
        if (this.details.evType && this.details.evType.indexOf('application') >= 0) {

        } else {
          this.visible = true;
        }
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
        this.srcImg = ''
      },
      setSrc(evPath) {
        let srcImg = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + evPath;
//       console.log('srcImg',srcImg);
        this.srcImg = srcImg;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .eviBox {
    width: 100%;
    height: 500px;
    overflow: auto;
  }
</style>

