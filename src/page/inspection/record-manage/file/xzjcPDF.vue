<template>
  <div class="print_box" style="width:790px;margin:0 auto;">
    <!-- {{storagePath}} -->
    <!-- <div class="print_info"> -->
    <!-- <embed v-for="(item,index) in storagePath" :key="index" class="print_info"
           style="padding:0px;width: 730px;position:relative" name="plugin" id="plugin" :src="item"
           type="application/pdf" internalinstanceid="29"> -->
    <!-- </div>  -->
    <xzjcDocFloatBtns :storagePath="storagePath" :pageDomId="'establish-print'" :formOrDocData="formOrDocData" @submitData="submitData" @backHuanjie="backHuanjie" @reInstall="reInstall" @showApprovePeopleList="showApprovePeopleList" @showApproval="findCurrentApproval"></xzjcDocFloatBtns>
    <!-- {{pdfShowUrl}} -->
    <!-- <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople> -->
    <!-- <approvalDialog ref="approvalDialogRef" @getNewData="approvalOver"></approvalDialog> -->

    <!-- <el-button @click="$refs.pdf[0].print()">打印</el-button> -->
    <!-- <pdf v-for="i in numPages" :key="i" ref="pdf" :src="pdfUrl" :page="i" style="border-bottom:1px solid"></pdf> -->
    <div class="div-float">
      <!-- <embed width="790px" height="1119px" :src="pdfShowUrl" > -->
      <iframe style="width:780px;height:1119px" :src="pdfShowUrl" width="800" height="600"></iframe>
    </div>
    <el-button type="primary" style="width: 70px;height: 40px;position: fixed;top: 115px;left: 240px;" @click="back">返回</el-button>
  </div>
</template>
<script>

import iLocalStroage from "@/common/js/localStroage";
import xzjcDocFloatBtns from "../writeRecordCompoments/xzjcDocFloatBtns.vue";
import { mapGetters } from "vuex";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import {
  updateDocStatusApi, getCurrentApproveApi, getFileStreamByStorageIdApi,
} from "@/api/caseHandle";

import { getDocumentById, } from "@/api/inspection";
// import pdf from 'vue-pdf'
export default {
  data() {
    return {
      storagePath: [],
      formOrDocData: {
        showBtn: [false, true, false, false, false, true], //提交、保存、撤销、暂存、删除、签章
        pageDomId: "",
      },
      docFinishQZ: false, //环节下文书是否已完成签章
      pdfUrl: '',
      numPages: 0,
      pdfShowUrl: ''
    };
  },
  // mixins: [mixinGetCaseApiList],
  components: {
    //   showApprovePeople,
    //   approvalDialog,
    xzjcDocFloatBtns,
    // pdf
  },
  computed: { ...mapGetters(['caseId', 'docId', 'approvalState', 'docDataId', 'caseLinktypeId']) },
  methods: {
    print() {
      for (var i = 0; i < this.storagePath.length; i++) {
        // new PDFObject({ url: this.storagePath[i] }).embed();
      }
    },
    reInstall(val) {
      console.log('reinstall')
      this.$set(this, 'storagePath', [])
      this.getFile()


    },
    getFile() {
      console.log('this.$route.params', this.$route.params)
      if (this.$route.params && this.$route.params.id) {
        // this.$store.commit('setid', this.$route.params.id)
        let _that = this
        getDocumentById(this.$route.params.id).then(
          res => {
            if (res.code == 200) {
              // _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res.data.pdfPath)
              _that.storagePath = res.data.pdfPath || res.data.picPath
              _that.pdfShowUrl = res.data.pdfPath || res.data.picPath
              // 外网专用，发布需要修改
              // if(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST)
              _that.pdfShowUrl = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + (res.data.pdfStorageId || res.data.picStorageId)
              _that.storagePath = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + (res.data.pdfStorageId || res.data.picStorageId)
              console.log('_that.storagePath', _that.storagePath)
              console.log('_that.storagePath222', this.$route.params.storagePath)
              if (res.data.pdfStorageId) {
                // this.getFileStream(res.data.pdfStorageId)
              } else {
                this.formOrDocData.showBtn = [false, false, true, false, true, false] //提交、保存、撤销、暂存、删除、签章
              }
              // this.getFileStream('13,205a17b3c499')
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {

          })

      }
      // this.$store.dispatch("getFile", {
      //   docId: '5cad5b54eb97a15250672a4c397cee56',
      //   caseId: '297708bcd8e80872febb61577329194f'
      // }).then(
      //   res => {
      //     console.log(res[0].storagePath)
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    },
    isApproval() {
      //审批
      console.log('this.approvalState', this.approvalState)
      if (this.approvalState == 'approvaling') {
        //审核人员进入 只有审核按钮
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, true, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回

      } else if (this.approvalState == 'approvalOver') {
        //审核人员审核完成 只有打印按钮
        this.formOrDocData.showBtn = [false, false, false, true, false, true, false, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      } else if (this.approvalState == 'approvalBefore') {
        //执法人员提交审批
        this.formOrDocData.showBtn = [false, false, false, true, false, false, true, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      } else if (this.approvalState == 'submitApproval') {
        //执法人员提交审批之后
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }

      //文书预览只有返回按钮
      if (this.$route.params.hasBack && this.$route.params.status == 2) {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    showApprovePeopleList() {
      this.$refs.showApprovePeopleRef.showModal();
    },
    //审批完成 重新获取pdf
    approvalOver() {
      this.reload();
    },

    //文书提交返回环节
    submitData() {
      if (this.$route.params.caseLinktypeId) {
        this.com_goToNextLinkTu(this.caseId, this.$route.params.caseLinktypeId)
      } else {
        console.log('this.$route.params.docDataId', this.$route.params.docDataId)
        updateDocStatusApi(this.$route.params.docDataId).then(res => {
          console.log('更新状态', res);
          this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
          if (this.$route.params.status == 1) {
            this.$router.go(-1);
          } else {
            console.log('退回信息采集')
            this.$router.go(-2);
          }

        }).catch(err => { console.log(err) })

      }
    },
    backHuanjie() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },

    //获取当前是几级审批
    findCurrentApproval() {
      console.log('文书数据idthis.docDataId', this.docDataId)
      getCurrentApproveApi(this.docDataId).then(res => {
        console.log('几级审批', res);
        let caseData = {
          caseId: this.caseId,
          currentApproval: res.data.currentIndex, //当前是几级审批
          approvalNumber: res.data.amount   //共几级审批
        }
        this.$refs.approvalDialogRef.showModal(caseData);
      }).catch(err => { console.log(err) })
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {

      getFileStreamByStorageIdApi(storageId).then(res => {
        // getFileStreamByStorageIdApi('12,13ac7d04e13f').then(res=>{

        console.log(res);
        this.getObjectURL(res);
      }).catch(err => {
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
      console.log(url);
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask.promise.then(pdf => {
        console.log('pdf.numPages', pdf.numPages)
        console.log('pdf.pdfUrl', loadingTask)
        this.pdfUrl = loadingTask;
        this.numPages = pdf.numPages;
      }).catch((err) => {
        this.$message('pdf加载失败')
      })
    },
    back() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      // this.$router.go(-1);//返回上一层
      this.$router.push({
        name: 'inspection_inspectionFiles',
        // params: { id: this.formOrDocData.pageDomId || this.$route.params.id }
        // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
        params: { id: this.formOrDocData.pageDomId || this.$route.params.id, edit: this.formOrDocData.pageDomId ? false : true }
      });
    },

  },
  mounted() {
    this.getFile();
  },
  created() {
    this.isApproval();
  },
  ready() {
    window.addEventListener('focus', this.handleWinFocus);
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.handleWinFocus);
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/*  @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style lang="scss" >
.div-float {
  width: 790px;
  height: 1117px;
  position: fixed;
  top: 93px;
  left: auto;
  right: auto;
  // background: pink;
}
</style>

