<template>
  <div class="a4-box">
    <div class="pdf-box">
      <div>交通运输行政执法文书式样之四 ： 现场笔录</div>
      <div class="pdf-title">
        现场笔录
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-table">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              执法<br>
              地点
            </td>
            <td colspan="2">
            </td>
            <td colspan="2">
              执法时间
            </td>
            <td colspan="3">
              年 月 日<br>
              时 分至时 分
            </td>
          </tr>

          <tr>
            <td rowspan="2">
              执法<br>
              人员
            </td>
            <td></td>
            <td rowspan="2">
              执法证号
            </td>
            <td colspan="3"></td>
            <td rowspan="2">
              记录人
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td colspan="3"></td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="5">
              现场<br>
              人员<br>
              基本<br>
              情况
            </td>
            <td> 姓名 </td>
            <td colspan="2"></td>
            <td colspan="2"> 性别 </td>
            <td colspan="2"></td>

          </tr>
          <tr>
            <td> 身份证件号 </td>
            <td colspan="2"></td>
            <td colspan="2"> 与案件关系 </td>
            <td colspan="2"></td>

          </tr>
          <tr>
            <td> 单位及职务 </td>
            <td colspan="2"></td>
            <td colspan="2"> 联系电话 </td>
            <td colspan="2"></td>

          </tr>
          <tr>
            <td> 联系地址 </td>
            <td colspan="6"></td>

          </tr>
          <tr>
            <td> 车(船)号 </td>
            <td colspan="2"></td>
            <td colspan="2"> 车(船)型 </td>
            <td colspan="2"></td>

          </tr>
          <tr>
            <td rowspan="10"> 主要内容</td>
            <td colspan="7">
              <div class="text-left">
                现场情况：（如实施行政强制措施的，包括当场告知当事人采取行政强制
                措施的理由、依据以及当事人依法享有的权利、救济途径，听取当事人陈
                述、申辩情况。）
              </div>

            </td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td colspan="7">
              □上述笔录我已看过 □或已向我宣读过，情况属实无误。<br>
              现场人员签名：<br>
              时间：<br>
            </td>
          </tr>
          <tr>
            <td colspan="7">
              <div class="text-left">备注：</div>
            </td>
          </tr>
          <tr>
            <td colspan="7">
              <div class="text-left">
                执法人员签名： 时间：
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