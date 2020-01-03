<template>
  <div class="searchAndpageBox" id="waitDealBox">
    <div>我是案件总览</div>
    <el-button @click="continueHandle">继续办理</el-button>
    <nextLinkDialog ref="nextLinkDialogRef" @myChooseNext="getMyChooseNext"></nextLinkDialog>
  </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
import { mixinGetCaseApiList } from "@/js/mixins";
import nextLinkDialog from "../components/nextLinkDialog";

export default {
  data() {
    return {
      caseInfo: this.$route.params.caseInfo,
      nextLink:[],
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    nextLinkDialog
  },
  methods: {
    //继续办理  跳转流程图   但是还没加流程图 
    continueHandle() {
      this.$store.dispatch('deleteTabs', 'caseInfo');
      // this.$router.push({
      //     name: "flowChart",
      //     params: {
      //       id: this.caseInfo.id
      //     }
      // })
      this.com_whatIsNext(this.caseInfo.id);
    },
    //获取弹窗中选中的环节id
    getMyChooseNext(targetLink){
        console.log(targetLink);
        let nextLink = this.com_getCaseRouteName(targetLink);
        console.log(nextLink);
        this.$router.push({name:nextLink,params:{id:this.caseInfo.id}})
    }
  },
  created() {}
};
</script>