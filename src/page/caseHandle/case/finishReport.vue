<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通行政执法文书式样之二十四 ： 结案报告</div> -->
      <div class="pdf-title">
        结案报告
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div>
        <span>案由:</span><hr width="90%"/>
      </div>
      <div class="pdf-table">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="5">
              当事人<br>
              基本情<br>
              况<br>
            </td>
            <td> 个人 </td>
            <td> 1.3 </td>
            <td> 年龄 </td>
            <td> 1.5 </td>
            <td> 性别 </td>
            <td> 1.7 </td>
          </tr>
          <tr>
            <td> 所在单位 </td>
            <td> 2.3 </td>
            <td> 联系地址 </td>
            <td colspan="3"> 2.5 </td>
          </tr>
          <tr>
            <td> 联系电话  </td>
            <td> 3.3 </td>
            <td> 邮编 </td>
            <td colspan="3"> 3.5 </td>
          </tr>
          <tr>
            <td> 单 位 </td>
            <td> 4.3 </td>
            <td> 地址 </td>
            <td colspan="3"> 4.5 </td>
          </tr>
          <tr>
            <td> 法定代表人</td>
            <td> 5.3 </td>
            <td> 职务 </td>
            <td colspan="3"> 5.5 </td>
          </tr>
          <tr>
            <td>
              处<br>
              理<br>
              结<br>
              果<br>
            </td>
            <td  colspan="6"> 6.2 </td>
          </tr>
          <tr>
            <td>
              执行<br>
              情况
            </td>
            <td  colspan="6"> 7.2 </td>
          </tr>
          <tr>
            <td>
              经办机<br>
              构负责<br>
              人意见
            </td>
            <td  colspan="6"> 8.2 </td>
          </tr>
          <tr>
            <td>
              负责人<br>
              审批<br>
              意见
            </td>
            <td colspan="6"> 9.2 </td>
          </tr>

        </table>
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