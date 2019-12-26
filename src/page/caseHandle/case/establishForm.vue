<template>
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之一 ： 立案</div> -->
      <div class="pdf-title">
        立案登记表
      </div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-table">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td> 案件<br>来源 </td>
            <td colspan="8">
              <div class="text-left">
                <form>
                  <input type="checkbox">1.在行政检查中发现的；<br>
                  <input type="checkbox">2.个人、法人及其他组织举报经核实的；<br>
                  <input type="checkbox">3.上级机关 交办的；<br>
                  <input type="checkbox">4.下级机关 报请查处的<br>
                  <input type="checkbox">5.有关部门 移送的；<br>
                  <input type="checkbox">6.其他途径发现的<br>
                </form>

              </div>

            </td>
          </tr>

          <tr>
            <td> 案由 </td>
            <td colspan="8"> \ </td>
          </tr>
          <tr>
            <td> 受案<br>时间 </td>
            <td colspan="8"> \ </td>
          </tr>
          <tr>
            <td rowspan="5"> 当<br>事<br>人<br>基<br>本<br>情<br>况 </td>
            <td rowspan="2"> 个人 </td>
            <td> 姓名 </td>
            <td colspan="2"> \ </td>
            <td> 性别 </td>
            <td> \ </td>
            <td> 年龄 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td> 住址</td>
            <td colspan="2"> \</td>
            <td> 身份证<br>件号</td>
            <td> \ </td>
            <td> 联系电话 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td rowspan="3"> 单位 </td>
            <td> 名称 </td>
            <td colspan="4"> \ </td>
            <td> 法定代表人</td>
            <td> \ </td>
          </tr>
          <tr>
            <td> 地址 </td>
            <td colspan="4"> \ </td>
            <td> 联系电话 </td>
            <td> \ </td>
          </tr>
          <tr>
            <td colspan="2"> 统一社会信用代码 </td>
            <td colspan="5"> \ </td>
          </tr>
          <tr>
            <td>
              案件基<br>
              本情况
            </td>
            <td colspan="8"> \ </td>
          </tr>
          <tr>
            <td>
              立<br>
              案<br>
              依<br>
              据
            </td>
            <td colspan="4">
              \
            </td>
            <td>
              经办机构<br>
              负责人<br>
              意见
            </td>
            <td colspan="3" class="pdf-wirte">
              <div class="pdf-write-name">
                签名：<br>
                时间: 年 月 日
              </div>
            </td>
          </tr>
          <tr>
            <td>
              负<br>
              责<br>
              人<br>
              审<br>
              批<br>
              意<br>
              见
            </td>
            <td colspan="8" class="pdf-wirte">
              <div class="pdf-write-name">
                签名：<br>
                时间: 年 月 日
              </div>
            </td>
          </tr>
          <tr>
            <td>
              备<br>
              注
            </td>
            <td colspan="8"> \ </td>
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