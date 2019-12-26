<template>
  <div class="box">
    <div class="content">
      <div class="content_title">责令改正违法行为通知书</div>
      <div class="content_form">
        <el-form :inline="true" :model="orderCorrectIllegalActForm" :rules="rules">
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
                <el-form-item label="处罚依据：">
                  <el-input style="width:700px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="责令改正：">
                    <el-radio></el-radio>立即予以改正               
                </el-form-item>
              </div>
              <div class="row">
                  &#8195;&#8195;&#8195;&#8195;&#8195;
                  <el-radio></el-radio>限期改正或整改完毕
                  <!-- <el-date-picker></el-date-picker>                   -->
              </div>
              <div class="row">
                <el-form-item label="行政复议机构：">
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称1"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="">
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#32;
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称2"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="">
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#32;
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称3"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="行政诉讼机构：">
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="行政诉讼机构1："></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="">
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#32;
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="行政诉讼机构2："></el-input>
                </el-form-item>
              </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inquestNotesForm: {
        
      },
      rules: {
        caseName: [{ required: true, message: "当事人姓名必须填写" ,trigger:blur,readonly}]
      }
    };
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/caseDocument.less";
</style>
