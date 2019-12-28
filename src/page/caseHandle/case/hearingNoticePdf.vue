<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">违法行为通知书</div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p class="begin">
          当事人（个人姓名或单位名称） ：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p>
          根据你（单位）申请，
          <span class="pdf-line width430">&nbsp;</span>行为，违反了
          <span class="pdf-line width430">&nbsp;</span>的规定，依据
          <span class="pdf-line width430">&nbsp;</span>的规定，本机关拟作出
          <span class="pdf-line width430">&nbsp;</span>的处罚决定。
        </p>
        <p>
          <input type="checkbox" />根据《中华人民共和国行政处罚法》第三十一条、第三十二条的规定，你
          （单位）如对该处罚意见有异议，可向本机关提出陈述申辩，本机关将依法予以
          核实。
        </p>
        <p>
          <input
            type="checkbox"
          />根据《中华人民共和国行政处罚法》第四十二条的规定，你（单位）有权
          在收到本通知书之日起三日内向本机关要求举行听证；逾期不要求举行听证的，
          视为你（单位）放弃听证的权利。
        </p>
        <p>（注：在序号前□内打“√”的为当事人享有该权利。）</p>
        <p>
            联系地址：<span class="pdf-line width250">&nbsp;</span>
            邮编：<span class="pdf-line width250">&nbsp;</span>
        </p>
        <p>
            联系人：<span class="pdf-line width250">&nbsp;</span>
            联系电话：<span class="pdf-line width250">&nbsp;</span>
        </p>
        <div class="pdf-wirte">
          <div class="pdf-seal">
            交通运输执法部门（印章）
            <br />年 月 日
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
      caseNumber: "010-123456"
    };
  }
};
</script>
<style lang="less">
@import "../../../css/pdf.less";
</style>