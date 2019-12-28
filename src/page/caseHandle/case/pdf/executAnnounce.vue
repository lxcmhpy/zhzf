<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之十八 ：执行公告</div> -->
      <div class="pdf-title">
        执行公告
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p><span class="pdf-line width250">&nbsp;</span>一案，本机关于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日作出了
          <span class="pdf-line width430">&nbsp;</span>
          的决定，的决定，决定书案号为
          <span class="pdf-line width250">&nbsp;</span>。
        </p>

        <p>
          依据《中华人民共和国行政强制法》第四十四条的规定，现责令当事人
          <span class="pdf-line width430">&nbsp;</span>
          立即停止违法行为并于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          时前自行拆除违法的建筑物、构筑物、设施等。当事人在法定期限内不申请行政复议或者提起行政诉讼，又不拆除的，本机关将依法强制拆除。
        </p>
        <p>特此公告。</p>
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