<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十三 ： 送达回证</div> -->
      <div class="pdf-title">
        送达回证
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div>
        <span>案由:</span>
        <hr width="90%" />
      </div>
      <div class="pdf-table">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              送达单位
            </td>
            <td colspan="5"> 1.7 </td>
          </tr>
          <tr>
            <td>
              受送达人
            </td>
            <td colspan="5"> 1.7 </td>
          </tr>
          <tr>
            <td>
              代收人
            </td>
            <td colspan="5"> 1.7 </td>
          </tr>
          <tr>
            <td> 送达文书名称、文号 </td>
            <td>
              收件人签名<br>
              （盖章）
            </td>
            <td>
              送达<br>
              地点
            </td>
            <td>
              送达<br>
              日期
            </td>
            <td>
              送达<br>
              方式
            </td>
            <td> 送达人 </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="7">
              <div class="pdf-seal">
                交通运输执法部门（印章）<br>
                年 月 日
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="7">
                <div  class="text-left">
                    备注：
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