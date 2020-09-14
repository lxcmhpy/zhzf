<template>
<el-dialog
    title="打印"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="55%"
    class="fullscreen"
    append-to-body
  >
   <div class="print_box" id="myBox" style="width:790px;margin:0 auto;"></div>
</el-dialog>
</template>

<script>
import { 
    getFileStreamByStorageId
} from "@/api/device/deviceCertificateBill.js";
export default {
  data () {
    return {
      storagePath: null,
      visible:false
    }
  },
  methods: {
    // 打开弹窗
    showModal(storagePath) {
      this.visible = true
      this.getFileStream(storagePath)
    },
    // 关闭弹窗
    closeDialog() {
      this.visible = false;
    },
      //根据stroagId请求文件流
      getFileStream(storageId){
        getFileStreamByStorageIdApi(storageId).then(res=>{
          this.getObjectURL(res);
        }).catch(err=>{
          console.log(err);
        })
      },
      // 将返回的流数据转换为url
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file);
          } catch (error) {

          }
        } else if (window.URL != undefined) { // mozilla(firefox)
          try {
            url = window.URL.createObjectURL(file);
          } catch (error) {

          }
        }
        this.pdfUrl =url;
        let myBox = document.getElementById("myBox");
        let iframes = document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; i++) {
          myBox.removeChild(iframes[i]);
        }
        let  myIframe = document.createElement('iframe');
        myIframe.setAttribute("src", '/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
        myIframe.setAttribute('style','width:790px;height:1119px');
        myBox.appendChild(myIframe);
      },
  },
}
</script>
