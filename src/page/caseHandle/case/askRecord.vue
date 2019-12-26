<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二 ：询问笔录</div> -->
      <div class="pdf-title">
        询问笔录
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">

        <div>时间： 年 月 日 时 分至 时 分 第 次询问</div>
        <div>地点：</div>
        <div>询问人： 记录人：</div>
        <div>被询问人： 与案件关系：</div>
        <div>性别： 年龄：</div>
        <div>身份证件号： 联系电话：</div>
        <div>工作单位及职务：</div>
        <div>联系地址：</div>
        <div>我们是___________________的执法人员 、 ，这是我</div>
        <div>们的执法证件，执法证号分别是 、 ，请你</div>
        <div>确认。现依法向你询问，请如实回答所问问题。执法人员与你有直接利害关系的，</div>
        <div>你可以申请回避。</div>
        <div>问：你是否申请回避？</div>
        <div>答：</div>
        <div>问：</div>
        <div>答：</div>
        <div>被询问人签名： 询问人签名：</div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      caseNumber: '010-123456',
    }  }
}
</script>
<style lang="less">
@import "../../../css/pdf.less";
</style>