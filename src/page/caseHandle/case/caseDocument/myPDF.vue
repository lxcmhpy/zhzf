<template>
  <div class="print_box" id="myBox" style="width:790px;margin:0 auto;">
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
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
    
    <!-- <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(pdfUrl)" frameborder="0" style="width:790px;height:1119px"></iframe> -->
    <!-- 该方法不能显示签章 -->
    <!-- <pdf v-for="i in numPages" :key="i" ref="pdf" :src="pdfUrl" :page="i" style="border-bottom:1px solid"></pdf> -->
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
    updateDocStatusApi,getCurrentApproveApi,getFileStreamByStorageIdApi,getDocDetailByIdApi,
  } from "@/api/caseHandle";
  import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";

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
      caseSlideMenu
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
            console.log('地址1',res);
            //单份文书取一个
            if (res.length == 1) {
              _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res[0].storageId)
              this.getFileStream(res[0].storageId)
            }else{
              //多份文书按照docDataId取地址
              for (var i = 0; i < res.length; i++) {
                if (this.$route.params.docDataId && this.$route.params.docDataId == res[i].docDataId) {
                  console.log('res[i].storageId', res[i].storageId);
                  this.getFileStream(res[i].storageId)
                  _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res[i].storageId)
                  break;
                }
              }
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
          this.formOrDocData.showBtn = [false, false, false, true, false, true, true, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
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
        if(this.storagePath.length == 0){
          this.$messageOne.info({showClose: true, message: '未获取到PDF文件！'})
          return;
        }
        this.$refs.showApprovePeopleRef.showModal();
      },
      //审批完成 重新获取pdf
      approvalOver() {
        this.reload();
      },

      //文书提交返回环节
      submitData() {
        if (this.$route.params.caseLinktypeId) {
          console.log('退回0000000')
          this.com_goToNextLinkTu(this.caseId, this.$route.params.caseLinktypeId)
        } else {
          console.log('this.$route.params.docDataId',this.$route.params.docDataId)
          updateDocStatusApi(this.$route.params.docDataId).then(res=>{
            console.log('更新状态',res);
            this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
            if(this.$route.params.status == 1){
              console.log('退回11111')
              this.$router.go(-1);
            }else{
              console.log('退回信息采集')
               this.$router.go(-2);
            }

          }).catch(err=>{console.log(err)})

        }
      },
      backHuanjie() {
        console.log('backHuanjie');
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-1);
      },

      //获取当前是几级审批
      async findCurrentApproval(){
        if(this.storagePath.length == 0){
          this.$messageOne.info({showClose: true, message: '未获取到PDF文件！'})
          return;
        }
        console.log('文书数据idthis.docDataId',this.docDataId)

        //获取文书的审批意见时间
        let docDataRes= await getDocDetailByIdApi(this.docDataId);
        console.log('docDataRes',docDataRes);
        let currentDocData = JSON.parse(docDataRes.data.docData);
        console.log('currentDocData',currentDocData)
        let oldApprovalOpion,oldApprovalTime = '';

        let currentApproveRes = await getCurrentApproveApi(this.docDataId);
        console.log('几级审批',currentApproveRes);
        if(currentApproveRes.data.currentIndex == "1"){  //一级审批
              oldApprovalOpion = currentDocData.old_approveOpinions; 
              oldApprovalTime = currentDocData.old_approveTime;
        }else if(currentApproveRes.data.currentIndex == "2"){
              oldApprovalOpion = currentDocData.old_secondApproveOpinions;
              oldApprovalTime = currentDocData.old_secondApproveTime;
        }else if(currentApproveRes.data.currentIndex == "3"){
              oldApprovalOpion = currentDocData.old_thirdApproveOpinions;
              oldApprovalTime = currentDocData.old_thirdApproveTime;
        }

        let caseData={
            caseId:this.caseId,
            currentApproval:currentApproveRes.data.currentIndex, //当前是几级审批
            approvalNumber:currentApproveRes.data.amount ,  //共几级审批
            oldApprovalOpion:oldApprovalOpion, //环节回退或修改文书之后自动带入旧的审批
            oldApprovalTime:oldApprovalTime
        }
        this.$refs.approvalDialogRef.showModal(caseData);

        // getCurrentApproveApi(this.docDataId).then(res=>{
        //   console.log('几级审批',res);
        //   let caseData={
        //     caseId:this.caseId,
        //     currentApproval:res.data.currentIndex, //当前是几级审批
        //     approvalNumber:res.data.amount   //共几级审批
        //   }
        //   this.$refs.approvalDialogRef.showModal(caseData);
        // }).catch(err=>{console.log(err)})
      },
      //根据stroagId请求文件流
      getFileStream(storageId){
        //设置地址
        this.$store.commit("setDocPdfStorageId", storageId);
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
        this.pdfUrl =url;

        // let myBox = document.getElementById('myBox');
        let myBox = document.getElementById("myBox");
        let iframes = document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; i++) {
          myBox.removeChild(iframes[i]);
        }
        let  myIframe = document.createElement('iframe');
        myIframe.setAttribute("src", '/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
        myIframe.setAttribute('style','width:790px;height:1119px');
        myBox.appendChild(myIframe);
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

