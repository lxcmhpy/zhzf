<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之十七 ：分期（延期）缴纳罚款通知书</div> -->
      <div class="pdf-title">
        分期（延期）缴纳罚款通知书
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <P class="begin">
          当事人（个人姓名或单位名称）<span class="pdf-line width430">&nbsp;</span>:
        </P>
        <p>
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>
          日，本机关对你（单位）送达了（案号）《行政处罚决定书》，作出了对你（单位）罚款
          <span class="pdf-line width250">&nbsp;</span>。
          （大写）的行政处罚决定，根据你（单位）的申请，本机
          关依据《中华人民共和国行政处罚法》第五十二条的规定，现决定：
        </p>
        <p>
          <input type="checkbox">同意你（单位）延期缴纳罚款。延长至
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
        </p>
        <p>
          <input type="checkbox">同意你（单位）分期缴纳罚款。第
          <span class="pdf-line width80">&nbsp;</span>。期至
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日前，缴纳罚款
          <span class="pdf-line width80">&nbsp;</span>元（大写）（每期均应当单独开具本文书）。此外，尚有未缴纳的罚款
          <span class="pdf-line width80">&nbsp;</span>元（大写）。
        </p>
        <p>
          <input type="checkbox">由于<span class="pdf-line width430">&nbsp;</span>
          ，因此，本机关认为你的申请不符合《中华人民共和国行政处罚法》第五十二条的规定，不同意你（单位）分期（延期）缴纳罚款。
        </p>
        <p>代收机构以本通知书为据，办理收款手续。</p>
        <div class="pdf-wirte">
          <div class="pdf-seal">
            交通运输执法部门（印章）<br>
            年 月 日
          </div>

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
<style lang="less">
@import "../../../../css/pdf.less";
</style>