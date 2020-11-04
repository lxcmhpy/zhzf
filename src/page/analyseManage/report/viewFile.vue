<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div
      class="print_box"
      id="myBox"
      style="width: 790px; margin: 0 auto"
    ></div>
  </div>
</template>

<script>
import {
  createPDF,
  findImageByCaseId,
  getFileStreamByStorageId,
} from "@/api/analysis/analysisManage.js";
import { deleteFileByCaseAndHuanjieApi } from "@/api/caseHandle";

export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    this.createPDF();
    // this.deleteAllFile();
  },
  methods: {
    //删除全部附件
    deleteAllFile() {
      console.log("删除全部");
      let data = {
        caseId: JSON.parse(localStorage.getItem("userInfo")).organId,
        docId: "59c43f205545fc8970e119ab550accff", //7f18de7c1447a4f730cebe06ef30551b
      };
      deleteFileByCaseAndHuanjieApi(data).then(
        (res) => {
          console.log("删除全部", res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async createPDF() {
      await this.deleteAllFile();
      let id = JSON.parse(localStorage.getItem("userInfo")).organId;
      await createPDF(id);
      await this.getFile();
    },
    async getFile() {
      let id = JSON.parse(localStorage.getItem("userInfo")).organId;
      let res = await findImageByCaseId(id);
      let pdfId = res.data[0].storageId;

      if (pdfId) {
        this.getFileStream(pdfId);
      }
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {
      getFileStreamByStorageId(storageId)
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
        // basic
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
  },
};
</script>
