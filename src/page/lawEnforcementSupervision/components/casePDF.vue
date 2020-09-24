<template>
  <div  id="myBox" style="width:790px;margin:0 auto;">
    <caseSlideMenu :activeIndex="''" :getFileStream="getFileStream"></caseSlideMenu>
    <div class="float-btns">
      <el-button
        type="primary"
        @click="showNext('last')"
        :disabled="!nowShowPdfIndex ? true : false"
      >
        上一
        <br />文书
      </el-button>
      <el-button
        type="primary"
        @click="showNext('next')"
        :disabled="nowShowPdfIndex == caseList.length-1 ? true : false"
      >
        下一
        <br />文书
      </el-button>
      <el-button type="primary" @click="showSupervisionOpinoin">
        督办
        <br />意见
      </el-button>
    </div>
    <addSupervisionOpinoin ref=addSupervisionOpinoinRef></addSupervisionOpinoin>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { getFileStreamByStorageIdApi } from "@/api/caseHandle";
import addSupervisionOpinoin from '../caseSupervision/dialog/addSupervisionOpinoin'
export default {
  data() {
    return {
      storagePath: [],
      pdfUrl: "",
      numPages: 0,
      nowShowPdfIndex: 0,
      caseList: [],
    };
  },
  computed: {
    ...mapGetters([
      "caseId",
      "docId",
      "approvalState",
      "docDataId",
      "caseLinktypeId",
    ]),
  },
  components: {
    caseSlideMenu,
    addSupervisionOpinoin,
  },
  methods: {
    getFile() {
      if (this.$route.params && this.$route.params.currentPdf) {
        // this.$store.commit('setDocId', this.$route.params.docId)
        let nowCasePdf = JSON.parse(this.$route.params.currentPdf);
        this.caseList = JSON.parse(this.$route.params.allCasePdf);
        console.log(" this.caseList", this.caseList);
        this.nowShowPdfIndex =
          this.caseList.findIndex(
            (item) => item.storageId == nowCasePdf.storageId
          ) + 1;
        console.log("this.nowShowPdfIndex", this.nowShowPdfIndex);
        this.getFileStream(nowCasePdf.storageId);
      }
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {
      //设置地址
      console.log("331231231312")
      this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId)
        .then((res) => {
          console.log(res);
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
      console.log(url);
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
    //上下翻页显示pdf
    showNext(flag) {
      if (flag == "last") {
        if (this.nowShowPdfIndex) {
          this.nowShowPdfIndex--;
          // this.docSrc = this.host + this.caseList[this.nowShowPdfIndex].storageId;
          this.getFileStream(this.caseList[this.nowShowPdfIndex].storageId);
        }
      } else {
        if (this.nowShowPdfIndex != this.caseList.length - 1) {
          this.nowShowPdfIndex++;
          this.getFileStream(this.caseList[this.nowShowPdfIndex].storageId);
        }
      }
    },
    //显示督办意见
    showSupervisionOpinoin() {
      this.$refs.addSupervisionOpinoinRef.showModel();
    },
    // sendZIndex(zindex){
    //   let btnclass = document.getElementsByClassName("float-btns");
    //   console.log('btnclass',btnclass)
    //   console.log('zindex',zindex)

    //   btnclass[0].setAttribute('z-index',newStyle);
    // }
  },
  mounted() {
    this.getFile();
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style type="scss">
</style>

