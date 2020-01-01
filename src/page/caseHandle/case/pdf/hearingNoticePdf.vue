<template>
<div class="main">
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
          根据你（单位）申请，关于
          <span class="pdf-line width430">&nbsp;</span>一案，现定于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          <span class="pdf-line width80">&nbsp;</span>时在
          <span class="pdf-line width250">&nbsp;</span>（公开、不公开）举行听证会议，请准时出席。
        </p>
        <p>
          听证人姓名：<span class="pdf-line width250">&nbsp;</span>  职务：<span class="pdf-line width250">&nbsp;</span>
        </p>
        <p>
          记录员姓名：<span class="pdf-line width250">&nbsp;</span>  职务：<span class="pdf-line width250">&nbsp;</span>
        </p>
        <p>
          根据《中华人民共和国行政处罚法》第四十二条规定，你（单位）可以申请
听证主持人、听证员、记录员回避。
        </p>
        <p>
          注意事项如下：
        </p>
        <p>
          1.请事先准备相关证据，通知证人和委托代理人准时参加。
        </p>
        <p>
          2.委托代理人参加听证的，应当在听证会前向本机关提交授权委托书等有关
证明。
        </p>
        <p>
          3.申请延期举行的，应当在举行听证会前向本行政机关提出，由本机关决定
是否延期。
        </p>
        <p>
          4.不按时参加听证会且未事先说明理由的，视为放弃听证权利。
        </p>
        <p>
          特此通知。
        </p>
        <br><br>
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
@import "../../../../css/pdf.less";
</style>