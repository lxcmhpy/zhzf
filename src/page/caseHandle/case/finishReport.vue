<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通行政执法文书式样之二十四 ： 结案报告</div> -->
      <div class="pdf-title">
        结案报告
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="reson">
        <span>案由:</span>
        <span class="pdf-line width650">&nbsp;</span>
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
            <td> \</td>
            <td> 年龄 </td>
            <td> \ </td>
            <td> 性别 </td>
            <td> \</td>
          </tr>
          <tr>
            <td> 所在单位 </td>
            <td> \ </td>
            <td> 联系地址 </td>
            <td colspan="3"> \ </td>
          </tr>
          <tr>
            <td> 联系电话 </td>
            <td> \</td>
            <td> 邮编 </td>
            <td colspan="3">\ </td>
          </tr>
          <tr>
            <td> 单 位 </td>
            <td>\ </td>
            <td> 地址 </td>
            <td colspan="3"> \ </td>
          </tr>
          <tr>
            <td> 法定代表人</td>
            <td> \ </td>
            <td> 职务 </td>
            <td colspan="3"> \ </td>
          </tr>
          <tr>
            <td>
              处<br>
              理<br>
              结<br>
              果<br>
            </td>
            <td colspan="6" class="pdf-wirte"> \ </td>
          </tr>
          <tr>
            <td>
              执行<br>
              情况
            </td>
            <td colspan="6" class="pdf-wirte">\</td>
          </tr>
          <tr>
            <td>
              经办机<br>
              构负责<br>
              人意见
            </td>
            <td colspan="6" class="pdf-wirte">
              <div class="pdf-write-name">
                签名：<br>
                时间: 年 月 日
              </div>
            </td>
          </tr>
          <tr>
            <td>
              负责人<br>
              审批<br>
              意见
            </td>
            <td colspan="6" class="pdf-wirte">
              <div class="pdf-write-name">
                签名：<br>
                时间: 年 月 日
              </div>
            </td>
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