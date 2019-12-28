<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之十九:催告书</div> -->
      <div class="pdf-title">
        催告书
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>

      <div class="pdf-report-info">
        <p>
          当事人（个人姓名或单位名称）
          <span class="pdf-line width250">&nbsp;</span>,

        </p>
        <p>
          因你（单位）
          <span class="pdf-line width250">&nbsp;</span>，本机关于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          作出了
          <span class="pdf-line width430">&nbsp;</span>
          的决定，的决定，决定书案号为
          <span class="pdf-line width250">&nbsp;</span>。
          你（单位）逾期未履行义务，根据《中华人民共和国行政强制法》第三十五条和
          第五十四条的规定，现就有关事项催告如下，请你（单位）按要求履行：
        </p>

        <p>1.履行标的：<span class="pdf-line width430">&nbsp;</span></p>
        <p>2.履行期限：<span class="pdf-line width430">&nbsp;</span></p>
        <p>3.履行方式：<span class="pdf-line width430">&nbsp;</span></p>
        <p>4.履行要求：<span class="pdf-line width430">&nbsp;</span></p>
        <p>5.其他事项：<span class="pdf-line width430">&nbsp;</span></p>
        <p>你（单位）逾期仍不履行的，本机关将依法采取以下措施：</p>
        <p><input type="checkbox">1.到期不缴纳罚款的，每日按罚款数额的百分之三加处罚款。</p>
        <p><input type="checkbox">2.根据法律规定，将查封、扣押的财物拍卖抵缴罚款。</p>
        <p><input type="checkbox">3.申请人民法院强制执行。</p>
        <p><input type="checkbox">4.依法代履行或者委托第三人：<span class="pdf-line width250">&nbsp;</span>代履行。</p>
        <p><input type="checkbox">5.其他强制执行方式：<span class="pdf-line width430">&nbsp;</span>。</p>
        <p>你（单位）可向本机关进行陈述或申辩，本机关将依法核实。</p>
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
@import "../../../../css/pdf.less";
</style>