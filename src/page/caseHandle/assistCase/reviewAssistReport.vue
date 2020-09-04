<template>
  <el-dialog
    title="协助调查函"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="840px"
  >
    <div class="print_box" id="myBox" style="width:790px;margin:0 auto;"></div>
    <div slot="footer" class="dialog-footer">
      <div>
        <el-button @click="closeDialog">关 闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  getFileStreamByStorageIdApi,
  findByCaseIdAndDocIdApi
} from "@/api/caseHandle";

export default {
  data() {
    return {
      visible: false,
      storagePath: [],
      pdfUrl: "",
      numPages: 0,
      pdfId: "",
    };
  },
  computed:{
    hostUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  methods: {
    showModal(caseId) {
      this.visible = true;
      this.getFile(caseId);
    },
    getFile(caseId) {
      let data = {
        caseId: caseId,
        docId: "b7dd17dc97767e0ce8826c968b74ac89",
      };
      findByCaseIdAndDocIdApi(data).then(
        (res) => {
          this.pdfId = res.data[0].storageId;
          this.getFileStream(this.pdfId);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {
      //设置地址
      this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId)
        .then((res) => {
          this.getObjectURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {}
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {}
      }
      this.pdfUrl = url;

      let myBox = document.getElementById("myBox");
      let iframes = document.getElementsByTagName("iframe");
      for (let i = 0; i < iframes.length; i++) {
        myBox.removeChild(iframes[i]);
      }
      let myIframe = document.createElement("iframe");
      myIframe.setAttribute(
        "src",
        "/static/pdf/web/viewer.html?file=" + encodeURIComponent(url)
      );
      myIframe.setAttribute("style", "width:790px;height:1119px");
      myBox.appendChild(myIframe);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
