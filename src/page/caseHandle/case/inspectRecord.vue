<template>
  <div class="a4-box">
    <div class="pdf-box">
      <div>交通运输行政执法文书式样之三 ： 勘验笔录</div>
      <div class="pdf-title">
        勘验笔录
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        案由：<u class="pdf-line"></u><br>
        勘验时间： 年 月 日 时 分至 日 时 分
        勘验场所： 天气情况：
        勘验人： 单位及职务： 执法证号：
        勘验人： 单位及职务： 执法证号：
        当事人（当事人代理人）姓名： 性别： 年龄：
        身份证件号： 单位及职务：
        住址： 联系电话：
        被邀请人： 单位及职务：
        记录人： 单位及职务：
        勘验情况及结果：
        当事人或其代理人签名： 勘验人签名：
        被邀请人签名：
        记录人签名：
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