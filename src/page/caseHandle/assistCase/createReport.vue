<template>
  <div class="print_box" id="myBox" style="width:790px;margin:0 auto;">
    <!-- 右侧按钮 -->
    <div class="assist-right-btn">
      <el-button class="assist-step-btn" type="primary">盖章</el-button>
      <el-button class="assist-step-btn" type="primary" @click="submitAssist">提交</el-button>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";

import {
  updateDocStatusApi,
  getCurrentApproveApi,
  getFileStreamByStorageIdApi,
} from "@/api/caseHandle";

export default {
  data() {
    return {
      storagePath: [],
      pdfUrl: "",
      numPages: 0,
    };
  },
  components: {},
  computed: {},
  methods: {
    getFile() {
      console.log("this.$route.params", this.$route.params);
      if (this.$route.params && this.$route.params.docId) {
        this.$store.commit("setDocId", this.$route.params.docId);
      }
      console.log("docId", this.docId);
      console.log("caseId", this.caseId);
      let _that = this;
      this.$store
        .dispatch("getFile", {
          docId: this.docId,
          caseId: this.caseId,
        })
        .then(
          (res) => {
            console.log("地址1", res);
            //单份文书取一个
            if (res.length == 1) {
              _that.storagePath.push(
                iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +
                  res[0].storageId
              );
              this.getFileStream(res[0].storageId);
            } else {
              //多份文书按照docDataId取地址
              for (var i = 0; i < res.length; i++) {
                if (
                  this.$route.params.docDataId &&
                  this.$route.params.docDataId == res[i].docDataId
                ) {
                  console.log("res[i].storageId", res[i].storageId);
                  this.getFileStream(res[i].storageId);
                  _that.storagePath.push(
                    iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +
                      res[i].storageId
                  );
                  break;
                }
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    showApprovePeopleList() {
      if (this.storagePath.length == 0) {
        this.$messageOne.info({
          showClose: true,
          message: "未获取到PDF文件！",
        });
        return;
      }
      this.$refs.showApprovePeopleRef.showModal();
    },
    //审批完成 重新获取pdf
    approvalOver() {
      this.reload();
    },

    // 提交
    submitAssist() {
      this.$confirm("提交成功后，将发送至目标机构。是否确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          this.$message({ type: "success", message: "提交成功!" });
        })
        .catch(() => {});
    },

    submitData() {
      if (this.$route.params.caseLinktypeId) {
        console.log("退回0000000");
        this.com_goToNextLinkTu(this.caseId, this.$route.params.caseLinktypeId);
      } else {
        console.log(
          "this.$route.params.docDataId",
          this.$route.params.docDataId
        );
        updateDocStatusApi(this.$route.params.docDataId)
          .then((res) => {
            console.log("更新状态", res);
            this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
            if (this.$route.params.status == 1) {
              console.log("退回11111");
              this.$router.go(-1);
            } else {
              console.log("退回信息采集");
              this.$router.go(-2);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    backHuanjie() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {
      //设置地址
      this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId)
        .then((res) => {
          // getFileStreamByStorageIdApi('12,13ac7d04e13f').then(res=>{

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

      // let myBox = document.getElementById('myBox');
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
  mounted() {},
  created() {},
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/*  @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style lang="scss" scoped>
.assist-right-btn {
  width: 48px;
  height: 100px;
  position: fixed;
  right: 70px;
  bottom: 70px;
  z-index: 100;
}
.assist-right-btn .assist-step-btn {
  border-radius: 50px;
  width: 50px;
  height: 50px;
  padding: 0;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
}
</style>

