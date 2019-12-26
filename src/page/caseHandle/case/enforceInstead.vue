<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">
        代履行决定书
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-table">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当<br>
              事<br>
              人
            </td>
            <td> 个人 </td>
            <td colspan="2"> \</td>
            <td> 身份证件号 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td> 住址 </td>
            <td colspan="2"> \ </td>
            <td> 联系电话 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td> 单位 </td>
            <td> 名称</td>
            <td colspan="4"> \ </td>
          </tr>
          <tr>
            <td> 地址</td>
            <td colspan="4"> \ </td>
          </tr>
          <tr>
            <td> 联系电话</td>
            <td colspan="2"> \ </td>
            <td> 法定代表人 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3"> \ </td>
          </tr>
        </table>
      </div>
      <div class="pdf-report-info">
        <p class="begin">当事人（个人姓名或单位名称） ：<span class="pdf-line width250">&nbsp;</span></p>
        <p><span class="pdf-line width430">&nbsp;</span>一案，本机关于
          <span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width80">&nbsp;</span>月
          <span class="pdf-line width80">&nbsp;</span>日
          依法作出了行政强制执行决定，并向你（单位）送达了《行政强制执行决定书》
          (案号：<span class="pdf-line width250">&nbsp;</span>)。</p>
        <p>代履行人 ：□本机关 □第三人：
          <span class="pdf-line width80">&nbsp;</span>
          </p>
        <p>
          2.代履行标的：
        </p>
        <p>
          3.代履行时间和方式：
        </p>
        <p>
          4.代履行费用（预算）：
          请你（单位）在收到本决定书后 日内预付代履行预算费用（开
          户行: 账号： ）。代
          履行费用据实决算后，多退少补。
        </p>
        <p>如不服本决定，可以在收到本决定书之日起六十日内向
          申请行政复议或者在六个月内依法向 人民法院提起
          行政诉讼。</p>
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