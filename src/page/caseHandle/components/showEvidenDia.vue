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
      <img v-if="details.evType&&details.evType.indexOf('image') >= 0" :src="srcImg">
      <!-- <video v-if="details.evType&&details.evType.indexOf('video') >= 0" :src="srcImg" ></video> -->
          <video v-if="details.evType&&details.evType.indexOf('video') >= 0" :src="srcImg" controls="controls" width="350px" height="400">your browser does not support the video tag</video>

      <audio v-if="details.evType&&details.evType.indexOf('audio') >= 0" autoplay="autoplay">
        <source :src="srcImg" type="audio/wav"/>
      </audio>
       <iframe v-if="details.evType&&details.evType.indexOf('application') >= 0" :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(srcImg)" frameborder="0" style="width:790px;height:1119px"></iframe>
      <!-- <a v-if="details.evType&&details.evType.indexOf('application') >= 0" :href="srcImg"  download="">下载</a> -->
      <!--<embed :src="srcImg" :type="details.evType" width="100%" height="100%">-->
      <!-- <iframe :src='srcImg' width='100%' height='100%' frameborder='1'>
      </iframe> -->
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
          // this.visible = true;
        }
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
        this.srcImg = ''
      },
      setSrc(evPath) {
//       console.log('srcImg',srcImg);
        // this.srcImg = srcImg;
        this.$util.com_getFileStream(evPath).then(res=>{
          this.srcImg = res;
          console.log('11111111',res)
          this.visible = true;
        }).catch(err=>{console.log(err)})
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

