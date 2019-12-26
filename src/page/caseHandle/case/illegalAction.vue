<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">违法行为通知书</div>
        <div class="border_blue"></div>
        <div class="content_form">
          <el-form :inline="true" :model="illegalActForm">
            <div class="row" align="right">
              <el-form-item label="案号："></el-form-item>
              <el-input style="width:200px;"></el-input>
            </div>
            <div class="row">
              <el-form-item label="当事人姓名：">
                <el-input style="width:680px;"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="违法行为：">
                <el-input style="width:700px;"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="违法依据：">
                <el-input style="width:700px;"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="处罚依据：">
                <el-input style="width:700px;"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="拟处罚决定：">
                <el-input style="width:670px;"></el-input>
              </el-form-item>
            </div>

            <div>
              <div class="row">
                <el-form-item label="当事人权利：">
                  <!-- <el-checkbox><el-checkbox>陈述申辩权利
                  <el-checkbox><el-checkbox>举行听证权利-->
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="border_blue"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      illegalActForm: {},
      rules: {
        caseName: [
          { required: true, message: "当事人姓名必须填写", trigger: blur }
        ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../../css/caseHandle/caseDocument.less";
</style>
