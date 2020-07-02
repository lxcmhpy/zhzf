<template>
  <div class="print_box" style="width:790px;margin:0 auto;">
    <!-- <div class="print_info"> -->
    <!-- <embed v-for="(item,index) in storagePath" :key="index" class="print_info"
           style="padding:0px;width: 730px;position:relative" name="plugin" id="plugin" :src="item"
           type="application/pdf" internalinstanceid="29"> -->
    <!-- </div>  -->
    <casePageFloatBtns :storagePath="storagePath" :pageDomId="'establish-print'" :formOrDocData="formOrDocData"
                       @submitData="submitData" @backHuanjie="backHuanjie" @reInstall="reInstall"
                       @showApprovePeopleList="showApprovePeopleList" @showApproval="findCurrentApproval"></casePageFloatBtns>

    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="approvalOver"></approvalDialog>
    
    <el-button @click="$refs.pdf[0].print()">打印</el-button>
    <pdf v-for="i in numPages" :key="i" ref="pdf" :src="pdfUrl" :page="i" style="border-bottom:1px solid"></pdf>
  </div>
</template>
<script>

  import iLocalStroage from "@/common/js/localStroage";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import casePageFloatBtns from '@/components/casePageFloatBtns/casePageFloatBtns.vue'
  import showApprovePeople from "../../components/showApprovePeople";
  import approvalDialog from "../../components/approvalDialog";
  import {mapGetters} from "vuex";

  import {
    updateDocStatusApi,getCurrentApproveApi,getFileStreamByStorageIdApi,
  } from "@/api/caseHandle";
  import pdf from 'vue-pdf'
  export default {
    data() {
      return {
        storagePath: [],
        formOrDocData: {
          showBtn: [true, false, false, true, false, true, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
          pageDomId: "",
        },
        docFinishQZ:false, //环节下文书是否已完成签章
        pdfUrl:'',
        numPages:0,
      };
    },
    mixins: [mixinGetCaseApiList],
    components: {
      showApprovePeople,
      approvalDialog,
      casePageFloatBtns,
      pdf
    },
    computed: {...mapGetters(['caseId', 'docId','approvalState','docDataId','caseLinktypeId'])},
    methods: {
      print() {
        for (var i = 0; i < this.storagePath.length; i++) {
          // new PDFObject({ url: this.storagePath[i] }).embed();
        }
      },
      reInstall() {
        this.$set(this, 'storagePath', [])
        this.getFile()
      }, 
      getFile() {
        // debugger;
        console.log('this.$route.params',this.$route.params)
        if (this.$route.params && this.$route.params.docId) {
          this.$store.commit('setDocId', this.$route.params.docId)
        }
        console.log('docId', this.docId);
        console.log('caseId', this.caseId)
        let _that = this
        this.$store.dispatch("getFile", {
          docId: this.docId,
          caseId: this.caseId,
        }).then(
          res => {
            console.log('地址1',res)
            //多份文书按照docDataId取地址
            for (var i = 0; i < res.length; i++) {
              // if(i==0) {
              //   _that.storagePath.push(JSON.parse(iLocalStroage.gets("CURRENT_BASE_URL")).PDF_HOST+res[i].storageId)
              // }
              if (this.$route.params.docDataId && this.$route.params.docDataId == res[i].docDataId) {
                console.log('res[i].storageId', res[i].storageId);
                _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res[i].storageId)
                break;
              }
            }
            //单份文书取一个
            if (_that.storagePath.length == 0) {
              // _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res[0].storageId)
              this.getFileStream(res[0].storageId)

            }
          },
          err => {
            console.log(err);
          }
        );
      },
      isApproval() {
        //审批
        console.log('this.approvalState',this.approvalState)
        if(this.approvalState == 'approvaling'){
          //审核人员进入 只有审核按钮
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, true, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
         
        }else if(this.approvalState == 'approvalOver'){
          //审核人员审核完成 只有打印按钮
          this.formOrDocData.showBtn = [false, false, false, true, false, true, false, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }else if(this.approvalState == 'approvalBefore'){
          //执法人员提交审批
          this.formOrDocData.showBtn = [false, false, false, true, false, false, true, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }else if(this.approvalState == 'submitApproval'){
          //执法人员提交审批之后
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }

        //文书预览只有返回按钮
        if (this.$route.params.hasBack && this.$route.params.status == 2) {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
      },
      showApprovePeopleList() {
        // let data = {
        //   caseId: this.caseId,
        //   caseLinktypeId:this.caseLinktypeId,
        //   docId:this.docDataId
        // }
        // console.log('提交审批需要的数据',data)
        // this.$refs.showApprovePeopleRef.showModal(data);
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
          console.log('this.$route.params.docDataId',this.$route.params.docDataId)
          updateDocStatusApi(this.$route.params.docDataId).then(res=>{
            console.log('更新状态',res);
            this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
            if(this.$route.params.status == 1){
              this.$router.go(-1);
            }else{
              console.log('退回信息采集')
               this.$router.go(-2);
            }

          }).catch(err=>{console.log(err)})

        }
      },
      backHuanjie() {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-1);
      },

      //获取当前是几级审批
      findCurrentApproval(){
        console.log('文书数据idthis.docDataId',this.docDataId)
        getCurrentApproveApi(this.docDataId).then(res=>{
          console.log('几级审批',res);
          let caseData={
            caseId:this.caseId,
            currentApproval:res.data.currentIndex, //当前是几级审批
            approvalNumber:res.data.amount   //共几级审批
          }
          this.$refs.approvalDialogRef.showModal(caseData);
        }).catch(err=>{console.log(err)})
      },
      //根据stroagId请求文件流
      getFileStream(storageId){
        
        getFileStreamByStorageIdApi(storageId).then(res=>{
        // getFileStreamByStorageIdApi('12,13ac7d04e13f').then(res=>{

          console.log(res);
          this.getObjectURL(res);
        }).catch(err=>{
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
          console.log('pdf.numPages',pdf.numPages)
          console.log('pdf.pdfUrl',loadingTask)
          this.pdfUrl =loadingTask;
          this.numPages = pdf.numPages;
        }).catch((err) => {
          this.$message('pdf加载失败')
        })
      },

    },
    mounted() {
      this.getFile();
    },
    created() {
      this.isApproval();
    }
  };
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
 /*  @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>

