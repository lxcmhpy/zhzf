<template>
  <div class="main-box">
      <span class="examineDoingDetail">
         <!-- {{value}} -->
    </span>
    <dealNotes v-if="showFlag==='/overWeightCase'&&(value=='待办')||(value=='在办')||(value=='已回退')||(value=='办结')||(value=='机构待办')"></dealNotes>

    <!-- <dealNotesVeiw v-if="showFlag==='/overWeightCase'&&(value=='待办')"></dealNotesVeiw> -->

    <dealNotesSearch v-if="showFlag==='/transferAndRegisterCase'"></dealNotesSearch>

    <uoloadFiles v-if="showFlag==='/transferAndRegisterCase'"></uoloadFiles>

    <dealInProgress v-if="showFlag==='/overWeightCase'&&(value=='在办')||(value=='办结')"></dealInProgress>

    <!-- <dealProgress v-if="showFlag==='/overWeightCase'&&(value=='办结')"></dealProgress> -->

    <backNotes v-if="showFlag==='/overWeightCase'&&(value=='已回退')">></backNotes>

    <otherEnclosure v-if="showFlag==='/overWeightCase'&&(value=='待办')||(value=='在办')||(value=='已回退')||(value=='办结')||(value=='机构待办')"></otherEnclosure>

    <evidenceTransfer v-if="showFlag==='/overWeightCase'&&(value=='待办')||(value=='在办')||(value=='已回退')||(value=='办结')||(value=='机构待办')||showFlag==='/transferAndRegisterCase'"></evidenceTransfer>
    <!--
    <evidencePackage v-if="showFlag==='/overWeightCase'&&
    value=='待办'"></evidencePackage> -->

    <!-- 悬浮按钮 -->
    <div class="float-btns" style="bottom:50px">
      <el-button type="success" @click="goBack" v-if="showFlag==='/overWeightCase'&&
    (value=='待办')">
        <i class="iconfont law-back"></i>
        <br />任务<br />退回
      </el-button>

      <el-button type="primary" @click="goConfirmCase" v-if="showFlag==='/overWeightCase'&&
    (value=='待办')">
        <i class="iconfont law-approval"></i>
        <br />案件<br />办理
      </el-button>

      <el-button type="primary" @click="goConfirmCase" v-if="showFlag==='/overWeightCase'&&
    (value=='机构待办')">
        <i class="iconfont law-approval"></i>
        <br />转立案
      </el-button>

      <el-button type="primary" @click="goSure" v-if="showFlag==='/transferAndRegisterCase'">
        <i class="iconfont law-save"></i>
        <br />确认
      </el-button>
    </div>
    <goBackDialog ref="goBackDialogRef" @getNewData="goBackData"></goBackDialog>
    <confirmCaseDialog ref="confirmCaseDialogRef" @getNewData="goConfirmCaseData"></confirmCaseDialog>
  </div>
</template>
<script>
import dealNotes from '@/components/caseCenter/dealNotes.vue'
import dealNotesSearch from '@/components/caseCenter/dealNotesSearch.vue'
import dealNotesVeiw from '@/components/caseCenter/dealNotesVeiw.vue'
import backNotes from '@/components/caseCenter/backNotes.vue'
import dealProgress from '@/components/caseCenter/dealProgress.vue'
import dealInProgress from '@/components/caseCenter/dealInProgress.vue'
import otherEnclosure from '@/components/caseCenter/otherEnclosure.vue'
import evidenceTransfer from '@/components/caseCenter/evidenceTransfer.vue'
import evidencePackage from '@/components/caseCenter/evidencePackage.vue'
import uoloadFiles from '@/components/caseCenter/uoloadFiles.vue'

import goBackDialog from '@/components/cluesReview/caseBackDialog.vue'
import confirmCaseDialog from '@/components/cluesReview/confirmCase.vue'
export default {
  components: {
    dealNotes,
    dealNotesSearch,
    dealNotesVeiw,
    otherEnclosure,
    evidencePackage,
    dealProgress,
    dealInProgress,
    backNotes,
    evidenceTransfer,
    goBackDialog,
    uoloadFiles,
    confirmCaseDialog
  },
  data() {
    return {
      showFlag: '',
      value: '',
    }
  },
  methods: {
    goBackData() {

    },
    goConfirmCaseData() {

    },
    goSure() {
       this.$message({
        type: "success",
        message: "指派完成"
      });
      this.$router.push({ name: 'law_center_transferAndRegisterCase' })
    },
    goBack() {
      this.$refs.goBackDialogRef.showModal();
    },
    goConfirmCase() {
      this.$refs.confirmCaseDialogRef.showModal();

    },

  },
  mounted() {
    // console.log(iLocalStroage.gets("caseCenterDentails"));
    // this.showFlag = iLocalStroage.gets("caseCenterDentails").path
    // this.value = iLocalStroage.gets("caseCenterDentails").value
    // debugger;
    this.showFlag = this.$route.params.path;
    this.value = this.$route.params.value;
  },

}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
