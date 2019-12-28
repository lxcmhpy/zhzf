<template>
  <div class="a4-box">
    <div class="pdf-box">
      <div class="pdf-title">
        行政强制执行决定书
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
        <p>因你（单位）逾期未履行本机关于
          <span class="pdf-line width80">2019</span>年
          <span class="pdf-line width80">12</span>月
          <span class="pdf-line width80">31</span>日作出的
          <span class="pdf-line width245">&nbsp;</span>
          决定，决定书案号为<span class="pdf-line width250">&nbsp;</span>
          。经本机关催告后，你（单位）在催告期间有转移或隐匿财物迹象的，仍未履行且无正当理由。依据
          <span class="pdf-line width250">&nbsp;</span>
          的规定，，本机关将立即于<span class="pdf-line width80">2019</span>年
          <span class="pdf-line width80">12</span>月
          <span class="pdf-line width80">31</span>日强制执行：
          <span class="pdf-line width430">&nbsp;</span>（强制执行方式）。
        </p>
        
        <p>
          如不服本决定，可以在收到本决定书之日起六十日内向
          <span class="pdf-line width250">&nbsp;</span>
          申请行政复议或者在六个月内依法向
          <span class="pdf-line width250">&nbsp;</span>
          人民法院提起行政诉讼。
        </p>
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