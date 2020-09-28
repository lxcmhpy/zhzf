<template>

  <!-- 悬浮按钮 -->
  <div class="float-btns" style="bottom:250px;">
      <!-- pdf文书可修改，立案登记和结案登记不可修改 审批中可修改,仅当前环节进行中可修改-->
    <!-- <span v-if="currentFileData"> -->
      <el-button type="primary"  style="margin-bottom: 10px;" @click="backWenshuBtn" v-if="isCanEdit">
        <i class="iconfont law-edit"></i>
        <br />修改
      </el-button>
    <!-- </span>  -->
    <!-- 立案登记的修改按钮 -->
    <el-button type="primary"  style="margin-bottom: 10px;" @click="editEstablish" v-if="approvalState=='approvalEstabishNoPass' || approvalState=='approvalFinishCaseReportNoPass'">
      <i class="iconfont law-edit"></i>
      <br />修改
    </el-button>
    <el-button type="primary" @click="makeSeal" v-if="formOrDocData.showBtn[5] && showQZBtn">
      <i class="iconfont law-approval"></i>
      <br />签章
    </el-button>
    <!-- </a> -->
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[0]">
      <i class="iconfont law-upload"></i>
      <br />提交
    </el-button>
    <el-button type="primary" @click="submitDataBtn(1)" v-if="formOrDocData.showBtn[10]">
      <i class="iconfont law-save"></i>
      <br />归档
    </el-button>
    <el-button type="primary" @click="saveDataBtn(1)" v-if="formOrDocData.showBtn[1]">
      <i class="iconfont law-save"></i>
      <br />保存
    </el-button>
    <el-button type="primary" @click="saveDataBtn(0)" v-if="formOrDocData.showBtn[2]">
      <i class="iconfont law-save"></i>
      <br />暂存
    </el-button>
    <el-button type="primary" @click="showApprovePeopleListBtn" v-if="formOrDocData.showBtn[6]">
      <i class="iconfont law-submit-o"></i>
      <br />提交<br />审批
    </el-button>
    <el-button type="primary" @click="approvalBtn" v-if="formOrDocData.showBtn[7]">
      <i class="iconfont law-edit"></i>
      <br />审批
    </el-button>
    <el-button type="primary" @click="backHuanjieBtn" v-if="formOrDocData.showBtn[9]">
      <i class="iconfont law-back"></i>
      <br />返回
    </el-button>
  

    <img src="" id="show">
  </div>
</template>
<!--<script src="@/common/js/MultBrowser-1.0.2.js"></script>-->
<script>

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from '@/common/js/localStroage';
import { queryFlowBycaseIdApi, updateDocStatusById, getLinkTypeInfoByIdApi } from "@/api/caseHandle";
import { nextTick } from 'vuedraggable';

export default {
  data() {
    return {
      makeSealStr: '',
      // showQZBtn:false,  //是否显示签章按钮
    }
  },
  props: ['formOrDocData', 'storagePath'],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId', 'docId', 'showQZBtn', 'currentFileData', 'approvalState', 'doingLinkId', 'caseLinktypeId', 'docPdfStorageId','caseApproval']),
  isCanEdit(){
    console.log('caseLinktypeId',this.caseLinktypeId,this.doingLinkId)
    console.log('this.currentFileData',this.currentFileData)
    if(!this.currentFileData){
      return false
    }
    console.log('getEstablish_caseLinktypeIdArr',this.BASIC_DATA_JX.getEstablish_caseLinktypeIdArr())
    // let data= this.$route.name=='case_handle_myPDF'
    // &&this.currentFileData.path!='case_handle_establish'&&this.currentFileData.path!='case_handle_finishCaseReport'
    // && (this.approvalState!='approvaling' && this.approvalState!='approvalEstabishNoPass' && this.approvalState!='approvalFinishCaseReportNoPass') &&this.caseLinktypeId==this.doingLinkId
    // return data
    let data= this.$route.name=='case_handle_myPDF'
    &&this.BASIC_DATA_JX.getEstablish_caseLinktypeIdArr().join(',').indexOf(this.caseLinktypeId)==-1
    &&this.BASIC_DATA_JX.getFinishCaseReport_caseLinktypeIdArr().join(',').indexOf(this.caseLinktypeId)==-1
    && (this.approvalState=='' || this.approvalState=='approvalBefore'|| this.approvalState=='approvalNoPass') &&this.caseLinktypeId==this.doingLinkId
    return data
;
  } },
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

      if (!fileId) {
        this.$messageOne.info({ showClose: true, message: '未获取到PDF文件！' })
        return;
      }
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

        queryFlowBycaseIdApi(_this.caseId).then(res => {
          console.log(res)
          var ActivexURL = ''
          if (res.data.flowUrl == 'commonGraphData_JX') {  //江西流程
            ActivexURL = path + "/static/js/iWebPDFEditorJx.html?pdfPath=" + _this.storagePath[0]
          } else {
            ActivexURL = path + "/static/js/iWebPDFEditor.html?pdfPath=" + _this.storagePath[0]
          }
          console.log(ActivexURL);
          _this.makeSealStr = ActivexURL;
          window.MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);
        }).catch(err => { this.$message('获取流程失败'); console.log('err') })


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
    backWenshuBtn() {
      // 文书回退
      let _this = this
      this.$confirm('修改操作将替换掉当前文书（包括签名签章），', '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        console.log('回退')

        //判断是单文书环节还是文书

        getLinkTypeInfoByIdApi(_this.caseLinktypeId).then(
          res => {
            if (res.code == 200) {
              let huanjieData = res
              console.log('查询环节是否生成了pdf', huanjieData);
              let isHuanjieDoc = false
              if (huanjieData.data.isPdf == 0) isHuanjieDoc = true;
              let data = {
                storageId: _this.docPdfStorageId,
                linkTypeId: isHuanjieDoc ? _this.caseLinktypeId : ''
              }
              updateDocStatusById(data).then(
                res => {
                  if (res.code == 200) { }
                  else {
                    _this.$message({
                      type: "error",
                      message: res.msg,
                    });
                  }
                },
                err => {
                  console.log(err);
                }
              );
              console.log('currentFileData', this.currentFileData)
              this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
              this.$router.push({
                name: this.currentFileData.path,
                params: {
                  id: this.currentFileData.id,
                  //案件ID
                  caseBasicinfoId: this.currentFileData.caseBasicinfoId,
                  docId: this.currentFileData.docId,
                  url: this.currentFileData.url
                }
              });
            }
            else {
              _this.$message({
                type: "error",
                message: res.msg,
              });
            }
          },
          err => {
            console.log(err);
          }
        );





      }).catch(() => { });
    },
    //返回立案登记表单
    editEstablish(){
      this.$emit('editEstablish');
    }
  },
  mounted() {
  }
}
</script>
