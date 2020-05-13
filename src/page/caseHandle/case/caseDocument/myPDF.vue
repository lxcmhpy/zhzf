<template>
  <div class="print_box" style="width:790px;margin:0 auto;">
    <!-- <div class="print_info"> -->
    <embed v-for="(item,index) in storagePath" :key="index" class="print_info"
           style="padding:0px;width: 730px;position:relative" name="plugin" id="plugin" :src="item"
           type="application/pdf" internalinstanceid="29">
    <!-- </div>  -->
    <casePageFloatBtns :storagePath="storagePath" :pageDomId="'establish-print'" :formOrDocData="formOrDocData"
                       @submitData="submitData" @backHuanjie="backHuanjie" @reInstall="reInstall"
                       @showApprovePeopleList="showApprovePeopleList"></casePageFloatBtns>

    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="approvalOver"></approvalDialog>
  </div>
</template>
<script>

  import pdf from 'vue-pdf'
  import iLocalStroage from "@/common/js/localStroage";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import casePageFloatBtns from '@/components/casePageFloatBtns/casePageFloatBtns.vue'
  import showApprovePeople from "../../components/showApprovePeople";
  import approvalDialog from "../../components/approvalDialog";
  import {mapGetters} from "vuex";

  import {
    updateDocStatusApi
  } from "@/api/caseHandle";
  export default {
    data() {
      return {
        storagePath: [],
        formOrDocData: {
          showBtn: [true, false, false, true, false, true, true, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
          pageDomId: "",
        },
        docFinishQZ:false, //环节下文书是否已完成签章
      };
    },
    mixins: [mixinGetCaseApiList],
    components: {
      showApprovePeople,
      approvalDialog,
      casePageFloatBtns,
      pdf
    },
    computed: {...mapGetters(['caseId', 'docId'])},
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
              _that.storagePath.push(iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res[0].storageId)
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      isApproval() {
        //立案登录有审批按钮
        if (this.$route.params.hasApprovalBtn) {
          this.formOrDocData.showBtn = [false, false, false, true, false, true, true, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        } else {
          this.formOrDocData.showBtn = [true, false, false, true, false, true, false, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回

        }
        //审核人员进入 只有审核按钮
        if (this.$route.params.isApproval) {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, true, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
        //审核人员审核完成 只有打印按钮
        if (this.$route.params.approvalOver) {
          this.formOrDocData.showBtn = [false, false, false, true, false, true, false, false, false, false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
        //文书预览只有返回按钮
        if (this.$route.params.hasBack && this.$route.params.status == 2) {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
      },
      showApprovePeopleList() {
        let data = {
          caseId: this.caseId,
          caseLinktypeId: this.$route.params.caseLinktypeId
        }
        console.log('daaaaa', data)
        this.$refs.showApprovePeopleRef.showModal(data);
      },
      // 审批弹窗
      // showApproval(){
      //   let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : '';
      //   let caseData={
      //     caseId:this.caseId,
      //     caseLinktypeId:"2c90293b6c178b55016c17c255a4000d",
      //     firstApproval:approvePeo,
      //     approvalNumber:2 //2次审批
      //   }
      //   this.$refs.approvalDialogRef.showModal(caseData);
      // },
      approvalOver() {
        // this.caseLinkDataForm.caseBasicinfoId = this.caseId;
        // this.com_getFormDataByCaseIdAndFormId(this.caseId,'2c90293b6c178b55016c17c255a4000d',true);
        // this.formOrDocData.showBtn =[false,false,false,true,false,false,false,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      },
      // setData(){
      //   this.com_getFormDataByCaseIdAndFormId(this.caseId,'2c90293b6c178b55016c17c255a4000d',false);
      // },
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
               this.$router.go(-2);
            }
            
          }).catch(err=>{console.log(err)})
          
        }
      },
      backHuanjie() {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-1);
      },
      // isCompete(){
      //   if(this.$route.params.isComplete){
      //     this.formOrDocData.showBtn = [false,false,false,false,false,false,false,false,false,true]
      //   }
      // },

      // 盖章
      makeSeal() {
        console.log('盖章!');
      },
      // 打印
      print() {
        console.log('打印!');
      },

    },
    mounted() {
      this.getFile();
      // this.setData();
    },
    created() {
      this.isApproval();
      // this.isCompete();
    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/caseDocModle.scss";
</style>

