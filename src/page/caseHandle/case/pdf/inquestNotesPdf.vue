<template>
<div class="main">
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">勘验笔录</div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p class="begin">
          案由：
          <span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          勘验时间：
          <span class="pdf-line width30">&nbsp;</span>年
          <span class="pdf-line width30">&nbsp;</span>日
          <span class="pdf-line width30">&nbsp;</span>时
          <span class="pdf-line width30">&nbsp;</span>分
          至
          <span class="pdf-line width30">&nbsp;</span>年
          <span class="pdf-line width30">&nbsp;</span>月
          <span class="pdf-line width30">&nbsp;</span>日
          <span class="pdf-line width30">&nbsp;</span>时
          <span class="pdf-line width30">&nbsp;</span>分
        </p>
        <p class="begin">
          勘验场所：
          <span class="pdf-line width250">&nbsp;</span>
          天气情况：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          勘验人：
          <span class="pdf-line width150">&nbsp;</span>
          单位及职务：
          <span class="pdf-line width150">&nbsp;</span>
          执法证号：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          勘验人：
          <span class="pdf-line width150">&nbsp;</span>
          单位及职务：
          <span class="pdf-line width150">&nbsp;</span>
          执法证号：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          当事人（当事人代理人）姓名：
          <span class="pdf-line width150">&nbsp;</span>
          性别：
          <span class="pdf-line width80">&nbsp;</span>
          年龄：
          <span class="pdf-line width80">&nbsp;</span>
        </p>
        <p class="begin">
          身份证号：
          <span class="pdf-line width250">&nbsp;</span>
          单位及职务：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          住址：
          <span class="pdf-line width250">&nbsp;</span>
          联系电话：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          被邀请人：
          <span class="pdf-line width250">&nbsp;</span>
          单位及职务：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          记录人：
          <span class="pdf-line width250">&nbsp;</span>
          单位及职务：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
            勘验情况及结果：
          <span class="pdf-line width587">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
        </p>
        <br><br>
        <p class="begin">
          当事人或其代理人签名：<span class="pdf-line width150">&nbsp;</span>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   勘验人签名:<span class="pdf-line width150">&nbsp;</span>
        </p>
        <br>
        <p class="begin">
            被邀请人签名
          <span class="pdf-line width555">&nbsp;</span> 
        </p>
        <br>
        
        <!-- <div class="pdf-wirte">
          <div class="pdf-seal">
            交通运输执法部门（印章）
            <br />年 月 日
          </div>
        </div>

        <p class="begin margin-top87">（本文书一式两份：一份存根，一份交当事人或其代理人。）</p> -->
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