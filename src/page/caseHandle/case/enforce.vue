<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">
        中止（终结、恢复）行政强制执行通知书
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p class="begin">当事人（个人姓名或单位名称） ：<span class="pdf-line width250">&nbsp;</span></p>
        <p><span class="pdf-line width430">&nbsp;</span>一案，本机关于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          依法作出了行政强制执行决定，并向你（单位）送达了《行政强制执行决定书》
          (案号：<span class="pdf-line width250">&nbsp;</span>)。</p>
        <p>□1.现因 ，根据《中华人民共和国行政强制法》第三十九条第一款的规定，本机关决定自
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          起中止该行政强制执行。中止执行的情形消失后，本机关将恢复执行。</p>
        <p>□2.现因
            <span class="pdf-line width430">&nbsp;</span>，
          根据《中华人民共和国行政强制法》第四十条的规定，本机关决定终结执行。</p>
        <p>□3.你(单位)<span class="pdf-line width430">&nbsp;</span>一案，本机关于
            <span class="pdf-line width80">&nbsp;</span>年
            <span class="pdf-line width80">&nbsp;</span>月
            <span class="pdf-line width80">&nbsp;</span>日
            决定中止执行，现中止执行的情形已消失，根据《中华人民共和国行政强制法》第三十九第二款的规定，决定从即日恢复强制执行。</p>
        <p>□4.本机关于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          与你（单位）达成执行协议，因你（单位）不履行执行协议，根据《中华人民共和国行政强制法》第四十二条第二款的规定，决定从即日恢复强制执行。</p>
        <p>特此通知。</p>
        <div class="pdf-wirte">
          <div class="pdf-seal">
            交通运输执法部门（印章）<br>
            年 月 日
          </div>

        </div>

        <p class="begin margin-top87">（本文书一式两份：一份存根，一份交当事人或其代理人。）</p>
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