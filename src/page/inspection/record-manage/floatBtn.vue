<template>

  <!-- 悬浮按钮 -->
  <div class="float-btns" style="bottom:250px">

    <el-button type="primary" @click="makeSeal" v-if="formOrDocData.showBtn[5] && showQZBtn">
      文书填报
    </el-button>
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[10]">
      相关记录
    </el-button>
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[0]">
      操作记录
    </el-button>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from '@/common/js/localStroage';

export default {
  data() {
    return {
      // docId
      makeSealStr: '',
      // showQZBtn:false,  //是否显示签章按钮
    }
  },
  props: ['formOrDocData', 'storagePath'],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId', 'docId', 'showQZBtn']) },
  methods: {
    //   打印方法
    async printContent() {
    },
    uploadFile(file, name) {
      var f = new File([file.output("blob")], name, { type: 'application/pdf' })
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId', this.caseId)
      fd.append('docId', '5cad5b54eb97a15250672a4c397cee56')
      fd.append('category', '文书');

      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err);
        }
      );
    },
    // 盖章
    makeSeal() {
      let _this = this;

      let fileName = _this.storagePath[0].split("/");
      let fileId = fileName[fileName.length - 1];

      let websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        let _url = "ws://124.192.215.4:8083/socket/" + fileId
        websocket = new WebSocket(_url);
      } else {
        alert('Not support websocket')
      }

      //连接发生错误的回调方法
      websocket.onerror = function () {
        setMessageInnerHTML("error");
      };

      //连接成功建立的回调方法
      websocket.onopen = function (event) {
        setMessageInnerHTML("open");
      }

      //接收到消息的回调方法
      websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
      }

      //连接关闭的回调方法
      websocket.onclose = function () {
        setMessageInnerHTML("close");
      }

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        websocket.close();
      }

      //将消息显示在网页上
      function setMessageInnerHTML(innerHTML) {
        console.log(innerHTML);
        if (innerHTML === '1') {
          _this.$emit('reInstall');
        }

      }

      //关闭连接
      function closeWebSocket() {
        websocket.close();
      }

      //   signature.openURL('oeder');
      // let ActivexURL = "http://172.16.170.44:8083/iWebPDFEditor-V5.1/MultBrowser.html?path=http://172.16.170.54:9332/12,3b11e8faa6"
      // MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);

      openURL();

      function callBackBrowserURL(error, id) {
        if (error == 0) {  //调用成功
          MultBrowser.waitStatus(id, "2", callBackWaitStatus);
        }
      }

      function callBackWaitStatus(id, error, status, msg) {
        if (error == 0) {
          if (status == "0") {
            //超时
            //alert("我啥也不做");
          }
          else {
            //成功
            alert(status + "---" + msg);  //通过这里的数据进行刷新调用方页面等操作
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
        var ActivexURL = path + "/static/js/iWebPDFEditor.html?pdfPath=" + _this.storagePath[0]
        console.log(ActivexURL);
        _this.makeSealStr = ActivexURL;
        window.MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);
      }

      function getParam(paramName) {
        let paramValue = "";
        let isFound = !1;
        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
          arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("="), i = 0;
          paramValue = arrSource[1];
        }
        return paramValue == "" && (paramValue = null), paramValue;
      }
    },
    submitDataBtn(handleType) {
      //判断是环节的提交还是文书的提交
      this.$emit('submitFileData', handleType);
    },
    saveDataBtn(handleType) {
      this.$emit('saveFileData', handleType);
      // //当前环节为文书时
      // if(this.formOrDocData.isHuanjie){
      //   this.com_submitCaseForm(handleType, this.formOrDocData.formRef, this.formOrDocData.nextShowPdf);
      // }else{
      //   //文书保存
      //   this.com_addDocData(handleType, this.formOrDocData.formRef);
      // }
    },
    getFile() {
      this.$store.dispatch("getFile", {
        docId: '5cad5b54eb97a15250672a4c397cee56',
        caseId: '297708bcd8e80872febb61577329194f'
      }).then(
        res => {
          console.log(res[0].storagePath)
        },
        err => {
          console.log(err);
        }
      );
    },
    //保存文书信息
    //  addDocData(handleType){
    //   let _this = this
    //   this.com_addDocData(handleType,'docForm').then(
    //     res => {
    //       _this.$message({
    //         type: "success",
    //         message: "保存成功",
    //       });
    //       _this.$store.dispatch("deleteTabs", _this.$route.name);//关闭当前页签
    //       _this.$router.push({
    //         name: 'caseDoc',

    //         params: {

    //         }
    //       });
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    // 跳转到pdf页面
    viewPDF() {
      this.$router.push({ name: "case_handle_viewPDF" })
    },
    showApprovePeopleListBtn() {
      this.$emit('showApprovePeopleList');
    },
    approvalBtn() {
      this.$emit('showApproval');
    },
    backHuanjieBtn() {
      this.$emit('backHuanjie');
    }
  },
  mounted() {

  }
}
</script>
