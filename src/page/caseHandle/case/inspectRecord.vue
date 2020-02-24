<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之三 ： 勘验笔录</div> -->
      <div class="pdf-title">
        勘验笔录
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <div>案由：
          <span class="width650">&nbsp;</span>
        </div>
        <div>勘验时间：年 月 日 时 分至 日 时 分</div>
        <div>勘验场所： 天气情况：</div>
        <div>
          勘验人： 单位及职务： 执法证号：</div>
        <div>
          勘验人： 单位及职务： 执法证号：</div>
        <div>
          当事人（当事人代理人）姓名： 性别： 年龄：</div>
        <div>
          身份证件号： 单位及职务：</div>
        <div>
          住址： 联系电话：</div>
        <div>
          被邀请人： 单位及职务：</div>
        <div>
          记录人： 单位及职务：</div>
        <div>
          勘验情况及结果：</div>
        <div>
          当事人或其代理人签名： 勘验人签名：</div>
        <div>
          被邀请人签名：</div>
        <div>
          记录人签名：
        </div>
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
<style lang="scss">
@import "@/assets/css/pdf.scss";
</style>
