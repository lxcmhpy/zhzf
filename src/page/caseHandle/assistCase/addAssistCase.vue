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
    <SelectCase />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import SelectCase from '@/page/caseHandle/assistCase/selectCase';

export default {
  components: { SelectCase },
  data() {
    return {
        stepActive: 0
    };
  },
  methods: {
  },
  created() {},
  mounted() {
  }
}
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
.add-assist-step{
    .steps{
        width: auto;
    }
}
</style>
