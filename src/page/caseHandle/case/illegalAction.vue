<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">违法行为通知书</div>
        <div class="border_blue"></div>
        <div class="content_form">
          <el-form :inline="true" :model="illegalActForm" label-width="135px">
            <div class="row" align="right">
              <div class="col">
                <el-form-item label="案号："></el-form-item>
                <el-input style="width:200px;"></el-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="当事人姓名：">
                  <el-input style="width:600px;"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法行为：">
                  <el-input style="width:600px;"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法依据：">
                  <el-input style="width:600px;"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚依据：">
                  <el-input style="width:600px;"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="拟处罚决定：">
                  <el-input style="width:600px;"></el-input>
                </el-form-item>
              </div>
            </div>

            <div>
              <div class="row">
                <el-form-item label="当事人权利：">
                   
                </el-form-item>
              </div>
            </div>
            
            <div class="row">
              <div class="col">
                <el-form-item label="联系地址：">
                  <el-input style="width:200px;"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="邮编：">
                  <el-input style="width:200px;"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="联系人：">
                  <el-input style="width:200px;"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话 ：">
                  <el-input style="width:200px;"></el-input>
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
@import "../../../css/documentForm.less";
</style>
