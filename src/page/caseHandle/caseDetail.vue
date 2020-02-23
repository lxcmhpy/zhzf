<template>
<!-- 待我审批 -->
<div class="com_searchAndpageBoxPadding">
      <el-button @click="approvalSure">审批</el-button>
</div>
</template>
<script>

import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      data:this.$route.params.data
    };
  },
  methods: {
    approvalSure(){
      console.log(this.data);
      let params={
        caseId:JSON.parse(this.data).id,
        executeHandle:'同意',
        caseLinktypeId:'2c90293b6c178b55016c17c255a4000d',
        jsonApproveData:JSON.stringify({'a':1})
      }
      this.$store.dispatch("approvalPdf", params).then(
        res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "审批通过"
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {

  }
};
</script>
