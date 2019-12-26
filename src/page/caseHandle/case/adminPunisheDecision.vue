<template>
    <div class="box">
        <div class="content_box">
      <div class="content">
          <div class="content_title">行政处罚决定书</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <el-form :inline="true" ref="adminPunishDecisionObj" :model="adminPunishDecisionForm" >
              <div class="row" align="right">
                <el-form-item label="案号："></el-form-item>
                  <el-input style="width:200px;" ></el-input>
              </div>
              <div class="row">
                <el-form-item label="当事人姓名：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
                  <el-form-item label="身份证号码：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
              </div>
              <div class="row">
                <el-form-item label="住址：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
                  <el-form-item label="联系电话：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
              </div>
              <div class="row">
                <el-form-item label="企业名称：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
                  <el-form-item label="地址：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
              </div>
              <div class="row">
                <el-form-item label="法定代表人：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
                  <el-form-item label="联系电话：" style="width:270px;"></el-form-item>
                  <el-input></el-input>
              </div>
              <div class="row">
                <el-form-item label="统一社会信用代码：" style="width:170px;"></el-form-item>
                  <el-input></el-input>
              </div>
              <div class="border_middle"></div>
              <div class="row">
                <el-form-item label="违法事实及依据：">
                  <textarea style="width:650px;height:100px"></textarea>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="违法条款：">
                  <el-input style="width:700px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="处罚依据：">
                  <el-input style="width:700px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="处罚金额：">
                  <el-input style="width:700px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="处罚决定：">
                  <el-input style="width:700px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="其他执行方式：">
                  <el-input style="width:670px;"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="缴费银行：">
                  <el-input style="width:200px;" placeholder="缴费银行"></el-input>
                  <el-input style="width:400px;" placeholder="缴费银行账户"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="行政复议机构：">
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称1"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="">
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称2"></el-input>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="">
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
                  <el-checkbox></el-checkbox>
                  <el-input style="width:200px;" placeholder="复议机构名称3"></el-input>
                </el-form-item>
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
      // caseName:''
    }
  }

}
</script>
<style lang="less">
@import "../../../css/caseHandle/caseDocument.less";
</style>