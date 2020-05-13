<template>

  <!-- 悬浮按钮 -->
  <div class="float-btns" style="bottom:250px">
    <!-- <a target="_blank" href="javascript:void(0)" @click="getFile()">访问</a>
    <a href="javascript:void(0)" @click="viewPDF()">跳转到pdf</a> -->

    <!-- <el-button type="success" @click="printContent" v-if="formOrDocData.showBtn[3]">

      <i class="iconfont law-print"></i>
      <br />打印
    </el-button> -->
    <!-- <el-button type="success" v-if="formOrDocData.showBtn[4]">
      <svg
        t="1577706400265"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3033"
        width="16"
        height="16"
      >
        <path
          d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z"
          p-id="3034"
          fill="#FFFFFF"
        />
      </svg>
      <br />编辑
    </el-button> -->
    <!-- v-if="formOrDocData.showBtn[5]" -->
    <el-button type="primary" @click="makeSeal" v-if="formOrDocData.showBtn[5]">
      <!-- -->
      <i class="iconfont law-approval"></i>
      <br/>签章
    </el-button>
    <!-- </a> -->
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[0]">
      <i class="iconfont law-upload"></i>
      <br/>提交
    </el-button>
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[10]">
      <i class="iconfont law-save"></i>
      <br/>归档
    </el-button>
    <el-button type="primary" @click="saveDataBtn(1)" v-if="formOrDocData.showBtn[1]">
      <i class="iconfont law-save"></i>
      <br/>保存
    </el-button>
    <el-button type="primary" @click="saveDataBtn(0)" v-if="formOrDocData.showBtn[2]">
      <i class="iconfont law-save"></i>
      <br/>暂存
    </el-button>
    <el-button type="primary" @click="showApprovePeopleListBtn" v-if="formOrDocData.showBtn[6]">
      <i class="iconfont law-submit-o"></i>
      <br/>提交<br/>审批
    </el-button>
    <el-button type="primary" @click="approvalBtn" v-if="formOrDocData.showBtn[7]">
      <i class="iconfont law-edit"></i>
      <br/>审批
    </el-button>
    <el-button type="primary" @click="backHuanjieBtn" v-if="formOrDocData.showBtn[9]">
      <i class="iconfont law-back"></i>
      <br/>返回
    </el-button>
    <img src="" id="show">
  </div>
</template>
<!--<script src="@/common/js/MultBrowser-1.0.2.js"></script>-->
<script>

  import {htmlExportPDF} from '@/common/js/htmlExportPDF'
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import iLocalStroage from '@/common/js/localStroage';

  export default {
    data() {
      return {
        // docId
        makeSealStr: ''
      }
    },
    props: ['formOrDocData', 'storagePath'],
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId', 'docId'])},
    methods: {
      //   打印方法
      async printContent() {
      },
      uploadFile(file, name) {
        var f = new File([file.output("blob")], name, {type: 'application/pdf'})
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
          let jsonApproveData = iLocalStroage.gets('jsonApproveData')
          let opinion = ''
          let time = ''
          let step = ''
          if (jsonApproveData.approveOpinions) {
            opinion = jsonApproveData.approveOpinions
            time = jsonApproveData.approveTime
            step = '1'
          } else if (jsonApproveData.secondApproveOpinions) {
            opinion = jsonApproveData.secondApproveOpinions
            time = jsonApproveData.secondApproveTime
            step = '2'
          } else if (jsonApproveData.thirdApproveOpinions) {
            opinion = jsonApproveData.thirdApproveOpinions
            time = jsonApproveData.thirdApproveTime
            step = '3'
          }
          var ActivexURL = path + "/static/js/iWebPDFEditor.html?pdfPath=" + _this.storagePath[0] + '&Opinion=' + opinion + '&time=' + time + '&docId=' + _this.docId + '&step=' + step;
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
        this.$emit('submitData', handleType);
      },
      saveDataBtn(handleType) {
        this.$emit('saveData', handleType);
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
        this.$router.push({name: "case_handle_viewPDF"})
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
      //   this.makeSealStr = iLocalStroage.gets('CURRENT_BASE_URL').QZ_ACTIVEX_HOST + 'iWebPDFEditor-V5.1/MultBrowser.html?path='
      //     + iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '13,10a8b0e21ded'
    }
  }
</script>
