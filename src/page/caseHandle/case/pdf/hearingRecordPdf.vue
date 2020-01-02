<template>
<div class="main">
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">听证笔录</div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p class="begin">
          案件名称：
          <span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          支持听证机关：
          <span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          听证地点：
          <span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          听证时间：
          <span class="pdf-line width30"></span>年
          <span class="pdf-line width30"></span>日
          <span class="pdf-line width30"></span>时
          <span class="pdf-line width30"></span>分
          至
          <span class="pdf-line width30"></span>年
          <span class="pdf-line width30"></span>月
          <span class="pdf-line width30"></span>日
          <span class="pdf-line width30"></span>时
          <span class="pdf-line width30"></span>分
        </p>
        <p class="begin">
          支持人：
          <span class="pdf-line width250">&nbsp;</span>
          听证员：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          记录员：
          <span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          执法人员：
          <span class="pdf-line width250">&nbsp;</span>
          执法证号：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          执法人员：
          <span class="pdf-line width250">&nbsp;</span>
          执法证号：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p class="begin">
          当事人：
          <span class="pdf-line width150">&nbsp;</span>
          法定代表人：
          <span class="pdf-line width150">&nbsp;</span>
          联系电话：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          委托代理人：
          <span class="pdf-line width150">&nbsp;</span>
          性别：
          <span class="pdf-line width30">&nbsp;</span>
          年龄：
          <span class="pdf-line width30">&nbsp;</span>
          工作单位及职务：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          第三方：
          <span class="pdf-line width150">&nbsp;</span>
          性别：
          <span class="pdf-line width30">&nbsp;</span>
          年龄：
          <span class="pdf-line width30">&nbsp;</span>
          工作单位及职务：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          其他参与人员：
          <span class="pdf-line width80">&nbsp;</span>
          性别：
          <span class="pdf-line width30">&nbsp;</span>
          年龄：
          <span class="pdf-line width30">&nbsp;</span>
          工作单位及职务：
          <span class="pdf-line width150">&nbsp;</span>
        </p>
        <p class="begin">
          听证记录：<span class="pdf-line width555">&nbsp;</span>
        </p>
        <p class="begin">
          <span class="pdf-line width650">&nbsp;</span>
        </p>
        <p class="begin">
          <span class="pdf-line width650">&nbsp;</span>
        </p>
        <p class="begin">
          <span class="pdf-line width650">&nbsp;</span>
        </p>
        <br><br>
        <p class="begin">
          当事人或其代理人签名： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   支持人及听证员签名:<span class="pdf-line width150">&nbsp;</span>
        </p>
        <br>
        <p class="begin">
          <span class="pdf-line width250">&nbsp;</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          
          记录员签名:<span class="pdf-line width150">&nbsp;</span>
        </p>
        <br>
        <p class="begin">
          其他听证人员签名： 
        </p>
        <p class="begin">
          <span class="pdf-line width250"></span>
        </p>
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