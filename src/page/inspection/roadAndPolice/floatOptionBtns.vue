<template>

  <!-- 悬浮按钮 -->
  <div class="float-btns" style="bottom:250px">
    <el-button type="primary" @click="submitDataBtn(1)">
      <i class="iconfont law-save"></i>
      <br />保存
    </el-button>
    <el-button type="primary" @click="saveDataBtn(1)" v-if="formOrDocData.showBtn[1]">
      <i class="iconfont law-save"></i>
      <br />保存
    </el-button>
    <el-button type="primary" @click="cancleSub(0)" v-if="formOrDocData.showBtn[2]&&inspectionFileEdit">
      <i class="iconfont law-save"></i>
      <br />撤销
    </el-button>
    <el-button type="primary" @click="submitDataBtn(0)" v-if="formOrDocData.showBtn[3]">
      <i class="iconfont law-save"></i>
      <br />暂存
    </el-button>
    <el-button type="primary" @click="delDataBtn(0)" v-if="formOrDocData.showBtn[4]&&inspectionFileEdit">
      <i class="iconfont law-save"></i>
      <br />删除
    </el-button>
    <el-button type="primary" @click="makeSeal" v-if="formOrDocData.showBtn[5] && showQZBtn &&inspectionFileEdit">
      <i class="iconfont law-approval"></i>
      <br />签章
    </el-button>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from '@/common/js/localStroage';
import { changeFileStatus, documentRevoke, delDocumentById } from "@/api/inspection";

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
  computed: { ...mapGetters(['inspectionFileId', 'docId', 'showQZBtn','inspectionFileEdit']) },
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

      // let fileName = _this.storagePath[0].split("/");
      let fileName = 'zelinggaizheng';
      let fileId = fileName[fileName.length - 1];

      let websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        let _url = iLocalStroage.gets('CURRENT_BASE_URL').QZ_SOCKET_HOST+"/socket/" + fileId
        // let _url = "ws://172.16.170.44:8083/socket/" + fileId
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
        console.log('收到消息', event)
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
        console.log('innerHTML', innerHTML);

        if (innerHTML === '0' || innerHTML === 'close') {
          // if (!innerHTML) {
          // alert(innerHTML)
          console.log('emit')
          _this.$emit('reInstall', '1');
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
        }else{
          console.log(error,'error')
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
        // _this.storagePath = 'http://172.16.170.54:9332/8,2067302d4168'
        // _this.storagePath = 'http://124.192.215.10:9332/14,20cb17801f2b'
        console.log('_this.storagePath', _this.storagePath)
        var ActivexURL = path + "/static/js/iWebPDFEditor.html?pdfPath=" + _this.storagePath
        // var ActivexURL = path + "/static/js/iWebPDFEditor.html?pdfPath=http://172.16.170.54:9332/14,205ca69bdf11"
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
      // this.$emit('submitData', handleType);
      // 隐藏提交、暂存按钮，显示保存签章按钮
      // this.$set(this.formOrDocData.showBtn, 3, false)
      // this.$set(this.formOrDocData.showBtn, 0, false)
      // this.$set(this.formOrDocData.showBtn, 5, true)
      // this.$set(this.formOrDocData.showBtn, 1, true)
      this.$emit('saveData', handleType);
    },
    saveDataBtn(handleType) {
      if (handleType == 1 || handleType == 0) {
        // 保存
        // 隐藏保存、签章按钮，显示撤销、删除按钮
        // this.$emit('saveDataStatus', handleType);
        // debugger
        console.log(this.$route.params)
        // 保存-修改状态
        changeFileStatus(this.$route.params.id||this.inspectionFileId).then(
          res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              if (handleType == 1) {
                this.storagePath = res.data.storagePath
                // 隐藏保存、签章按钮，显示撤销、删除按钮
                this.$set(this.formOrDocData.showBtn, 5, false)
                this.$set(this.formOrDocData.showBtn, 1, false)
                this.$set(this.formOrDocData.showBtn, 2, true)
                this.$set(this.formOrDocData.showBtn, 4, true)

              }
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {

          })
        // this.$set(this.formOrDocData.showBtn, 5, false)
        // this.$set(this.formOrDocData.showBtn, 1, false)
        // this.$set(this.formOrDocData.showBtn, 2, true)
        // this.$set(this.formOrDocData.showBtn, 4, true)
      }
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
    delDataBtn() {
      delDocumentById(this.inspectionFileId).then(
        res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
            this.$router.push({
              name: 'inspection_inspectionFiles',
              params: { id: this.inspectionOrderId }
              // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
            });

          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })
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
    },
    cancleSub() {
      // 撤销
      this.$confirm('是否撤销当前文书（签章作废）？', "撤销记录文书", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

        // 保存-修改状态
        documentRevoke(this.inspectionFileId).then(
          res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
              this.$router.push({
                name: 'inspection_correctNotice',
                // params: { id: this.formOrDocData.pageDomId || this.$route.params.id }
                // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
              });
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {

          })

        this.$set(this.formOrDocData.showBtn, 2, false)
        this.$set(this.formOrDocData.showBtn, 4, false)
        this.$set(this.formOrDocData.showBtn, 5, true)
        this.$set(this.formOrDocData.showBtn, 1, true)
        console.log('删除')

      })
    }
  },
  mounted() {
    //   this.makeSealStr = iLocalStroage.gets('CURRENT_BASE_URL').QZ_ACTIVEX_HOST + 'iWebPDFEditor-V5.1/MultBrowser.html?path='
    //     + iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '13,10a8b0e21ded'
  }
}
</script>
