<template>
  <div class="print_box">
      <div class="print_info">
        打印页面
      </div> 
    <casePageFloatBtns :pageDomId="'establish-print'" :formOrDocData="formOrDocData" @saveData="saveData" @showApprovePeopleList="showApprovePeopleList" @showApproval="showApproval"></casePageFloatBtns>

    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="setData"></approvalDialog>
  </div>
</template>
<script>

import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";
import casePageFloatBtns from '@/components/casePageFloatBtns/casePageFloatBtns.vue'
import showApprovePeople from "../../components/showApprovePeople";
import approvalDialog from "../../components/approvalDialog";
export default {
  data() {
    return {
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
    casePageFloatBtns
  },
  methods: {
    isApproval(){
      //立案登录有审批按钮
      if(this.$route.params.hasApprovalBtn){
        this.formOrDocData.showBtn =[false,false,false,true,false,true,true,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }else{
        this.formOrDocData.showBtn.showBtn=[true,false,false,true,false,true,true,false,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回

      }
      //只有审核按钮
      if(this.$route.params.isApproval){
        this.formOrDocData.showBtn =[false,false,false,false,false,false,false,true,false,false]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    showApprovePeopleList(){
      let data={
        caseId:this.caseId,
        caseLinktypeId:'2c90293b6c178b55016c17c255a4000d'
      }
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval(){
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : '';
      let caseData={
        caseId:this.caseId,
        caseLinktypeId:"2c90293b6c178b55016c17c255a4000d",
        firstApproval:approvePeo,
        approvalNumber:2 //2次审批
      }
      this.$refs.approvalDialogRef.showModal(caseData);
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
  created() {
    this.isApproval();
  }
};
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>

