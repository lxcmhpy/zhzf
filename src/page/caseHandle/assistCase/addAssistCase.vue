<template>
  <div class="add_dialog add-assist-step">
    <div class="add_dialog_content" style="width: 78%;">
      <div class="step_content">
        <el-steps :active="stepActive" finish-status="success" class="steps">
          <el-step title="选择案件"></el-step>
          <el-step title="协查详情"></el-step>
          <el-step title="文书制作"></el-step>
          <el-step title="生成文书"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 选择案件 -->
    <SelectCase v-if="stepActive === 0" @nextStep="nextStep" @selectedCase="setAssistCaseData" />
    <!-- 协查详情 -->
    <AssistDetail v-if="stepActive === 1" @nextStep="nextStep" />
    <!-- 协助调查函 -->
    <AssistReport v-if="stepActive === 2" @nextStep="nextStep" />
    <!-- 生成报告 -->
    <CreateReport v-if="stepActive === 3" />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import SelectCase from "@/page/caseHandle/assistCase/selectCase";
import AssistDetail from "@/page/caseHandle/assistCase/assistDetail";
import AssistReport from "@/page/caseHandle/assistCase/assistReport";
import CreateReport from "@/page/caseHandle/assistCase/createReport";

export default {
  components: { SelectCase, AssistDetail, AssistReport, CreateReport },
  data() {
    return {
      stepActive: 0,
    };
  },
  methods: {
    // 下一步
    nextStep(step){
      this.stepActive = step;
      sessionStorage.setItem('AssistStep', step);
    },
    // 页面刷新回到当前步骤
    setCurrentStep(){
      this.stepActive = sessionStorage.getItem('AssistStep') - 0;
    },
    // 记录案件数据到缓存
    setAssistCaseData(caseData){
      sessionStorage.setItem('AssistData', JSON.stringify({ case: caseData }));
    }
  },
  created() {},
  mounted() {
    this.setCurrentStep();
  }
};
</script>
<style lang="scss" src="@/assets/css/documentForm.scss"  scoped>
</style>

<style scoped>
.steps /deep/ .el-step__icon {
  font-size: 18px;
  width: 42px !important;
  height: 42px;
}

.steps /deep/ .is-process /deep/ .el-step__icon {
  background: #4573d0;
  color: #ffffff;
  border-color: #4573d0;
}

.steps /deep/ .el-step__head.is-success {
  color: #4573d0;
  border-color: #4573d0;
}

.steps /deep/ .el-step__title.is-success {
  color: #b2b2b2;
}

.steps /deep/ .el-step__icon /deep/ .el-step__icon-inner {
  font-weight: 400;
}

.steps /deep/ .el-step__main {
  white-space: normal;
  text-align: left;
  margin-top: -42px;
  margin-left: 42px;
  padding-left: 11px;
  width: 66px;
  z-index: 1;
  position: relative;
}

.steps /deep/ .el-step.is-horizontal .el-step__line {
  height: 2px;
  top: 21px;
  left: 128px;
  right: 26px;
}

.list /deep/ .el-checkbox__input {
  vertical-align: middle;
  position: absolute;
  top: 3px;
}

.list /deep/ .el-checkbox__label {
  width: calc(100% - 22px);
  padding-left: 22px;
  line-height: 20px;
  font-size: 14px;
  color: #20232b;
  font-weight: 600;
}

.pointer /deep/ .el-input__inner {
  cursor: pointer !important;
}
</style>

<style lang="scss" scoped>
.add-assist-step {
  .steps {
    width: auto;
  }
}
</style>
