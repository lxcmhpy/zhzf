<template>
<div>
  <el-dialog
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
        height="1000px"
        append-to-body
    >
    <template slot="title">
        <div class="ql-title">
            {{title}}
        </div>
    </template>
    <!-- <el-row>
        <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }"> -->
            <div class="ql-container ql-snow">
              <div class="ql-editor">
                <div v-html="content"></div>
              </div>
          </div>
        <!-- </el-card>
        </el-col>
    </el-row> -->
  </el-dialog>

    <el-dialog
        :visible.sync="visible1"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
        height="1000px"
        append-to-body
        >
        <template slot="title">
            <div class="ql-title">
                {{title}}
            </div>
        </template>
        <iframe class="print_info" style="padding:0px;width: 960px;margin:0 auto;height:500px" title="dd" :src="storagePath"></iframe>
        <!-- <object v-if="storagePath">
            <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
        </object> -->
  </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    components: {
    },
    data() {
      return {
        content : ``,
        visible : false,
        visible1: false,
        storagePath: null,
        title: ''
    }
  },
  methods: {
      showPDF (id, title) {
          this.title = title;
          // this.storagePath = 'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +id + '?&fullfilename='+this.title+'.pdf&time='+new Date().getTime())+'&time='+new Date().getTime();
          this.storagePath = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +id + '?time='+new Date().getTime();
          this.visible1 = true;
      },
      showModal(content, title) {
        this.visible = true;
        this.title = title;
        this.content = content;
      },
      closeDialog() {
        this.visible = false;
      },
    },
    computed: {
    }
  }

</script>
<style type="scss" >
   .ql-container *{
      line-height: 1.7em;
      font-family: '宋体';
   }
   .ql-title {
      text-align: center;
      font-family: '宋体';
      font-size:22px;
      font-weight:bolder;
      margin: 30px 20px 10px 30px;
   }
   .ql-container.ql-snow {
     min-height: 550px;
    border:0px;
  }
</style>
