<template>
  <div class="print_box" id="myBox" style="width:790px;margin:0 auto;">
    <!-- 右侧按钮 -->
    <div class="assist-right-btn">
      <el-button class="assist-step-btn" type="primary" @click="makeSeal">盖章</el-button>
      <el-button class="assist-step-btn" type="primary" @click="submitAssist">提交</el-button>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";

import {
  getFileStreamByStorageIdApi,
  findByCaseIdAndDocIdApi,
  saveAssistCase,
} from "@/api/caseHandle";

export default {
  data() {
    return {
      storagePath: [],
      pdfUrl: "",
      numPages: 0,
      pdfId: "",
    };
  },
  components: {},
  computed: {
    selectCase() {
      const caseInfo = JSON.parse(sessionStorage.getItem("AssistData"));
      return caseInfo;
    },
    hostUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  mounted() {
    this.getFile();
  },
  methods: {
    getFile() {
      let data = {
        caseId: this.selectCase.case.caseId,
        docId: "b7dd17dc97767e0ce8826c968b74ac89",
      };
      findByCaseIdAndDocIdApi(data).then(
        (res) => {
          // _that.mlList = _that.host + res.data[0].storageId;
          this.pdfId = res.data[0].storageId;
          this.getFileStream(this.pdfId);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 盖章
    makeSeal() {
      let _this = this;
      let websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        let _url = iLocalStroage.gets('CURRENT_BASE_URL').QZ_SOCKET_HOST+"/socket/" + this.pdfId;
        websocket = new WebSocket(_url);
      } else {
        alert("Not support websocket");
      }

      //连接发生错误的回调方法
      websocket.onerror = function () {
        setMessageInnerHTML("error");
      };

      //连接成功建立的回调方法
      websocket.onopen = function (event) {
        setMessageInnerHTML("open");
      };

      //接收到消息的回调方法
      websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
      };

      //连接关闭的回调方法
      websocket.onclose = function () {
        setMessageInnerHTML("close");
      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        websocket.close();
      };

      //将消息显示在网页上
      function setMessageInnerHTML(innerHTML) {
        console.log(innerHTML);
        if (innerHTML === "1") {
          _this.getFile();
        }
      }

      //关闭连接
      function closeWebSocket() {
        websocket.close();
      }

      openURL();

      function callBackBrowserURL(error, id) {
        if (error == 0) {
          //调用成功
          MultBrowser.waitStatus(id, "2", callBackWaitStatus);
        }
      }

      function callBackWaitStatus(id, error, status, msg) {
        if (error == 0) {
          if (status == "0") {
            //超时
            //alert("我啥也不做");
          } else {
            //成功
            alert(status + "---" + msg); //通过这里的数据进行刷新调用方页面等操作
          }
          //继续循环监听
          MultBrowser.waitStatus(id, "2", callBackWaitStatus);
        }
      }

      function openURL() {
        var pdfPath = getParam("paramName");
        var test = window.location.href;
        var string = test.split("/");
        var path = string[0] + "//" + string[2] + "/";
        // path +
        var ActivexURL =
          path +
          "/static/js/iWebPDFEditor.html?pdfPath=" +
          _this.hostUrl +
          _this.pdfId;
        window.MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);
      }

      function getParam(paramName) {
        let paramValue = "";
        let isFound = !1;
        if (
          window.location.search.indexOf("?") == 0 &&
          window.location.search.indexOf("=") > 1
        ) {
          (arrSource = unescape(window.location.search)
            .substring(1, window.location.search.length)
            .split("=")),
            (i = 0);
          paramValue = arrSource[1];
        }
        return paramValue == "" && (paramValue = null), paramValue;
      }
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
          this.submitData();
        })
        .catch(() => {});
    },

    submitData() {
      const saveData = Object.assign(
        this.selectCase.case,
        this.selectCase.detail,
        this.selectCase.report
      );
      delete saveData.organType;
      delete saveData.createStartTime;
      delete saveData.acceptTime;
      delete saveData.createTime;
      delete saveData.fileList;
      saveData.launchOrgan = this.UserInfo.organName;
      saveData.organId = this.UserInfo.organId;
      saveData.status = "0";
      saveData.reply = "";
      saveAssistCase(saveData).then(
        (res) => {
          if (res.code === 200 && res.data) {
            this.$message({ type: "success", message: "提交成功" });
            this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
            this.$router.push({
              name: 'assistCase_JX',
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
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

