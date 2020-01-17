<template>
  <div class="print_box">
      <!-- <div class="print_info"> -->
        <embed class="print_info" style="padding:0px;width: 730px;height:100% !important" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
      <!-- </div>  -->
    <casePageFloatBtns :pageDomId="'establish-print'" :formOrDocData="formOrDocData" @submitData="submitData" @backHuanjie="backHuanjie" @showApprovePeopleList="showApprovePeopleList" @showApproval="showApproval"></casePageFloatBtns>

    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="approvalOver"></approvalDialog>
  </div>
</template>
<script>

import pdf from 'vue-pdf'

import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";
import casePageFloatBtns from '@/components/casePageFloatBtns/casePageFloatBtns.vue'
import showApprovePeople from "../../components/showApprovePeople";
import approvalDialog from "../../components/approvalDialog";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      storagePath: null,
      formOrDocData:{
        showBtn:[true,false,false,true,false,true,true,false,false,false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId:"",
      },
    };
  },
  mixins:[mixinGetCaseApiList],
  components: {
    showApprovePeople,
    approvalDialog,
    casePageFloatBtns,
    pdf
  },
  computed:{...mapGetters(['caseId'])},
  methods: {
    getFile () {
      console.log('docId',this.$route.params.docId);
      console.log('caseId',this.caseId)

      this.$store.dispatch("getFile", {
          docId: this.$route.params.docId,
          caseId: this.caseId,
        }).then(
        res => {
          console.log(res[0].storagePath)
          this.storagePath = res[0].storagePath
        },
        err => {
          console.log(err);
        }
      );
    },
    isApproval(){
      //立案登录有审批按钮
      if(this.$route.params.hasApprovalBtn){
        this.formOrDocData.showBtn =[false,false,false,true,false,true,true,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }else{
        this.formOrDocData.showBtn=[true,false,false,true,false,true,false,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回

      }
      //审核人员进入 只有审核按钮
      if(this.$route.params.isApproval){
        this.formOrDocData.showBtn =[false,false,false,false,false,false,false,true,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
      //审核人员审核完成 只有打印按钮
      if(this.$route.params.approvalOver){
        this.formOrDocData.showBtn =[false,false,false,true,false,false,false,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
      //文书预览只有返回按钮
      if(this.$route.params.hasBack){
        this.formOrDocData.showBtn =[false,false,false,false,false,false,false,false,false,true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    showApprovePeopleList(){
      let data={
        caseId:this.caseId,
        caseLinktypeId:this.$route.params.caseLinktypeId
      }
      console.log('daaaaa',data)
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
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
    approvalOver(){
      // this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      // this.com_getFormDataByCaseIdAndFormId(this.caseId,'2c90293b6c178b55016c17c255a4000d',true);
      // this.formOrDocData.showBtn =[false,false,false,true,false,false,false,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
    },
    // setData(){
    //   this.com_getFormDataByCaseIdAndFormId(this.caseId,'2c90293b6c178b55016c17c255a4000d',false);
    // },
    //文书提交返回环节
    submitData(){
      if(this.$route.params.caseLinktypeId){
        this.com_goToNextLinkTu(this.caseId,this.$route.params.caseLinktypeId)
      }else{
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-2);
      }
    },
    backHuanjie(){
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },

    // 盖章
    makeSeal() {
      console.log('盖章!');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    
  },
  mounted () {
    this.getFile();
    // this.setData();
  },
  created() {
    this.isApproval();
  }
};
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>

